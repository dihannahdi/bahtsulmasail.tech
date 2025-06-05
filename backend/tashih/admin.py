from django.contrib import admin
from .models import VerificationStatus, TaqrirKhass, TaqrirJamai, TaqrirJamaiReview


@admin.register(VerificationStatus)
class VerificationStatusAdmin(admin.ModelAdmin):
    list_display = ('name', 'order', 'is_final')
    list_filter = ('is_final',)
    search_fields = ('name', 'description')
    ordering = ('order',)


@admin.register(TaqrirKhass)
class TaqrirKhassAdmin(admin.ModelAdmin):
    list_display = ('title', 'document', 'created_by', 'reviewer', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('title', 'content', 'review_notes')
    raw_id_fields = ('document', 'created_by', 'reviewer', 'status')
    readonly_fields = ('created_at', 'updated_at')
    fieldsets = (
        (None, {
            'fields': ('id', 'title', 'document', 'content')
        }),
        ('Review Information', {
            'fields': ('status', 'reviewer', 'review_notes', 'review_date')
        }),
        ('Metadata', {
            'fields': ('created_by', 'created_at', 'updated_at', 'metadata')
        }),
    )


class TaqrirJamaiReviewInline(admin.TabularInline):
    model = TaqrirJamaiReview
    extra = 1
    raw_id_fields = ('reviewer',)


@admin.register(TaqrirJamai)
class TaqrirJamaiAdmin(admin.ModelAdmin):
    list_display = ('title', 'document', 'created_by', 'status', 'created_at')
    list_filter = ('status', 'created_at')
    search_fields = ('title', 'content')
    raw_id_fields = ('document', 'created_by', 'status')
    readonly_fields = ('created_at', 'updated_at')
    filter_horizontal = ('taqrir_khass',)
    inlines = [TaqrirJamaiReviewInline]
    fieldsets = (
        (None, {
            'fields': ('id', 'title', 'document', 'content')
        }),
        ('Related Taqrir Khass', {
            'fields': ('taqrir_khass',)
        }),
        ('Review Information', {
            'fields': ('status',)
        }),
        ('Metadata', {
            'fields': ('created_by', 'created_at', 'updated_at', 'metadata')
        }),
    )


@admin.register(TaqrirJamaiReview)
class TaqrirJamaiReviewAdmin(admin.ModelAdmin):
    list_display = ('taqrir_jamai', 'reviewer', 'review_date', 'is_approved')
    list_filter = ('is_approved', 'review_date')
    search_fields = ('review_notes', 'taqrir_jamai__title', 'reviewer__username')
    raw_id_fields = ('taqrir_jamai', 'reviewer')
    readonly_fields = ('review_date',)