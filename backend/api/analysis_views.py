from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
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

class AnalysisViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def _create_analysis_task(self, document_id, task_type, parameters=None):
        """Helper method to create an analysis task"""
        task = AnalysisTask.objects.create(
            document_id=document_id,
            task_type=task_type,
            status='pending'
        )
        return task

    @action(detail=False, methods=['post'])
    def semantic(self, request):
        """Initiate semantic analysis"""
        document_id = request.data.get('document_id')
        parameters = request.data.get('analysis_parameters', {})
        
        task = self._create_analysis_task(document_id, 'semantic', parameters)
        process_semantic_analysis.delay(task.id, parameters)
        
        return Response(
            AnalysisTaskSerializer(task).data,
            status=status.HTTP_202_ACCEPTED
        )

    @action(detail=False, methods=['get'])
    def semantic_results(self, request):
        """Get semantic analysis results"""
        task_id = request.query_params.get('task_id')
        task = get_object_or_404(AnalysisTask, id=task_id)
        
        if task.status != 'completed':
            return Response(
                {'status': task.status},
                status=status.HTTP_200_OK
            )
            
        analysis = get_object_or_404(SemanticAnalysis, task=task)
        return Response(SemanticAnalysisSerializer(analysis).data)

    @action(detail=False, methods=['post'])
    def arguments(self, request):
        """Initiate argument analysis"""
        document_id = request.data.get('document_id')
        parameters = request.data.get('analysis_parameters', {})
        
        task = self._create_analysis_task(document_id, 'arguments', parameters)
        process_argument_analysis.delay(task.id, parameters)
        
        return Response(
            AnalysisTaskSerializer(task).data,
            status=status.HTTP_202_ACCEPTED
        )

    @action(detail=False, methods=['get'])
    def argument_results(self, request):
        """Get argument analysis results"""
        task_id = request.query_params.get('task_id')
        task = get_object_or_404(AnalysisTask, id=task_id)
        
        if task.status != 'completed':
            return Response(
                {'status': task.status},
                status=status.HTTP_200_OK
            )
            
        analysis = get_object_or_404(ArgumentAnalysis, task=task)
        return Response(ArgumentAnalysisSerializer(analysis).data)

    @action(detail=False, methods=['post'])
    def principles(self, request):
        """Initiate principle analysis"""
        document_id = request.data.get('document_id')
        parameters = request.data.get('analysis_parameters', {})
        
        task = self._create_analysis_task(document_id, 'principles', parameters)
        process_principle_analysis.delay(task.id, parameters)
        
        return Response(
            AnalysisTaskSerializer(task).data,
            status=status.HTTP_202_ACCEPTED
        )

    @action(detail=False, methods=['get'])
    def principle_results(self, request):
        """Get principle analysis results"""
        task_id = request.query_params.get('task_id')
        task = get_object_or_404(AnalysisTask, id=task_id)
        
        if task.status != 'completed':
            return Response(
                {'status': task.status},
                status=status.HTTP_200_OK
            )
            
        analysis = get_object_or_404(PrincipleAnalysis, task=task)
        return Response(PrincipleAnalysisSerializer(analysis).data)

    @action(detail=False, methods=['post'])
    def summaries(self, request):
        """Generate document summary"""
        document_id = request.data.get('document_id')
        parameters = request.data.get('summary_parameters', {})
        
        task = self._create_analysis_task(document_id, 'summary', parameters)
        process_document_summary.delay(task.id, parameters)
        
        return Response(
            AnalysisTaskSerializer(task).data,
            status=status.HTTP_202_ACCEPTED
        )

    @action(detail=False, methods=['get'])
    def summary_results(self, request):
        """Get document summary results"""
        task_id = request.query_params.get('task_id')
        task = get_object_or_404(AnalysisTask, id=task_id)
        
        if task.status != 'completed':
            return Response(
                {'status': task.status},
                status=status.HTTP_200_OK
            )
            
        summary = get_object_or_404(DocumentSummary, task=task)
        return Response(DocumentSummarySerializer(summary).data)

    @action(detail=False, methods=['post'])
    def knowledge_graph(self, request):
        """Update knowledge graph"""
        document_id = request.data.get('document_id')
        parameters = request.data.get('update_parameters', {})
        
        task = self._create_analysis_task(document_id, 'knowledge_graph', parameters)
        process_knowledge_graph_update.delay(task.id, parameters)
        
        return Response(
            AnalysisTaskSerializer(task).data,
            status=status.HTTP_202_ACCEPTED
        )

    @action(detail=False, methods=['get'])
    def knowledge_graph_query(self, request):
        """Query knowledge graph"""
        query = request.query_params.get('query')
        limit = int(request.query_params.get('limit', 100))
        
        # Implement knowledge graph query logic here
        # This would typically interact with a graph database
        # For now, return a placeholder response
        return Response({
            'entities': [],
            'relationships': []
        })

    @action(detail=False, methods=['post'])
    def school_comparison(self, request):
        """Initiate school comparison analysis"""
        document_ids = request.data.get('document_ids', [])
        parameters = request.data.get('comparison_parameters', {})
        
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
        """Get school comparison results"""
        task_id = request.query_params.get('task_id')
        task = get_object_or_404(AnalysisTask, id=task_id)
        
        if task.status != 'completed':
            return Response(
                {'status': task.status},
                status=status.HTTP_200_OK
            )
            
        comparison = get_object_or_404(SchoolComparison, task=task)
        return Response(SchoolComparisonSerializer(comparison).data) 