from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.core.cache import cache
from django.conf import settings
from rest_framework.throttling import UserRateThrottle
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.filters import SearchFilter, OrderingFilter
from django_filters.rest_framework import DjangoFilterBackend
from .models import (
    AnalysisTask, SemanticAnalysis, ArgumentAnalysis,
    PrincipleAnalysis, DocumentSummary, KnowledgeGraphUpdate,
    SchoolComparison
)
from .tasks import (
    process_semantic_analysis, process_argument_analysis,
    process_principle_analysis, process_document_summary,
    process_knowledge_graph_update, process_school_comparison
)
from .serializers import (
    AnalysisTaskSerializer, SemanticAnalysisSerializer,
    ArgumentAnalysisSerializer, PrincipleAnalysisSerializer,
    DocumentSummarySerializer, KnowledgeGraphUpdateSerializer,
    SchoolComparisonSerializer
)

class EnhancedAnalysisThrottle(UserRateThrottle):
    """Custom throttle for AI analysis endpoints"""
    rate = '10/hour'  # Adjust based on your requirements

class EnhancedAnalysisPagination(LimitOffsetPagination):
    """Custom pagination for analysis results"""
    default_limit = 20
    max_limit = 100

class EnhancedAnalysisViewSet(viewsets.ViewSet):
    """
    Enhanced ViewSet for AI Analysis Pipeline endpoints.
    Implements improved error handling, caching, and monitoring.
    """
    permission_classes = [IsAuthenticated]
    throttle_classes = [EnhancedAnalysisThrottle]
    pagination_class = EnhancedAnalysisPagination
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_fields = ['status', 'task_type']
    search_fields = ['document__title', 'document__content']
    ordering_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']

    def _create_analysis_task(self, document_id, task_type, parameters=None):
        """Enhanced helper method to create an analysis task with improved error handling"""
        try:
            task = AnalysisTask.objects.create(
                document_id=document_id,
                task_type=task_type,
                status='pending',
                parameters=parameters or {}
            )
            return task
        except Exception as e:
            # Log the error and raise a more specific exception
            logger.error(f"Failed to create analysis task: {str(e)}")
            raise

    def _get_cached_results(self, task_id, cache_key):
        """Helper method to get cached results"""
        cached_results = cache.get(cache_key)
        if cached_results:
            return Response(cached_results)
        return None

    def _cache_results(self, cache_key, results, timeout=3600):
        """Helper method to cache results"""
        cache.set(cache_key, results, timeout)

    @action(detail=False, methods=['post'])
    def semantic(self, request):
        """
        Enhanced semantic analysis endpoint.
        
        Request body:
        {
            "document_id": "uuid",
            "analysis_parameters": {
                "depth": "shallow|medium|deep",
                "include_sentiment": boolean,
                "language": "ar|en",
                "custom_parameters": {}
            }
        }
        """
        document_id = request.data.get('document_id')
        parameters = request.data.get('analysis_parameters', {})
        
        # Validate parameters
        if not document_id:
            return Response(
                {'error': 'document_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        task = self._create_analysis_task(document_id, 'semantic', parameters)
        process_semantic_analysis.delay(task.id, parameters)
        
        return Response(
            AnalysisTaskSerializer(task).data,
            status=status.HTTP_202_ACCEPTED
        )

    @action(detail=False, methods=['get'])
    def semantic_results(self, request):
        """
        Get semantic analysis results with caching.
        
        Query parameters:
        - task_id: UUID of the analysis task
        - include_raw: boolean to include raw analysis data
        """
        task_id = request.query_params.get('task_id')
        include_raw = request.query_params.get('include_raw', 'false').lower() == 'true'
        
        if not task_id:
            return Response(
                {'error': 'task_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        cache_key = f'semantic_results_{task_id}_{include_raw}'
        cached_response = self._get_cached_results(task_id, cache_key)
        if cached_response:
            return cached_response
        
        task = get_object_or_404(AnalysisTask, id=task_id)
        
        if task.status != 'completed':
            return Response(
                {'status': task.status},
                status=status.HTTP_200_OK
            )
            
        analysis = get_object_or_404(SemanticAnalysis, task=task)
        serializer = SemanticAnalysisSerializer(analysis)
        results = serializer.data
        
        if not include_raw:
            results.pop('raw_analysis', None)
        
        self._cache_results(cache_key, results)
        return Response(results)

    @action(detail=False, methods=['post'])
    def arguments(self, request):
        """
        Enhanced argument analysis endpoint.
        
        Request body:
        {
            "document_id": "uuid",
            "analysis_parameters": {
                "depth": "shallow|medium|deep",
                "include_evidence": boolean,
                "include_counter_arguments": boolean,
                "custom_parameters": {}
            }
        }
        """
        document_id = request.data.get('document_id')
        parameters = request.data.get('analysis_parameters', {})
        
        if not document_id:
            return Response(
                {'error': 'document_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        task = self._create_analysis_task(document_id, 'arguments', parameters)
        process_argument_analysis.delay(task.id, parameters)
        
        return Response(
            AnalysisTaskSerializer(task).data,
            status=status.HTTP_202_ACCEPTED
        )

    @action(detail=False, methods=['get'])
    def argument_results(self, request):
        """
        Get argument analysis results with caching.
        
        Query parameters:
        - task_id: UUID of the analysis task
        - include_evidence: boolean to include evidence details
        """
        task_id = request.query_params.get('task_id')
        include_evidence = request.query_params.get('include_evidence', 'true').lower() == 'true'
        
        if not task_id:
            return Response(
                {'error': 'task_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        cache_key = f'argument_results_{task_id}_{include_evidence}'
        cached_response = self._get_cached_results(task_id, cache_key)
        if cached_response:
            return cached_response
        
        task = get_object_or_404(AnalysisTask, id=task_id)
        
        if task.status != 'completed':
            return Response(
                {'status': task.status},
                status=status.HTTP_200_OK
            )
            
        analysis = get_object_or_404(ArgumentAnalysis, task=task)
        serializer = ArgumentAnalysisSerializer(analysis)
        results = serializer.data
        
        if not include_evidence:
            results.pop('evidence', None)
        
        self._cache_results(cache_key, results)
        return Response(results)

    @action(detail=False, methods=['post'])
    def principles(self, request):
        """
        Enhanced principle analysis endpoint.
        
        Request body:
        {
            "document_id": "uuid",
            "analysis_parameters": {
                "include_rulings": boolean,
                "include_methodologies": boolean,
                "include_references": boolean,
                "custom_parameters": {}
            }
        }
        """
        document_id = request.data.get('document_id')
        parameters = request.data.get('analysis_parameters', {})
        
        if not document_id:
            return Response(
                {'error': 'document_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        task = self._create_analysis_task(document_id, 'principles', parameters)
        process_principle_analysis.delay(task.id, parameters)
        
        return Response(
            AnalysisTaskSerializer(task).data,
            status=status.HTTP_202_ACCEPTED
        )

    @action(detail=False, methods=['get'])
    def principle_results(self, request):
        """
        Get principle analysis results with caching.
        
        Query parameters:
        - task_id: UUID of the analysis task
        - include_references: boolean to include reference details
        """
        task_id = request.query_params.get('task_id')
        include_references = request.query_params.get('include_references', 'true').lower() == 'true'
        
        if not task_id:
            return Response(
                {'error': 'task_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        cache_key = f'principle_results_{task_id}_{include_references}'
        cached_response = self._get_cached_results(task_id, cache_key)
        if cached_response:
            return cached_response
        
        task = get_object_or_404(AnalysisTask, id=task_id)
        
        if task.status != 'completed':
            return Response(
                {'status': task.status},
                status=status.HTTP_200_OK
            )
            
        analysis = get_object_or_404(PrincipleAnalysis, task=task)
        serializer = PrincipleAnalysisSerializer(analysis)
        results = serializer.data
        
        if not include_references:
            results.pop('references', None)
        
        self._cache_results(cache_key, results)
        return Response(results)

    @action(detail=False, methods=['post'])
    def summaries(self, request):
        """
        Enhanced document summary endpoint.
        
        Request body:
        {
            "document_id": "uuid",
            "summary_parameters": {
                "type": "abstractive|extractive",
                "length": "short|medium|long",
                "focus": ["key_points", "arguments", "principles"],
                "language": "ar|en",
                "custom_parameters": {}
            }
        }
        """
        document_id = request.data.get('document_id')
        parameters = request.data.get('summary_parameters', {})
        
        if not document_id:
            return Response(
                {'error': 'document_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        task = self._create_analysis_task(document_id, 'summary', parameters)
        process_document_summary.delay(task.id, parameters)
        
        return Response(
            AnalysisTaskSerializer(task).data,
            status=status.HTTP_202_ACCEPTED
        )

    @action(detail=False, methods=['get'])
    def summary_results(self, request):
        """
        Get document summary results with caching.
        
        Query parameters:
        - task_id: UUID of the analysis task
        - format: "text|html|markdown"
        """
        task_id = request.query_params.get('task_id')
        format_type = request.query_params.get('format', 'text')
        
        if not task_id:
            return Response(
                {'error': 'task_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        cache_key = f'summary_results_{task_id}_{format_type}'
        cached_response = self._get_cached_results(task_id, cache_key)
        if cached_response:
            return cached_response
        
        task = get_object_or_404(AnalysisTask, id=task_id)
        
        if task.status != 'completed':
            return Response(
                {'status': task.status},
                status=status.HTTP_200_OK
            )
            
        summary = get_object_or_404(DocumentSummary, task=task)
        serializer = DocumentSummarySerializer(summary)
        results = serializer.data
        
        # Format the summary based on the requested format
        if format_type == 'html':
            results['content'] = self._format_summary_html(results['content'])
        elif format_type == 'markdown':
            results['content'] = self._format_summary_markdown(results['content'])
        
        self._cache_results(cache_key, results)
        return Response(results)

    @action(detail=False, methods=['post'])
    def knowledge_graph(self, request):
        """
        Enhanced knowledge graph update endpoint.
        
        Request body:
        {
            "document_id": "uuid",
            "update_parameters": {
                "include_relationships": boolean,
                "include_metadata": boolean,
                "update_strategy": "append|replace",
                "custom_parameters": {}
            }
        }
        """
        document_id = request.data.get('document_id')
        parameters = request.data.get('update_parameters', {})
        
        if not document_id:
            return Response(
                {'error': 'document_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        task = self._create_analysis_task(document_id, 'knowledge_graph', parameters)
        process_knowledge_graph_update.delay(task.id, parameters)
        
        return Response(
            AnalysisTaskSerializer(task).data,
            status=status.HTTP_202_ACCEPTED
        )

    @action(detail=False, methods=['get'])
    def knowledge_graph_query(self, request):
        """
        Enhanced knowledge graph query endpoint.
        
        Query parameters:
        - query: GraphQL query string
        - depth: Maximum traversal depth
        - limit: Maximum number of results
        - include_metadata: boolean
        """
        query = request.query_params.get('query')
        depth = int(request.query_params.get('depth', 2))
        limit = int(request.query_params.get('limit', 100))
        include_metadata = request.query_params.get('include_metadata', 'true').lower() == 'true'
        
        if not query:
            return Response(
                {'error': 'query is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Implement knowledge graph query logic here
        # This would typically interact with a graph database
        # For now, return a placeholder response
        return Response({
            'entities': [],
            'relationships': [],
            'metadata': {} if include_metadata else None
        })

    @action(detail=False, methods=['post'])
    def school_comparison(self, request):
        """
        Enhanced school comparison endpoint.
        
        Request body:
        {
            "document_ids": ["uuid1", "uuid2", ...],
            "comparison_parameters": {
                "comparison_type": "documents|topics",
                "include_evidence": boolean,
                "include_historical_context": boolean,
                "custom_parameters": {}
            }
        }
        """
        document_ids = request.data.get('document_ids', [])
        parameters = request.data.get('comparison_parameters', {})
        
        if not document_ids or len(document_ids) < 2:
            return Response(
                {'error': 'At least two document_ids are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Create a task for each document pair comparison
        tasks = []
        for i in range(len(document_ids)):
            for j in range(i + 1, len(document_ids)):
                task = self._create_analysis_task(
                    document_ids[i],
                    'school_comparison',
                    {**parameters, 'comparison_document_id': document_ids[j]}
                )
                tasks.append(task)
                process_school_comparison.delay(task.id, parameters)
        
        return Response(
            AnalysisTaskSerializer(tasks, many=True).data,
            status=status.HTTP_202_ACCEPTED
        )

    @action(detail=False, methods=['get'])
    def school_comparison_results(self, request):
        """
        Get school comparison results with caching.
        
        Query parameters:
        - task_id: UUID of the analysis task
        - include_evidence: boolean
        - include_historical_context: boolean
        """
        task_id = request.query_params.get('task_id')
        include_evidence = request.query_params.get('include_evidence', 'true').lower() == 'true'
        include_historical_context = request.query_params.get('include_historical_context', 'true').lower() == 'true'
        
        if not task_id:
            return Response(
                {'error': 'task_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        cache_key = f'school_comparison_results_{task_id}_{include_evidence}_{include_historical_context}'
        cached_response = self._get_cached_results(task_id, cache_key)
        if cached_response:
            return cached_response
        
        task = get_object_or_404(AnalysisTask, id=task_id)
        
        if task.status != 'completed':
            return Response(
                {'status': task.status},
                status=status.HTTP_200_OK
            )
            
        comparison = get_object_or_404(SchoolComparison, task=task)
        serializer = SchoolComparisonSerializer(comparison)
        results = serializer.data
        
        if not include_evidence:
            results.pop('evidence', None)
        if not include_historical_context:
            results.pop('historical_context', None)
        
        self._cache_results(cache_key, results)
        return Response(results)

    def _format_summary_html(self, content):
        """Helper method to format summary as HTML"""
        # Implement HTML formatting logic
        return f"<div class='summary'>{content}</div>"

    def _format_summary_markdown(self, content):
        """Helper method to format summary as Markdown"""
        # Implement Markdown formatting logic
        return f"# Summary\n\n{content}" 