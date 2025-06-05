from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from . import views

# Create the main router
router = DefaultRouter()
router.register(r'documents', views.DocumentViewSet, basename='document')

# Create nested routers for document-related resources
documents_router = routers.NestedDefaultRouter(router, r'documents', lookup='document')
documents_router.register(r'versions', views.DocumentVersionViewSet, basename='document-version')
documents_router.register(r'annotations', views.DocumentAnnotationViewSet, basename='document-annotation')
documents_router.register(r'cross-references', views.DocumentCrossReferenceViewSet, basename='document-cross-reference')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(documents_router.urls)),
    # Explicit upload endpoint for documentation
    path('documents/upload/', views.DocumentViewSet.as_view({'post': 'upload'}), name='document-upload'),
]