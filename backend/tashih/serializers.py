from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import TaqrirKhass, TaqrirJamai, TaqrirJamaiReview, VerificationStatus
from documents.models import Document

User = get_user_model()


class VerificationStatusSerializer(serializers.ModelSerializer):
    """Serializer for VerificationStatus model."""
    
    class Meta:
        model = VerificationStatus
        fields = ['id', 'name', 'description', 'order', 'is_final']
        read_only_fields = ['id']


class TaqrirKhassSerializer(serializers.ModelSerializer):
    """Serializer for TaqrirKhass model."""
    created_by = serializers.ReadOnlyField(source='created_by.username')
    reviewer = serializers.ReadOnlyField(source='reviewer.username')
    status_name = serializers.ReadOnlyField(source='status.name')
    document_title = serializers.ReadOnlyField(source='document.title')
    
    class Meta:
        model = TaqrirKhass
        fields = [
            'id', 'document', 'title', 'content', 'created_by', 'created_at',
            'updated_at', 'status', 'status_name', 'reviewer', 'review_notes',
            'review_date', 'metadata', 'document_title'
        ]
        read_only_fields = [
            'id', 'created_by', 'created_at', 'updated_at', 'reviewer',
            'review_date', 'status_name', 'document_title'
        ]


class TaqrirKhassCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating TaqrirKhass."""
    
    class Meta:
        model = TaqrirKhass
        fields = ['document', 'title', 'content', 'metadata']
        
    def validate_document(self, value):
        """Validate that the document is in awaiting_verification status."""
        if value.verification_status != 'awaiting_verification':
            raise serializers.ValidationError(
                "Can only create reviews for documents awaiting verification."
            )
        return value


class TaqrirKhassReviewSerializer(serializers.ModelSerializer):
    """Serializer for reviewing TaqrirKhass."""
    
    class Meta:
        model = TaqrirKhass
        fields = ['review_notes', 'status']
        
    def validate_status(self, value):
        """Validate that the status is appropriate for review."""
        if not value.is_final:
            raise serializers.ValidationError(
                "Review status must be a final status."
            )
        return value


class TaqrirJamaiReviewSerializer(serializers.ModelSerializer):
    """Serializer for TaqrirJamaiReview model."""
    reviewer = serializers.ReadOnlyField(source='reviewer.username')
    
    class Meta:
        model = TaqrirJamaiReview
        fields = [
            'id', 'taqrir_jamai', 'reviewer', 'review_notes',
            'review_date', 'is_approved'
        ]
        read_only_fields = ['id', 'reviewer', 'review_date']


class TaqrirJamaiSerializer(serializers.ModelSerializer):
    """Serializer for TaqrirJamai model."""
    created_by = serializers.ReadOnlyField(source='created_by.username')
    status_name = serializers.ReadOnlyField(source='status.name')
    document_title = serializers.ReadOnlyField(source='document.title')
    reviews = TaqrirJamaiReviewSerializer(many=True, read_only=True, source='taqrirjamaireview_set')
    taqrir_khass_count = serializers.SerializerMethodField()
    
    class Meta:
        model = TaqrirJamai
        fields = [
            'id', 'document', 'title', 'content', 'taqrir_khass',
            'created_by', 'created_at', 'updated_at', 'status', 'status_name',
            'metadata', 'document_title', 'reviews', 'taqrir_khass_count'
        ]
        read_only_fields = [
            'id', 'created_by', 'created_at', 'updated_at',
            'status_name', 'document_title', 'reviews', 'taqrir_khass_count'
        ]
    
    def get_taqrir_khass_count(self, obj):
        """Get the count of associated TaqrirKhass."""
        return obj.taqrir_khass.count()


class TaqrirJamaiCreateSerializer(serializers.ModelSerializer):
    """Serializer for creating TaqrirJamai."""
    
    class Meta:
        model = TaqrirJamai
        fields = ['document', 'title', 'content', 'taqrir_khass', 'metadata']
        
    def validate_document(self, value):
        """Validate that the document is in awaiting_verification status."""
        if value.verification_status != 'awaiting_verification':
            raise serializers.ValidationError(
                "Can only create collective reviews for documents awaiting verification."
            )
        return value
    
    def validate_taqrir_khass(self, value):
        """Validate that at least 2 TaqrirKhass are selected."""
        if len(value) < 2:
            raise serializers.ValidationError(
                "At least 2 individual reviews (TaqrirKhass) are required."
            )
        return value


class DocumentTashihSummarySerializer(serializers.Serializer):
    """Serializer for document Tashih workflow summary."""
    document_id = serializers.UUIDField()
    document_title = serializers.CharField()
    verification_status = serializers.CharField()
    taqrir_khass_count = serializers.IntegerField()
    pending_reviews_count = serializers.IntegerField()
    completed_reviews_count = serializers.IntegerField()
    has_taqrir_jamai = serializers.BooleanField()
    taqrir_jamai_count = serializers.IntegerField()
    created_at = serializers.DateTimeField()
    updated_at = serializers.DateTimeField() 