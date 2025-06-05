from django.contrib import admin
from .models import Embedding, SemanticSearch


@admin.register(Embedding)
class EmbeddingAdmin(admin.ModelAdmin):
    list_display = ('id', 'content_type', 'object_id', 'embedding_type', 'created_at')
    list_filter = ('content_type', 'embedding_type', 'created_at')
    search_fields = ('object_id', 'embedding_type')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('id', 'content_type', 'object_id')
        }),
        ('Embedding Information', {
            'fields': ('embedding_type', 'embedding')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at', 'metadata')
        }),
    )


@admin.register(SemanticSearch)
class SemanticSearchAdmin(admin.ModelAdmin):
    list_display = ('name', 'similarity_threshold', 'max_results', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'description')
    readonly_fields = ('created_at', 'updated_at')
    filter_horizontal = ('content_types',)
    fieldsets = (
        (None, {
            'fields': ('name', 'description')
        }),
        ('Search Configuration', {
            'fields': ('content_types', 'embedding_types', 'similarity_threshold', 'max_results')
        }),
        ('Metadata', {
            'fields': ('created_at', 'updated_at')
        }),
    )