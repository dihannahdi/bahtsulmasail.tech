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

urlpatterns = [
    path('', include(router.urls)),
] 