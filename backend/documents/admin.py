from django.contrib import admin
from .models import (
    Document, DocumentVersion, DocumentAnnotation, DocumentCrossReference,
    SemanticTopic, ArgumentComponent, ArgumentRelation, Citation,
    KnowledgeGraphNode, KnowledgeGraphEdge, DocumentAnalysisStatus
)


@admin.register(Document)
class DocumentAdmin(admin.ModelAdmin):
    list_display = ['title', 'created_by', 'ocr_status', 'created_at', 'is_public']
    list_filter = ['ocr_status', 'is_public', 'created_at', 'language']
    search_fields = ['title', 'description', 'extracted_text']
    readonly_fields = ['id', 'created_at', 'updated_at', 'checksum', 'file_size']


@admin.register(DocumentAnalysisStatus)
class DocumentAnalysisStatusAdmin(admin.ModelAdmin):
    list_display = ['document', 'analysis_type', 'status', 'started_at', 'completed_at']
    list_filter = ['analysis_type', 'status']


@admin.register(SemanticTopic)
class SemanticTopicAdmin(admin.ModelAdmin):
    list_display = ['document', 'relevance_score', 'created_at']
    list_filter = ['relevance_score', 'created_at']


admin.site.register(DocumentVersion)
admin.site.register(DocumentAnnotation)
admin.site.register(DocumentCrossReference)
admin.site.register(ArgumentComponent)
admin.site.register(ArgumentRelation)
admin.site.register(Citation)
admin.site.register(KnowledgeGraphNode)
admin.site.register(KnowledgeGraphEdge) 