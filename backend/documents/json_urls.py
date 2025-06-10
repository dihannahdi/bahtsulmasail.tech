"""
URL patterns for JSON-based semantic search
"""

from django.urls import path
from .json_search_views import json_semantic_search, search_stats, health_check

urlpatterns = [
    path('json-search/', json_semantic_search, name='json_semantic_search'),
    path('search-stats/', search_stats, name='search_stats'),
    path('search-health/', health_check, name='search_health_check'),
] 