from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from .models import (
    AnalysisTask, SemanticAnalysis, ArgumentAnalysis,
    PrincipleAnalysis, DocumentSummary, KnowledgeGraphUpdate,
    SchoolComparison
)
from .models import SemanticTopic, ArgumentComponent, Citation, KnowledgeGraphNode, KnowledgeGraphEdge
from .serializers import (
    AnalysisTaskSerializer, SemanticAnalysisSerializer,
    ArgumentAnalysisSerializer, PrincipleAnalysisSerializer,
    DocumentSummarySerializer, KnowledgeGraphUpdateSerializer,
    SchoolComparisonSerializer, SemanticTopicSerializer,
    ArgumentComponentSerializer, CitationSerializer,
    KnowledgeGraphNodeSerializer, KnowledgeGraphEdgeSerializer
)
from .tasks import (
    process_semantic_analysis, process_argument_analysis,
    process_principle_analysis, process_document_summary,
    process_knowledge_graph_update, process_school_comparison,
    perform_semantic_analysis, extract_arguments, detect_citations,
    update_knowledge_graph
)

# Create your views here.

@api_view(['GET'])
def health_check(request):
    """
    A simple health check endpoint.
    """
    return Response({"status": "ok", "message": "API is healthy"}, status=status.HTTP_200_OK)

class AnalysisTaskViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = AnalysisTask.objects.all()
    serializer_class = AnalysisTaskSerializer

    @action(detail=True, methods=['get'])
    def status(self, request, pk=None):
        task = self.get_object()
        return Response({
            'status': task.status,
            'error_message': task.error_message
        })

class SemanticAnalysisViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = SemanticAnalysis.objects.all()
    serializer_class = SemanticAnalysisSerializer

    def create(self, request, *args, **kwargs):
        task = AnalysisTask.objects.create(
            document_id=request.data.get('document_id'),
            task_type='semantic'
        )
        process_semantic_analysis.delay(task.id)
        return Response(
            AnalysisTaskSerializer(task).data,
            status=status.HTTP_202_ACCEPTED
        )

class ArgumentAnalysisViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = ArgumentAnalysis.objects.all()
    serializer_class = ArgumentAnalysisSerializer

    def create(self, request, *args, **kwargs):
        task = AnalysisTask.objects.create(
            document_id=request.data.get('document_id'),
            task_type='arguments'
        )
        process_argument_analysis.delay(task.id)
        return Response(
            AnalysisTaskSerializer(task).data,
            status=status.HTTP_202_ACCEPTED
        )

class PrincipleAnalysisViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = PrincipleAnalysis.objects.all()
    serializer_class = PrincipleAnalysisSerializer

    def create(self, request, *args, **kwargs):
        task = AnalysisTask.objects.create(
            document_id=request.data.get('document_id'),
            task_type='principles'
        )
        process_principle_analysis.delay(task.id)
        return Response(
            AnalysisTaskSerializer(task).data,
            status=status.HTTP_202_ACCEPTED
        )

class DocumentSummaryViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = DocumentSummary.objects.all()
    serializer_class = DocumentSummarySerializer

    def create(self, request, *args, **kwargs):
        task = AnalysisTask.objects.create(
            document_id=request.data.get('document_id'),
            task_type='summary'
        )
        process_document_summary.delay(
            task.id,
            summary_type=request.data.get('summary_type', 'abstractive')
        )
        return Response(
            AnalysisTaskSerializer(task).data,
            status=status.HTTP_202_ACCEPTED
        )

class KnowledgeGraphUpdateViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = KnowledgeGraphUpdate.objects.all()
    serializer_class = KnowledgeGraphUpdateSerializer

    def create(self, request, *args, **kwargs):
        task = AnalysisTask.objects.create(
            document_id=request.data.get('document_id'),
            task_type='knowledge_graph'
        )
        process_knowledge_graph_update.delay(task.id)
        return Response(
            AnalysisTaskSerializer(task).data,
            status=status.HTTP_202_ACCEPTED
        )

class SchoolComparisonViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = SchoolComparison.objects.all()
    serializer_class = SchoolComparisonSerializer

    def create(self, request, *args, **kwargs):
        task = AnalysisTask.objects.create(
            document_id=request.data.get('document_id'),
            task_type='school_comparison'
        )
        process_school_comparison.delay(
            task.id,
            comparison_type=request.data.get('comparison_type'),
            schools=request.data.get('schools', [])
        )
        return Response(
            AnalysisTaskSerializer(task).data,
            status=status.HTTP_202_ACCEPTED
        )

class SemanticTopicViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = SemanticTopic.objects.all()
    serializer_class = SemanticTopicSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SemanticTopic.objects.filter(document_id=self.kwargs['document_id']).select_related('document')

class ArgumentComponentViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ArgumentComponent.objects.all()
    serializer_class = ArgumentComponentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ArgumentComponent.objects.filter(document_id=self.kwargs['document_id']).select_related('document')

class CitationViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Citation.objects.all()
    serializer_class = CitationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Citation.objects.filter(document_id=self.kwargs['document_id']).select_related('document')

class KnowledgeGraphNodeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = KnowledgeGraphNode.objects.all()
    serializer_class = KnowledgeGraphNodeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # This could be expanded to filter by document or other criteria
        return KnowledgeGraphNode.objects.all()

class KnowledgeGraphEdgeViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = KnowledgeGraphEdge.objects.all()
    serializer_class = KnowledgeGraphEdgeSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # This could be expanded to filter by document or other criteria
        return KnowledgeGraphEdge.objects.all()
