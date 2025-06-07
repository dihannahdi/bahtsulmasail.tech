from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    AnalysisTaskViewSet, SemanticAnalysisViewSet,
    ArgumentAnalysisViewSet, PrincipleAnalysisViewSet,
    DocumentSummaryViewSet, KnowledgeGraphUpdateViewSet,
    SchoolComparisonViewSet
)
from .analysis_views import AnalysisViewSet
from .enhanced_analysis_views import EnhancedAnalysisViewSet

router = DefaultRouter()
router.register(r'tasks', AnalysisTaskViewSet)
router.register(r'semantic', SemanticAnalysisViewSet)
router.register(r'arguments', ArgumentAnalysisViewSet)
router.register(r'principles', PrincipleAnalysisViewSet)
router.register(r'summaries', DocumentSummaryViewSet)
router.register(r'knowledge-graph', KnowledgeGraphUpdateViewSet)
router.register(r'school-comparison', SchoolComparisonViewSet)
router.register(r'analysis', AnalysisViewSet, basename='analysis')
router.register(r'enhanced-analysis', EnhancedAnalysisViewSet, basename='enhanced-analysis')

# Define a new router for the document-specific analysis actions
analysis_router = DefaultRouter()
analysis_router.register(r'analysis', AnalysisViewSet, basename='document-analysis')

urlpatterns = [
    path('', include(router.urls)),
    # Path for triggering and retrieving analysis for a specific document
    path('documents/<uuid:document_id>/', include(analysis_router.urls)),
    # Path for semantic search
    path('search/semantic/', AnalysisViewSet.as_view({'get': 'semantic_search'}), name='semantic-search'),
]