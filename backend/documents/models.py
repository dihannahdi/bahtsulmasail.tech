from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import FileExtensionValidator
try:
    from pgvector.django import VectorField
    PGVECTOR_AVAILABLE = True
except ImportError:
    VectorField = None
    PGVECTOR_AVAILABLE = False
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
    extracted_text = models.TextField(blank=True, help_text='Full text extracted from the document')
    embedding = VectorField(dimensions=768, null=True, blank=True, help_text='Vector embedding of the document') if PGVECTOR_AVAILABLE else models.JSONField(null=True, blank=True, help_text='Vector embedding of the document (stored as JSON for non-PostgreSQL databases)')
    language = models.CharField(max_length=10, default='id', help_text='ISO 639-1 language code')
    verification_status = models.CharField(
        max_length=25,
        choices=[
            ('awaiting_verification', 'Awaiting Verification'),
            ('verified', 'Verified'),
            ('rejected', 'Rejected'),
        ],
        default='awaiting_verification',
        help_text='Document verification status in the Tashih workflow'
    )

    class Meta:
        indexes = [
            models.Index(fields=['created_at']),
            models.Index(fields=['created_by']),
            models.Index(fields=['is_public']),
            models.Index(fields=['ocr_status']),
            models.Index(fields=['language']),
            models.Index(fields=['verification_status']),
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

# Note: AI analysis models are now in the api app to avoid duplication

class TextChunk(models.Model):
    """Model for storing text chunks for semantic search."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source_document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='text_chunks')
    kitab_name = models.CharField(max_length=255, help_text='Name of the Islamic book')
    author = models.CharField(max_length=255, help_text='Author of the book')
    content_arabic = models.TextField(help_text='Raw Arabic text chunk')
    embedding = VectorField(dimensions=768, null=True, blank=True, help_text='Vector embedding of the text chunk') if PGVECTOR_AVAILABLE else models.JSONField(null=True, blank=True, help_text='Vector embedding of the text chunk (stored as JSON for non-PostgreSQL databases)')
    metadata = models.JSONField(default=dict, help_text='Extra info like page number or chapter')
    chunk_index = models.IntegerField(help_text='Index of this chunk within the document')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['source_document']),
            models.Index(fields=['kitab_name']),
            models.Index(fields=['author']),
            models.Index(fields=['chunk_index']),
        ]
        unique_together = ['source_document', 'chunk_index']

    def __str__(self):
        return f"{self.kitab_name} - Chunk {self.chunk_index}"


class DocumentAnalysisStatus(models.Model):
    """Model for tracking various analysis operations on documents."""
    ANALYSIS_TYPES = [
        ('semantic', 'Semantic Analysis'),
        ('argument', 'Argument Extraction'),
        ('citation', 'Citation Detection'),
        ('knowledge_graph', 'Knowledge Graph'),
    ]
    
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='analysis_statuses')
    analysis_type = models.CharField(max_length=20, choices=ANALYSIS_TYPES)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    started_at = models.DateTimeField(null=True, blank=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    error_message = models.TextField(blank=True)
    task_id = models.CharField(max_length=255, null=True, blank=True)
    
    class Meta:
        unique_together = ['document', 'analysis_type']
        indexes = [
            models.Index(fields=['document', 'analysis_type']),
            models.Index(fields=['status']),
        ] 