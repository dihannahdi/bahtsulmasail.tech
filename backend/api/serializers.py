from rest_framework import serializers
from .models import (
    AnalysisTask, SemanticAnalysis, ArgumentAnalysis,
    PrincipleAnalysis, DocumentSummary, KnowledgeGraphUpdate,
    SchoolComparison
)

class AnalysisTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalysisTask
        fields = ['id', 'document', 'task_type', 'status', 'created_at', 
                 'updated_at', 'error_message']
        read_only_fields = ['id', 'status', 'created_at', 'updated_at', 'error_message']

class SemanticAnalysisSerializer(serializers.ModelSerializer):
    task = AnalysisTaskSerializer(read_only=True)

    class Meta:
        model = SemanticAnalysis
        fields = ['task', 'topics', 'themes', 'sentiment', 'results']
        read_only_fields = ['task']

class ArgumentAnalysisSerializer(serializers.ModelSerializer):
    task = AnalysisTaskSerializer(read_only=True)

    class Meta:
        model = ArgumentAnalysis
        fields = ['task', 'arguments', 'evidence', 'relationships']
        read_only_fields = ['task']

class PrincipleAnalysisSerializer(serializers.ModelSerializer):
    task = AnalysisTaskSerializer(read_only=True)

    class Meta:
        model = PrincipleAnalysis
        fields = ['task', 'principles', 'rulings', 'methodologies', 'references']
        read_only_fields = ['task']

class DocumentSummarySerializer(serializers.ModelSerializer):
    task = AnalysisTaskSerializer(read_only=True)

    class Meta:
        model = DocumentSummary
        fields = ['task', 'summary_type', 'content', 'metadata']
        read_only_fields = ['task']

class KnowledgeGraphUpdateSerializer(serializers.ModelSerializer):
    task = AnalysisTaskSerializer(read_only=True)

    class Meta:
        model = KnowledgeGraphUpdate
        fields = ['task', 'entities', 'relationships', 'status']
        read_only_fields = ['task', 'status']

class SchoolComparisonSerializer(serializers.ModelSerializer):
    task = AnalysisTaskSerializer(read_only=True)

    class Meta:
        model = SchoolComparison
        fields = ['task', 'comparison_type', 'schools', 'similarities', 
                 'differences', 'analysis']
        read_only_fields = ['task'] 