from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.core.files.storage import default_storage
from django.conf import settings
from rest_framework.permissions import IsAuthenticated
import hashlib
import os
from .models import Document, DocumentVersion, DocumentAnnotation, DocumentCrossReference
from .serializers import (
    DocumentSerializer, DocumentVersionSerializer,
    DocumentAnnotationSerializer, DocumentCrossReferenceSerializer,
    DocumentUploadSerializer
)
from .tasks import process_document_ocr
from core.storage import generate_gcs_signed_url

class DocumentViewSet(viewsets.ModelViewSet):
    """ViewSet for Document model."""
    queryset = Document.objects.all()
    serializer_class = DocumentSerializer
    parser_classes = (MultiPartParser, FormParser)
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Document.objects.all()
        return Document.objects.filter(models.Q(created_by=user) | models.Q(is_public=True))

    @action(detail=False, methods=['post'], url_path='upload', url_name='upload', permission_classes=[IsAuthenticated], parser_classes=[MultiPartParser, FormParser])
    def upload(self, request):
        """Handle document upload with file and metadata."""
        serializer = DocumentUploadSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            document = serializer.save()
            # Trigger OCR processing asynchronously
            process_document_ocr.delay(str(document.id))
            return Response(DocumentSerializer(document, context={'request': request}).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
        return DocumentVersion.objects.filter(document=document)

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
        )

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
        )

    def perform_create(self, serializer):
        """Create cross-reference with user information."""
        serializer.save(created_by=self.request.user) 