from django.db import models
import uuid

class AnalysisTask(models.Model):
    """Base model for all AI analysis tasks"""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey('documents.Document', on_delete=models.CASCADE)
    task_type = models.CharField(max_length=50)  # e.g., 'semantic', 'arguments', 'principles'
    status = models.CharField(max_length=20, default='pending')  # pending, processing, completed, failed
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    error_message = models.TextField(null=True, blank=True)
    celery_task_id = models.CharField(max_length=255, null=True, blank=True)

    class Meta:
        indexes = [
            models.Index(fields=['document', 'task_type']),
            models.Index(fields=['status']),
        ]

class SemanticAnalysis(models.Model):
    """Results of semantic analysis"""
    task = models.OneToOneField(AnalysisTask, on_delete=models.CASCADE)
    topics = models.JSONField()  # List of identified topics with confidence scores
    themes = models.JSONField()  # Extracted themes
    sentiment = models.JSONField(null=True, blank=True)  # Sentiment analysis if applicable
    results = models.JSONField()  # Additional semantic analysis results

class ArgumentAnalysis(models.Model):
    """Results of argument analysis"""
    task = models.OneToOneField(AnalysisTask, on_delete=models.CASCADE)
    arguments = models.JSONField()  # List of identified arguments with their structure
    evidence = models.JSONField()  # Supporting evidence for arguments
    relationships = models.JSONField()  # Relationships between arguments

class PrincipleAnalysis(models.Model):
    """Results of principle analysis"""
    task = models.OneToOneField(AnalysisTask, on_delete=models.CASCADE)
    principles = models.JSONField()  # Extracted legal principles
    rulings = models.JSONField()  # Identified rulings
    methodologies = models.JSONField()  # Extracted methodologies
    references = models.JSONField()  # Text references for each principle/ruling

class DocumentSummary(models.Model):
    """Generated document summaries"""
    task = models.OneToOneField(AnalysisTask, on_delete=models.CASCADE)
    summary_type = models.CharField(max_length=50)  # e.g., 'abstractive', 'extractive'
    content = models.TextField()
    metadata = models.JSONField()  # Additional summary metadata

class KnowledgeGraphUpdate(models.Model):
    """Knowledge graph updates"""
    task = models.OneToOneField(AnalysisTask, on_delete=models.CASCADE)
    entities = models.JSONField()  # New entities to add
    relationships = models.JSONField()  # New relationships to add
    status = models.CharField(max_length=20, default='pending')  # pending, applied, failed

class SchoolComparison(models.Model):
    """Results of school comparison analysis"""
    task = models.OneToOneField(AnalysisTask, on_delete=models.CASCADE)
    comparison_type = models.CharField(max_length=50)  # e.g., 'documents', 'topics'
    schools = models.JSONField()  # Schools being compared
    similarities = models.JSONField()  # Similar points
    differences = models.JSONField()  # Different points
    analysis = models.JSONField()  # Detailed comparison analysis
