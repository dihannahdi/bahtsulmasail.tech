from rest_framework import serializers
from .models import Document, DocumentVersion, DocumentAnnotation, DocumentCrossReference, TextChunk
from django.conf import settings
from core.storage import generate_gcs_signed_url
import mimetypes
import hashlib
import os
import re


class DocumentSerializer(serializers.ModelSerializer):
    """Serializer for Document model."""
    created_by = serializers.ReadOnlyField(source='created_by.username')
    file_url = serializers.SerializerMethodField()
    
    class Meta:
        model = Document
        fields = [
            'id', 'title', 'description', 'file_url', 'file_size',
            'mime_type', 'created_by', 'created_at', 'updated_at',
            'is_public', 'metadata', 'ocr_status', 'ocr_result',
            'verification_status'
        ]
        read_only_fields = [
            'id', 'file_size', 'mime_type', 'created_by',
            'created_at', 'updated_at', 'ocr_status', 'ocr_result',
            'verification_status'
        ]

    def get_file_url(self, obj):
        """Generate a signed URL for the document file."""
        if obj.file_path:
            return generate_gcs_signed_url(obj.file_path)
        return None

class DocumentVersionSerializer(serializers.ModelSerializer):
    """Serializer for DocumentVersion model."""
    created_by = serializers.ReadOnlyField(source='created_by.username')
    file_url = serializers.SerializerMethodField()

    class Meta:
        model = DocumentVersion
        fields = [
            'id', 'document', 'version_number', 'file_url',
            'created_by', 'created_at', 'change_notes', 'metadata'
                ]
        read_only_fields = ['id', 'created_by', 'created_at']


class TextChunkSerializer(serializers.ModelSerializer):
    """Serializer for TextChunk model."""
    source_document_title = serializers.ReadOnlyField(source='source_document.title')
    
    class Meta:
        model = TextChunk
        fields = [
            'id', 'source_document', 'source_document_title', 'kitab_name', 
            'author', 'content_arabic', 'metadata', 'chunk_index',
            'created_at', 'updated_at'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']


class DocumentSearchSerializer(DocumentSerializer):
    """Enhanced serializer for search results with snippets and relevance scores."""
    snippet = serializers.SerializerMethodField()
    search_rank = serializers.SerializerMethodField()
    similarity_score = serializers.SerializerMethodField()
    
    class Meta(DocumentSerializer.Meta):
        fields = DocumentSerializer.Meta.fields + ['snippet', 'search_rank', 'similarity_score']
    
    def get_snippet(self, obj):
        """Generate a text snippet around the search terms."""
        query = self.context.get('search_query', '')
        text = getattr(obj, 'extracted_text', '') or ''
        
        if not query or not text:
            # Return first 200 characters as fallback
            return text[:200] + '...' if len(text) > 200 else text
        
        # Find the first occurrence of any query term
        query_terms = re.findall(r'\w+', query.lower())
        text_lower = text.lower()
        
        best_position = len(text)
        for term in query_terms:
            position = text_lower.find(term)
            if position != -1 and position < best_position:
                best_position = position
        
        if best_position == len(text):
            # No terms found, return beginning
            return text[:200] + '...' if len(text) > 200 else text
        
        # Extract snippet around the found term
        snippet_length = 300
        start = max(0, best_position - snippet_length // 2)
        end = min(len(text), start + snippet_length)
        
        # Adjust start to avoid cutting words
        if start > 0:
            space_before = text.rfind(' ', 0, start)
            if space_before != -1 and start - space_before < 20:
                start = space_before + 1
        
        # Adjust end to avoid cutting words
        if end < len(text):
            space_after = text.find(' ', end)
            if space_after != -1 and space_after - end < 20:
                end = space_after
        
        snippet = text[start:end]
        
        # Add ellipsis if needed
        if start > 0:
            snippet = '...' + snippet
        if end < len(text):
            snippet = snippet + '...'
        
        return snippet
    
    def get_search_rank(self, obj):
        """Get the search rank if available (for keyword search)."""
        return getattr(obj, 'rank', None)
    
    def get_similarity_score(self, obj):
        """Get the similarity score if available (for semantic search)."""
        return getattr(obj, 'similarity', None)

    def get_file_url(self, obj):
        """Generate a signed URL for the version file."""
        if obj.file_path:
            return generate_gcs_signed_url(obj.file_path)
        return None

class DocumentUploadSerializer(serializers.Serializer):
    file = serializers.FileField()
    title = serializers.CharField(max_length=255)
    description = serializers.CharField(required=False, allow_blank=True)
    is_public = serializers.BooleanField(default=False)

    def validate_file(self, value):
        allowed_types = ['pdf', 'docx', 'jpg', 'jpeg', 'png']
        ext = os.path.splitext(value.name)[-1][1:].lower()
        if ext not in allowed_types:
            raise serializers.ValidationError('Unsupported file type.')
        if value.size > 50 * 1024 * 1024:  # 50MB limit
            raise serializers.ValidationError('File too large.')
        return value

    def create(self, validated_data):
        file = validated_data['file']
        user = self.context['request'].user
        title = validated_data['title']
        description = validated_data.get('description', '')
        is_public = validated_data.get('is_public', False)
        file.seek(0)
        checksum = hashlib.sha256(file.read()).hexdigest()
        file.seek(0)
        mime_type, _ = mimetypes.guess_type(file.name)
        file_size = file.size
        from core.storage import upload_to_gcs
        gcs_path = upload_to_gcs(file, file.name)
        doc = Document.objects.create(
            title=title,
            description=description,
            file_path=gcs_path,
            file_size=file_size,
            mime_type=mime_type or '',
            checksum=checksum,
            created_by=user,
            is_public=is_public,
            metadata={
                'original_filename': file.name,
                'file_size': file_size,
                'content_type': mime_type,
            },
            ocr_status='pending'
        )
        # Create initial version
        DocumentVersion.objects.create(
            document=doc,
            version_number=1,
            file_path=gcs_path,
            checksum=checksum,
            created_by=user,
            metadata={
                'original_filename': file.name,
                'file_size': file_size,
                'content_type': mime_type,
            }
        )
        return doc

class DocumentAnnotationSerializer(serializers.ModelSerializer):
    """Serializer for DocumentAnnotation model."""
    user = serializers.ReadOnlyField(source='user.username')
    replies = serializers.SerializerMethodField()

    class Meta:
        model = DocumentAnnotation
        fields = [
            'id', 'document', 'user', 'content', 'target_type',
            'target_data', 'created_at', 'updated_at', 'parent',
            'is_public', 'tags', 'replies'
        ]
        read_only_fields = ['id', 'user', 'created_at', 'updated_at']

    def get_replies(self, obj):
        """Recursively get all replies to this annotation."""
        replies = obj.replies.all()
        if replies:
            return DocumentAnnotationSerializer(replies, many=True).data
        return []

class DocumentCrossReferenceSerializer(serializers.ModelSerializer):
    """Serializer for DocumentCrossReference model."""
    created_by = serializers.ReadOnlyField(source='created_by.username')
    source_document_title = serializers.ReadOnlyField(source='source_document.title')
    target_document_title = serializers.ReadOnlyField(source='target_document.title')

    class Meta:
        model = DocumentCrossReference
        fields = [
            'id', 'source_document', 'source_document_title',
            'target_document', 'target_document_title',
            'source_element', 'target_element', 'reference_type',
            'created_by', 'created_at', 'notes'
        ]
        read_only_fields = ['id', 'created_by', 'created_at'] 