from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from . import views

# Create the main router
router = DefaultRouter()
router.register(r'documents', views.DocumentViewSet, basename='document')
router.register(r'text-chunks', views.TextChunkViewSet, basename='textchunk')

# Create nested routers for document-related resources
documents_router = routers.NestedDefaultRouter(router, r'documents', lookup='document')
documents_router.register(r'versions', views.DocumentVersionViewSet, basename='document-version')
documents_router.register(r'annotations', views.DocumentAnnotationViewSet, basename='document-annotation')
documents_router.register(r'cross-references', views.DocumentCrossReferenceViewSet, basename='document-cross-reference')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(documents_router.urls)),
    path('', include('documents.json_urls')),  # JSON-based search endpoints
]