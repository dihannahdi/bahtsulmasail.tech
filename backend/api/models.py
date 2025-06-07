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

# Phase 3: More granular analysis result models

class SemanticTopic(models.Model):
    """Represents a single semantic topic identified in a document."""
    document = models.ForeignKey('documents.Document', on_delete=models.CASCADE, related_name='semantic_topics')
    topic_keywords = models.JSONField(help_text="List of keywords defining the topic")
    relevance_score = models.FloatField()
    metadata = models.JSONField(null=True, blank=True)
    task = models.ForeignKey(AnalysisTask, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Topic for {self.document.id}"

class ArgumentComponent(models.Model):
    """Represents a component of an argument, such as a claim or premise."""
    document = models.ForeignKey('documents.Document', on_delete=models.CASCADE, related_name='argument_components')
    component_type = models.CharField(max_length=10, choices=[('claim', 'Claim'), ('premise', 'Premise')])
    text_span = models.TextField()
    start_char = models.IntegerField()
    end_char = models.IntegerField()
    relations = models.ManyToManyField('self', symmetrical=False, blank=True, related_name='related_to')
    confidence_score = models.FloatField()
    task = models.ForeignKey(AnalysisTask, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.get_component_type_display()} in {self.document.id}"

class Citation(models.Model):
    """Represents a citation found within a document."""
    document = models.ForeignKey('documents.Document', on_delete=models.CASCADE, related_name='citations')
    cited_source_identifier = models.TextField()
    text_span = models.TextField()
    start_char = models.IntegerField()
    end_char = models.IntegerField()
    normalized_citation = models.TextField(blank=True)
    context = models.TextField(blank=True)
    task = models.ForeignKey(AnalysisTask, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"Citation in {self.document.id}"

class KnowledgeGraphNode(models.Model):
    """Represents an entity (node) in the knowledge graph."""
    document_source = models.ForeignKey('documents.Document', on_delete=models.SET_NULL, null=True, blank=True, related_name='nodes')
    node_id = models.CharField(max_length=255, unique=True)
    label = models.CharField(max_length=255)
    type = models.CharField(max_length=50, help_text="e.g., Person, Organization, Location, Concept")
    properties = models.JSONField(default=dict)
    task = models.ForeignKey(AnalysisTask, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.label} ({self.type})"

class KnowledgeGraphEdge(models.Model):
    """Represents a relationship (edge) between entities in the knowledge graph."""
    source_node = models.ForeignKey(KnowledgeGraphNode, on_delete=models.CASCADE, related_name='source_edges')
    target_node = models.ForeignKey(KnowledgeGraphNode, on_delete=models.CASCADE, related_name='target_edges')
    label = models.CharField(max_length=100, help_text="e.g., 'cites', 'argues_for', 'related_to'")
    properties = models.JSONField(default=dict)
    document_context = models.ForeignKey('documents.Document', on_delete=models.SET_NULL, null=True, blank=True, related_name='edges')
    task = models.ForeignKey(AnalysisTask, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return f"{self.source_node} -> {self.label} -> {self.target_node}"
