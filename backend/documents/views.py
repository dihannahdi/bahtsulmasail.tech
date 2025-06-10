from rest_framework import viewsets, status, permissions, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from rest_framework.pagination import PageNumberPagination
from django.shortcuts import get_object_or_404
from django.core.files.storage import default_storage
from django.conf import settings
from django.db import models
from django.contrib.postgres.search import SearchVector, SearchQuery, SearchRank
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
import hashlib
import os
import logging
import re
from .models import Document, DocumentVersion, DocumentAnnotation, DocumentCrossReference, TextChunk
from .serializers import (
    DocumentSerializer, DocumentVersionSerializer,
    DocumentAnnotationSerializer, DocumentCrossReferenceSerializer,
    DocumentUploadSerializer, DocumentSearchSerializer,
    TextChunkSerializer
)
from .tasks import process_document
from core.storage import generate_gcs_signed_url
from sentence_transformers import SentenceTransformer
import numpy as np

logger = logging.getLogger(__name__)

class DocumentPagination(PageNumberPagination):
    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 100

class DocumentViewSet(viewsets.ModelViewSet):
    """ViewSet for Document model with enhanced filtering and pagination."""
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticated]
    pagination_class = DocumentPagination
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['ocr_status', 'is_public', 'mime_type']
    search_fields = ['title', 'description']
    ordering_fields = ['created_at', 'updated_at', 'title']
    ordering = ['-created_at']

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Document.objects.all().select_related('created_by')
        return Document.objects.filter(
            models.Q(created_by=user) | models.Q(is_public=True)
        ).select_related('created_by')

    @action(detail=False, methods=['post'], url_path='upload', url_name='upload', permission_classes=[IsAuthenticated], parser_classes=[MultiPartParser, FormParser])
    def upload(self, request):
        """Handle document upload with file and metadata."""
        try:
            serializer = DocumentUploadSerializer(data=request.data, context={'request': request})
            if serializer.is_valid():
                document = serializer.save()
                # Trigger document processing asynchronously
                try:
                    process_document.delay(str(document.id))
                    logger.info(f"Document processing initiated for document {document.id}")
                except Exception as e:
                    logger.error(f"Failed to initiate document processing for document {document.id}: {str(e)}")
                    # Don't fail the upload if processing initiation fails
                
                return Response(
                    DocumentSerializer(document, context={'request': request}).data, 
                    status=status.HTTP_201_CREATED
                )
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logger.error(f"Document upload failed: {str(e)}")
            return Response(
                {'error': 'Upload failed. Please try again.'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    @action(detail=True, methods=['get'])
    def download(self, request, pk=None):
        document = self.get_object()
        return Response({'download_url': generate_gcs_signed_url(document.file_path)})

    @action(detail=True, methods=['get'])
    def ocr_status(self, request, pk=None):
        document = self.get_object()
        return Response({
            'status': document.ocr_status,
            'result': document.ocr_result
        })

    @action(detail=False, methods=['get'], url_path='search', url_name='search')
    def search(self, request):
        """
        Unified search endpoint supporting both keyword and semantic search.
        
        Query parameters:
        - q: The search query string
        - type: 'keyword' or 'semantic' (defaults to 'keyword')
        - page: Page number for pagination
        - page_size: Number of results per page
        """
        query_string = request.query_params.get('q', '').strip()
        search_type = request.query_params.get('type', 'keyword').lower()
        
        if not query_string:
            return Response({
                'error': 'Query parameter "q" is required'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Get the base queryset with proper permissions
        queryset = self.get_queryset().filter(
            ocr_status='completed',  # Only search completed documents
            extracted_text__isnull=False  # Only documents with extracted text
        ).exclude(extracted_text='')
        
        try:
            if search_type == 'semantic':
                results = self._perform_semantic_search(queryset, query_string)
            else:  # Default to keyword search
                results = self._perform_keyword_search(queryset, query_string)
            
            # Apply pagination
            page = self.paginate_queryset(results)
            search_context = {
                'request': request, 
                'search_query': query_string
            }
            
            if page is not None:
                serializer = DocumentSearchSerializer(page, many=True, context=search_context)
                return self.get_paginated_response(serializer.data)
            
            serializer = DocumentSearchSerializer(results, many=True, context=search_context)
            return Response({
                'results': serializer.data,
                'search_type': search_type,
                'query': query_string
            })
            
        except Exception as e:
            logger.error(f"Search failed: {str(e)}")
            return Response({
                'error': 'Search failed. Please try again.'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def _perform_keyword_search(self, queryset, query_string):
        """
        Perform full-text search using PostgreSQL's text search capabilities.
        """
        # Create search vector and query
        search_vector = SearchVector('title', weight='A') + SearchVector('extracted_text', weight='B')
        search_query = SearchQuery(query_string)
        
        # Perform the search with ranking
        results = queryset.annotate(
            search=search_vector,
            rank=SearchRank(search_vector, search_query)
        ).filter(
            search=search_query
        ).order_by('-rank', '-created_at')
        
        return results
    
    def _perform_semantic_search(self, queryset, query_string):
        """
        Perform semantic search using vector similarity with pgvector.
        """
        try:
            # Generate embedding for the query
            model = SentenceTransformer('paraphrase-multilingual-MiniLM-L12-v2')
            query_embedding = model.encode([query_string])[0].tolist()
            
            # Only include documents that have embeddings
            queryset = queryset.filter(embedding__isnull=False)
            
            # Use pgvector's cosine distance operator
            # <=> is the cosine distance operator in pgvector
            results = queryset.extra(
                select={
                    'similarity': '1 - (embedding <=> %s)'
                },
                select_params=[query_embedding],
                where=['embedding IS NOT NULL'],
                order_by=['-similarity', '-created_at']
            )
            
            return results
            
        except ImportError:
            logger.error("sentence-transformers not available for semantic search")
            raise Exception("Semantic search not available")
        except Exception as e:
            logger.error(f"Semantic search failed: {str(e)}")
            raise

    @action(detail=False, methods=['get'], url_path='semantic-search')
    def semantic_search(self, request):
        """
        Perform semantic search across Islamic text chunks.
        
        Query Parameters:
        - q: Search query in Indonesian or English
        - limit: Maximum number of results (default: 10)
        - threshold: Similarity threshold (default: 0.7)
        """
        query = request.query_params.get('q', '')
        limit = int(request.query_params.get('limit', 10))
        threshold = float(request.query_params.get('threshold', 0.7))
        
        if not query:
            return Response(
                {'error': 'Query parameter "q" is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            # Load the multilingual sentence transformer model
            model = SentenceTransformer('paraphrase-multilingual-mpnet-base-v2')
            
            # Generate embedding for the query
            query_embedding = model.encode(query)
            
            # Get all text chunks with embeddings
            chunks = TextChunk.objects.filter(embedding__isnull=False)
            
            # Calculate similarities and filter by threshold
            results = []
            for chunk in chunks:
                if chunk.embedding:
                    # Convert stored embedding back to numpy array
                    chunk_embedding = np.array(chunk.embedding)
                    
                    # Calculate cosine similarity
                    similarity = np.dot(query_embedding, chunk_embedding) / (
                        np.linalg.norm(query_embedding) * np.linalg.norm(chunk_embedding)
                    )
                    
                    if similarity >= threshold:
                        results.append({
                            'chunk': chunk,
                            'similarity': float(similarity)
                        })
            
            # Sort by similarity (highest first) and limit results
            results.sort(key=lambda x: x['similarity'], reverse=True)
            results = results[:limit]
            
            # Format response
            response_data = []
            for result in results:
                chunk = result['chunk']
                response_data.append({
                    'kitab_name': chunk.kitab_name,
                    'author': chunk.author,
                    'ibaroh': chunk.content_arabic,
                    'terjemahan': self._generate_translation(chunk.content_arabic),
                    'similarity_score': result['similarity'],
                    'metadata': chunk.metadata
                })
            
            return Response({
                'query': query,
                'results': response_data,
                'total_found': len(response_data)
            })
            
        except Exception as e:
            return Response(
                {'error': f'Search failed: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def _generate_translation(self, arabic_text):
        """
        Generate Indonesian translation of Arabic text.
        This is a placeholder - in production, you'd use a proper translation service.
        """
        # TODO: Implement actual translation using a service like Google Translate API
        # or a specialized Arabic-Indonesian translation model
        return f"[Terjemahan dari: {arabic_text[:50]}...]"

class DocumentVersionViewSet(viewsets.ModelViewSet):
    """ViewSet for DocumentVersion model."""
    queryset = DocumentVersion.objects.all()
    serializer_class = DocumentVersionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Filter versions based on document access."""
        document_id = self.kwargs.get('document_pk')
        document = get_object_or_404(Document, id=document_id)
        if not document.is_public and document.created_by != self.request.user:
            raise permissions.PermissionDenied()
        return DocumentVersion.objects.filter(document=document).select_related('document')

    @action(detail=True, methods=['get'])
    def download(self, request, document_pk=None, pk=None):
        """Generate a signed URL for version download."""
        version = self.get_object()
        # TODO: Implement GCS signed URL generation
        return Response({'download_url': f"/api/v1/documents/{document_pk}/versions/{version.version_number}/download/"})

class DocumentAnnotationViewSet(viewsets.ModelViewSet):
    """ViewSet for DocumentAnnotation model."""
    queryset = DocumentAnnotation.objects.all()
    serializer_class = DocumentAnnotationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Filter annotations based on document access."""
        document_id = self.kwargs.get('document_pk')
        document = get_object_or_404(Document, id=document_id)
        if not document.is_public and document.created_by != self.request.user:
            raise permissions.PermissionDenied()
        return DocumentAnnotation.objects.filter(
            document=document,
            parent=None  # Only get top-level annotations
        ).select_related('user', 'document').prefetch_related('replies')

    def perform_create(self, serializer):
        """Create annotation with user information."""
        serializer.save(user=self.request.user)

class DocumentCrossReferenceViewSet(viewsets.ModelViewSet):
    """ViewSet for DocumentCrossReference model."""
    queryset = DocumentCrossReference.objects.all()
    serializer_class = DocumentCrossReferenceSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        """Filter cross-references based on document access."""
        document_id = self.kwargs.get('document_pk')
        document = get_object_or_404(Document, id=document_id)
        if not document.is_public and document.created_by != self.request.user:
            raise permissions.PermissionDenied()
        return DocumentCrossReference.objects.filter(
            models.Q(source_document=document) | models.Q(target_document=document)
        ).select_related('source_document', 'target_document', 'created_by')

    def perform_create(self, serializer):
        """Create cross-reference with user information."""
        serializer.save(created_by=self.request.user)

class TextChunkViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing text chunks from Islamic books.
    """
    queryset = TextChunk.objects.all()
    serializer_class = TextChunkSerializer
    filterset_fields = ['kitab_name', 'author']
    search_fields = ['content_arabic', 'kitab_name', 'author']
    ordering_fields = ['created_at', 'chunk_index']
    ordering = ['source_document', 'chunk_index'] 