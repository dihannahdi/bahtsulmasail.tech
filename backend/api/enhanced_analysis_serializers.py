from rest_framework import serializers
from .models import (
    AnalysisTask, SemanticAnalysis, ArgumentAnalysis,
    PrincipleAnalysis, DocumentSummary, KnowledgeGraphUpdate,
    SchoolComparison
)

class AnalysisTaskSerializer(serializers.ModelSerializer):
    """Enhanced serializer for analysis tasks"""
    class Meta:
        model = AnalysisTask
        fields = [
            'id', 'document', 'task_type', 'status',
            'created_at', 'updated_at', 'error_message',
            'parameters'
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

class SemanticAnalysisSerializer(serializers.ModelSerializer):
    """Enhanced serializer for semantic analysis results"""
    class Meta:
        model = SemanticAnalysis
        fields = [
            'task', 'topics', 'themes', 'sentiment',
            'results', 'raw_analysis'
        ]
        read_only_fields = ['task']

    def to_representation(self, instance):
        """Custom representation to handle nested data"""
        data = super().to_representation(instance)
        # Add confidence scores to topics if not present
        if 'topics' in data and isinstance(data['topics'], list):
            for topic in data['topics']:
                if 'confidence' not in topic:
                    topic['confidence'] = 1.0
        return data

class ArgumentAnalysisSerializer(serializers.ModelSerializer):
    """Enhanced serializer for argument analysis results"""
    class Meta:
        model = ArgumentAnalysis
        fields = [
            'task', 'arguments', 'evidence',
            'relationships', 'raw_analysis'
        ]
        read_only_fields = ['task']

    def to_representation(self, instance):
        """Custom representation to handle nested data"""
        data = super().to_representation(instance)
        # Add structure to arguments if not present
        if 'arguments' in data and isinstance(data['arguments'], list):
            for argument in data['arguments']:
                if 'structure' not in argument:
                    argument['structure'] = {
                        'premises': [],
                        'conclusion': None
                    }
        return data

class PrincipleAnalysisSerializer(serializers.ModelSerializer):
    """Enhanced serializer for principle analysis results"""
    class Meta:
        model = PrincipleAnalysis
        fields = [
            'task', 'principles', 'rulings',
            'methodologies', 'references', 'raw_analysis'
        ]
        read_only_fields = ['task']

    def to_representation(self, instance):
        """Custom representation to handle nested data"""
        data = super().to_representation(instance)
        # Add metadata to principles if not present
        if 'principles' in data and isinstance(data['principles'], list):
            for principle in data['principles']:
                if 'metadata' not in principle:
                    principle['metadata'] = {
                        'source': None,
                        'confidence': 1.0,
                        'historical_context': None
                    }
        return data

class DocumentSummarySerializer(serializers.ModelSerializer):
    """Enhanced serializer for document summaries"""
    class Meta:
        model = DocumentSummary
        fields = [
            'task', 'summary_type', 'content',
            'metadata', 'raw_analysis'
        ]
        read_only_fields = ['task']

    def to_representation(self, instance):
        """Custom representation to handle nested data"""
        data = super().to_representation(instance)
        # Add formatting metadata if not present
        if 'metadata' not in data:
            data['metadata'] = {
                'format': 'text',
                'language': 'en',
                'version': '1.0'
            }
        return data

class KnowledgeGraphUpdateSerializer(serializers.ModelSerializer):
    """Enhanced serializer for knowledge graph updates"""
    class Meta:
        model = KnowledgeGraphUpdate
        fields = [
            'task', 'entities', 'relationships',
            'status', 'raw_analysis'
        ]
        read_only_fields = ['task']

    def to_representation(self, instance):
        """Custom representation to handle nested data"""
        data = super().to_representation(instance)
        # Add metadata to entities if not present
        if 'entities' in data and isinstance(data['entities'], list):
            for entity in data['entities']:
                if 'metadata' not in entity:
                    entity['metadata'] = {
                        'confidence': 1.0,
                        'source': None,
                        'last_updated': None
                    }
        return data

class SchoolComparisonSerializer(serializers.ModelSerializer):
    """Enhanced serializer for school comparison results"""
    class Meta:
        model = SchoolComparison
        fields = [
            'task', 'comparison_type', 'schools',
            'similarities', 'differences', 'analysis',
            'evidence', 'historical_context', 'raw_analysis'
        ]
        read_only_fields = ['task']

    def to_representation(self, instance):
        """Custom representation to handle nested data"""
        data = super().to_representation(instance)
        # Add metadata to comparisons if not present
        if 'similarities' in data and isinstance(data['similarities'], list):
            for similarity in data['similarities']:
                if 'metadata' not in similarity:
                    similarity['metadata'] = {
                        'confidence': 1.0,
                        'source': None,
                        'context': None
                    }
        return data 