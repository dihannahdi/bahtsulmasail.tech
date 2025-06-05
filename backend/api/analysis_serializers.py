from rest_framework import serializers
from .models import (
    AnalysisTask, SemanticAnalysis, ArgumentAnalysis,
    PrincipleAnalysis, DocumentSummary, KnowledgeGraphUpdate,
    SchoolComparison
)

class AnalysisTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalysisTask
        fields = [
            'id', 'document_id', 'task_type', 'status',
            'created_at', 'updated_at', 'error_message'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class SemanticAnalysisSerializer(serializers.ModelSerializer):
    task = AnalysisTaskSerializer(read_only=True)

    class Meta:
        model = SemanticAnalysis
        fields = ['task', 'topics', 'themes', 'sentiment', 'results']

class ArgumentAnalysisSerializer(serializers.ModelSerializer):
    task = AnalysisTaskSerializer(read_only=True)

    class Meta:
        model = ArgumentAnalysis
        fields = ['task', 'arguments', 'evidence', 'relationships']

class PrincipleAnalysisSerializer(serializers.ModelSerializer):
    task = AnalysisTaskSerializer(read_only=True)

    class Meta:
        model = PrincipleAnalysis
        fields = ['task', 'principles', 'rulings', 'methodologies', 'references']

class DocumentSummarySerializer(serializers.ModelSerializer):
    task = AnalysisTaskSerializer(read_only=True)

    class Meta:
        model = DocumentSummary
        fields = ['task', 'summary_type', 'content', 'metadata']

class KnowledgeGraphUpdateSerializer(serializers.ModelSerializer):
    task = AnalysisTaskSerializer(read_only=True)

    class Meta:
        model = KnowledgeGraphUpdate
        fields = ['task', 'entities', 'relationships', 'status']

class SchoolComparisonSerializer(serializers.ModelSerializer):
    task = AnalysisTaskSerializer(read_only=True)

    class Meta:
        model = SchoolComparison
        fields = [
            'task', 'comparison_type', 'schools',
            'similarities', 'differences', 'analysis'
        ] 