from django.db import models
from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType
from pgvector.django import VectorField
import uuid


class Embedding(models.Model):
    """
    Model for storing vector embeddings for various content types.
    Uses pgvector's VectorField to store embeddings in PostgreSQL.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # Generic foreign key to associate with any model
    content_type = models.ForeignKey(ContentType, on_delete=models.CASCADE)
    object_id = models.UUIDField()
    content_object = GenericForeignKey('content_type', 'object_id')
    
    # Vector embedding
    embedding = VectorField(dimensions=768)  # BERT base embedding size
    embedding_type = models.CharField(max_length=100)  # e.g., 'bert', 'openai', etc.
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    metadata = models.JSONField(default=dict)
    
    class Meta:
        indexes = [
            models.Index(fields=['content_type', 'object_id']),
            models.Index(fields=['embedding_type']),
        ]
        # Note: pgvector-specific index will be created in a migration


class SemanticSearch(models.Model):
    """
    Model for storing semantic search configurations and history.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True)
    
    # Search configuration
    content_types = models.ManyToManyField(ContentType)
    embedding_types = models.JSONField(default=list)  # List of embedding types to search
    
    # Search parameters
    similarity_threshold = models.FloatField(default=0.7)
    max_results = models.PositiveIntegerField(default=100)
    
    # Metadata
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name_plural = "Semantic Searches"
        ordering = ['-created_at']
        
    def __str__(self):
        return self.name