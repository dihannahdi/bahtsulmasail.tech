from django.db import models
from django.contrib.auth import get_user_model
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
import uuid

User = get_user_model()

class CanonicalSource(models.Model):
    """Model for canonical Islamic sources like Quran, Hadith collections, and major books."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source_type = models.CharField(
        max_length=50,
        choices=[
            ('quran', 'Quran'),
            ('hadith_collection', 'Hadith Collection'),
            ('book', 'Book'),
            ('article', 'Article'),
            ('fatwa', 'Fatwa'),
            ('manuscript', 'Manuscript')
        ]
    )
    identifier = models.CharField(max_length=255, unique=True)
    title = models.CharField(max_length=500)
    author = models.CharField(max_length=255, blank=True)
    publication_year = models.IntegerField(null=True, blank=True)
    language = models.CharField(max_length=50, default='arabic')
    metadata = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['source_type']),
            models.Index(fields=['identifier']),
            models.Index(fields=['language']),
        ]

class QuranVerse(models.Model):
    """Model for Quranic verses with their text and metadata."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    canonical_source = models.ForeignKey(
        CanonicalSource,
        on_delete=models.PROTECT,
        limit_choices_to={'source_type': 'quran'}
    )
    surah_number = models.IntegerField()
    ayah_number = models.IntegerField()
    text_arabic = models.TextField()
    translations = models.JSONField(default=dict)  # Store multiple translations
    metadata = models.JSONField(default=dict)  # Additional verse metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('surah_number', 'ayah_number')
        indexes = [
            models.Index(fields=['surah_number', 'ayah_number']),
            models.Index(fields=['text_arabic']),
        ]

class Hadith(models.Model):
    """Model for Hadith texts with their metadata and grading."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    canonical_source = models.ForeignKey(
        CanonicalSource,
        on_delete=models.PROTECT,
        limit_choices_to={'source_type': 'hadith_collection'}
    )
    number_in_collection = models.CharField(max_length=50)
    text_arabic_matn = models.TextField()
    text_arabic_isnad = models.TextField(blank=True, null=True)
    translations = models.JSONField(default=dict)
    narrators = models.JSONField(default=list)
    grading = models.JSONField(default=dict)  # Store multiple scholars' gradings
    metadata = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('canonical_source', 'number_in_collection')
        indexes = [
            models.Index(fields=['canonical_source', 'number_in_collection']),
            models.Index(fields=['text_arabic_matn']),
        ]

class KnowledgeNode(models.Model):
    """Model for nodes in the knowledge graph."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    node_type = models.CharField(
        max_length=50,
        choices=[
            ('document', 'Document'),
            ('scholar', 'Scholar'),
            ('ruling', 'Ruling'),
            ('concept', 'Concept'),
            ('quran_verse', 'Quran Verse'),
            ('hadith', 'Hadith'),
            ('school', 'School of Thought'),
            ('principle', 'Legal Principle')
        ]
    )
    node_identifier = models.CharField(max_length=255, unique=True)
    title = models.CharField(max_length=500)
    description = models.TextField(blank=True)
    metadata = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['node_type']),
            models.Index(fields=['node_identifier']),
            models.Index(fields=['title']),
        ]

class KnowledgeEdge(models.Model):
    """Model for relationships between knowledge nodes."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    source_node = models.ForeignKey(
        KnowledgeNode,
        on_delete=models.CASCADE,
        related_name='outgoing_edges'
    )
    target_node = models.ForeignKey(
        KnowledgeNode,
        on_delete=models.CASCADE,
        related_name='incoming_edges'
    )
    relationship_type = models.CharField(max_length=100)
    properties = models.JSONField(default=dict)
    confidence_score = models.FloatField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['source_node', 'target_node']),
            models.Index(fields=['relationship_type']),
        ]

class Citation(models.Model):
    """Model for citations and references between documents and sources."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document_source = models.ForeignKey(
        'documents.Document',
        on_delete=models.CASCADE,
        related_name='citations_made_in_document'
    )
    source_type = models.CharField(
        max_length=50,
        choices=[
            ('quran', 'Quran'),
            ('hadith', 'Hadith'),
            ('book', 'Book'),
            ('article', 'Article'),
            ('fatwa', 'Fatwa'),
            ('manuscript', 'Manuscript')
        ]
    )
    reference_details = models.JSONField()
    cited_text_snippet = models.TextField(blank=True, null=True)
    authentication_status = models.CharField(
        max_length=50,
        blank=True,
        null=True,
        choices=[
            ('sahih', 'Sahih'),
            ('hasan', 'Hasan'),
            ('daif', 'Da\'if'),
            ('mawdu', 'Mawdu\'')
        ]
    )
    historical_context_notes = models.JSONField(default=dict, blank=True)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    location_in_document = models.JSONField(default=dict)  # Store precise location

    class Meta:
        indexes = [
            models.Index(fields=['document_source', 'source_type']),
            models.Index(fields=['authentication_status']),
            models.Index(fields=['created_by']),
        ]

class AnnotationLayer(models.Model):
    """Model for collaborative annotation layers on documents."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey('documents.Document', on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    created_by = models.ForeignKey(User, on_delete=models.PROTECT)
    is_public = models.BooleanField(default=True)
    metadata = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        indexes = [
            models.Index(fields=['document', 'name']),
            models.Index(fields=['created_by']),
            models.Index(fields=['is_public']),
        ]

class Annotation(models.Model):
    """Model for individual annotations within an annotation layer."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    layer = models.ForeignKey(AnnotationLayer, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    target_selector = models.JSONField()  # e.g., {"type": "text_range", "start": 100, "end": 150}
    content = models.TextField()
    tags = models.JSONField(default=list)
    metadata = models.JSONField(default=dict)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    parent = models.ForeignKey('self', null=True, blank=True, on_delete=models.CASCADE, related_name='replies')

    class Meta:
        indexes = [
            models.Index(fields=['layer', 'created_at']),
            models.Index(fields=['user']),
        ] 