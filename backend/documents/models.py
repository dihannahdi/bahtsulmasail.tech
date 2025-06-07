from django.db import models
from django.contrib.auth import get_user_model
from django.core.validators import FileExtensionValidator
from pgvector.django import VectorField
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
    embedding = VectorField(dimensions=768, null=True, blank=True, help_text='Vector embedding of the document')
    language = models.CharField(max_length=10, default='id', help_text='ISO 639-1 language code')
    verification_status = models.CharField(
        max_length=20,
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

# New models for AI analysis

class SemanticTopic(models.Model):
    """Model for storing semantic topics extracted from documents."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='semantic_topics')
    topic_keywords = models.JSONField(help_text='List of keywords or terms that define the topic')
    relevance_score = models.FloatField(help_text='Score indicating relevance of topic to document')
    metadata = models.JSONField(default=dict, help_text='Additional metadata about the topic')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['document']),
            models.Index(fields=['relevance_score']),
        ]

class ArgumentComponent(models.Model):
    """Model for storing argument components (claims, premises) extracted from documents."""
    COMPONENT_TYPES = [
        ('claim', 'Claim'),
        ('premise', 'Premise'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='argument_components')
    component_type = models.CharField(max_length=20, choices=COMPONENT_TYPES)
    text_span = models.TextField(help_text='The text of the argument component')
    start_char = models.IntegerField(help_text='Starting character position in the document')
    end_char = models.IntegerField(help_text='Ending character position in the document')
    confidence_score = models.FloatField(help_text='Confidence score of extraction')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['document']),
            models.Index(fields=['component_type']),
        ]

class ArgumentRelation(models.Model):
    """Model for storing relationships between argument components."""
    RELATION_TYPES = [
        ('support', 'Support'),
        ('attack', 'Attack'),
        ('neutral', 'Neutral'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source_component = models.ForeignKey(ArgumentComponent, on_delete=models.CASCADE, related_name='outgoing_relations')
    target_component = models.ForeignKey(ArgumentComponent, on_delete=models.CASCADE, related_name='incoming_relations')
    relation_type = models.CharField(max_length=20, choices=RELATION_TYPES)
    confidence_score = models.FloatField(help_text='Confidence score of relation extraction')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['source_component']),
            models.Index(fields=['target_component']),
            models.Index(fields=['relation_type']),
        ]

class Citation(models.Model):
    """Model for storing citations detected in documents."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='citations')
    cited_source_identifier = models.TextField(help_text='Identifier of the cited source')
    text_span = models.TextField(help_text='The text of the citation')
    start_char = models.IntegerField(help_text='Starting character position in the document')
    end_char = models.IntegerField(help_text='Ending character position in the document')
    normalized_citation = models.TextField(help_text='Normalized/standardized form of the citation')
    context = models.TextField(help_text='Surrounding context of the citation')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['document']),
        ]

class KnowledgeGraphNode(models.Model):
    """Model for storing knowledge graph nodes (entities)."""
    NODE_TYPES = [
        ('person', 'Person'),
        ('organization', 'Organization'),
        ('location', 'Location'),
        ('concept', 'Concept'),
        ('event', 'Event'),
        ('other', 'Other'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    node_id = models.CharField(max_length=255, unique=True, help_text='Unique identifier for the node')
    label = models.CharField(max_length=255, help_text='Display label for the entity')
    node_type = models.CharField(max_length=50, choices=NODE_TYPES, help_text='Type of entity')
    properties = models.JSONField(default=dict, help_text='Additional properties of the entity')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['node_type']),
            models.Index(fields=['label']),
        ]

class KnowledgeGraphEdge(models.Model):
    """Model for storing knowledge graph edges (relationships)."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source_node = models.ForeignKey(KnowledgeGraphNode, on_delete=models.CASCADE, related_name='outgoing_edges')
    target_node = models.ForeignKey(KnowledgeGraphNode, on_delete=models.CASCADE, related_name='incoming_edges')
    label = models.CharField(max_length=255, help_text='Relationship label')
    properties = models.JSONField(default=dict, help_text='Additional properties of the relationship')
    document = models.ForeignKey(Document, on_delete=models.SET_NULL, null=True, related_name='knowledge_graph_edges')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        indexes = [
            models.Index(fields=['source_node']),
            models.Index(fields=['target_node']),
            models.Index(fields=['label']),
            models.Index(fields=['document']),
        ]

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