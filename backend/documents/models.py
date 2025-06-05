from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import FileExtensionValidator
import uuid

User = get_user_model()

class Document(models.Model):
    """Core document model for storing document metadata and references."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    file_path = models.CharField(max_length=1024)  # Path in GCS
    file_size = models.BigIntegerField()
    mime_type = models.CharField(max_length=127)
    checksum = models.CharField(max_length=64)  # SHA-256
    created_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name='created_documents')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_public = models.BooleanField(default=False)
    metadata = models.JSONField(default=dict)
    ocr_status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('processing', 'Processing'),
            ('completed', 'Completed'),
            ('failed', 'Failed')
        ],
        default='pending'
    )
    ocr_result = models.JSONField(null=True, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=['created_at']),
            models.Index(fields=['created_by']),
            models.Index(fields=['is_public']),
            models.Index(fields=['ocr_status']),
        ]

class DocumentVersion(models.Model):
    """Model for tracking document versions."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='versions')
    version_number = models.PositiveIntegerField()
    file_path = models.CharField(max_length=1024)
    checksum = models.CharField(max_length=64)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    change_notes = models.TextField(blank=True)
    metadata = models.JSONField(default=dict)

    class Meta:
        unique_together = ['document', 'version_number']
        indexes = [
            models.Index(fields=['document', 'version_number']),
            models.Index(fields=['created_at']),
        ]

class DocumentAnnotation(models.Model):
    """Model for storing document annotations."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='annotations')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    target_type = models.CharField(
        max_length=20,
        choices=[
            ('text', 'Text'),
            ('image', 'Image'),
            ('page', 'Page')
        ]
    )
    target_data = models.JSONField()  # Stores coordinates, text ranges, etc.
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')
    is_public = models.BooleanField(default=True)
    tags = models.JSONField(default=list)

    class Meta:
        indexes = [
            models.Index(fields=['document', 'created_at']),
            models.Index(fields=['user']),
            models.Index(fields=['target_type']),
        ]

class DocumentCrossReference(models.Model):
    """Model for storing cross-references between documents."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source_document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='outgoing_references')
    target_document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='incoming_references')
    source_element = models.JSONField(null=True, blank=True)  # Location in source document
    target_element = models.JSONField(null=True, blank=True)  # Location in target document
    reference_type = models.CharField(max_length=50)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)

    class Meta:
        indexes = [
            models.Index(fields=['source_document', 'target_document']),
            models.Index(fields=['reference_type']),
        ] 