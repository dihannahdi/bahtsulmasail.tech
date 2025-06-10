from django.contrib import admin
from .models import (
    Document, DocumentVersion, DocumentAnnotation, DocumentCrossReference,
    DocumentAnalysisStatus, TextChunk
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


@admin.register(TextChunk)
class TextChunkAdmin(admin.ModelAdmin):
    list_display = ['source_document', 'kitab_name', 'author', 'chunk_index', 'created_at']
    list_filter = ['kitab_name', 'author', 'created_at']
    search_fields = ['content_arabic', 'kitab_name', 'author']
    readonly_fields = ['id', 'created_at', 'updated_at']


admin.site.register(DocumentVersion)
admin.site.register(DocumentAnnotation)
admin.site.register(DocumentCrossReference) 