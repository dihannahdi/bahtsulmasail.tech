from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import get_object_or_404
from django.db import models, transaction
from django.db.models import Count, Q
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters

from .models import TaqrirKhass, TaqrirJamai, TaqrirJamaiReview, VerificationStatus
from .serializers import (
    TaqrirKhassSerializer, TaqrirKhassCreateSerializer, TaqrirKhassReviewSerializer,
    TaqrirJamaiSerializer, TaqrirJamaiCreateSerializer, TaqrirJamaiReviewSerializer,
    VerificationStatusSerializer, DocumentTashihSummarySerializer
)
from .permissions import (
    IsMushohehOrAdmin, CanReviewTaqrirKhass, CanReviewTaqrirJamai,
    CanCreateTaqrirKhass, CanCreateTaqrirJamai, IsOwnerOrReviewer
)
from documents.models import Document


class VerificationStatusViewSet(viewsets.ReadOnlyModelViewSet):
    """ViewSet for VerificationStatus model."""
    queryset = VerificationStatus.objects.all().order_by('order')
    serializer_class = VerificationStatusSerializer
    permission_classes = [IsAuthenticated]


class TaqrirKhassViewSet(viewsets.ModelViewSet):
    """ViewSet for TaqrirKhass model with role-based permissions."""
    serializer_class = TaqrirKhassSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['document', 'status', 'reviewer']
    search_fields = ['title', 'content']
    ordering_fields = ['created_at', 'updated_at', 'review_date']
    ordering = ['-created_at']

    def get_queryset(self):
        """Filter queryset based on user role and permissions."""
        user = self.request.user
        if user.role == 'admin':
            return TaqrirKhass.objects.all().select_related('document', 'created_by', 'reviewer', 'status')
        elif user.role == 'mushoheh':
            # Mushoheh can see all TaqrirKhass they can review
            return TaqrirKhass.objects.all().select_related('document', 'created_by', 'reviewer', 'status')
        else:
            # Other users can only see their own TaqrirKhass
            return TaqrirKhass.objects.filter(
                created_by=user
            ).select_related('document', 'created_by', 'reviewer', 'status')

    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action == 'create':
            return TaqrirKhassCreateSerializer
        elif self.action == 'review':
            return TaqrirKhassReviewSerializer
        return TaqrirKhassSerializer

    def get_permissions(self):
        """Return appropriate permissions based on action."""
        if self.action == 'create':
            permission_classes = [IsAuthenticated, CanCreateTaqrirKhass]
        elif self.action in ['review', 'update', 'partial_update']:
            permission_classes = [IsAuthenticated, CanReviewTaqrirKhass]
        else:
            permission_classes = [IsAuthenticated]
        
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        """Create TaqrirKhass with proper initial status."""
        # Get the default "pending" status
        pending_status = VerificationStatus.objects.filter(name__icontains='pending').first()
        if not pending_status:
            pending_status = VerificationStatus.objects.create(
                name='Pending Review',
                description='TaqrirKhass is pending review',
                order=1
            )
        
        serializer.save(
            created_by=self.request.user,
            status=pending_status
        )

    @action(detail=True, methods=['post'], url_path='review')
    def review(self, request, pk=None):
        """Submit review for a TaqrirKhass."""
        taqrir_khass = self.get_object()
        
        # Check if already reviewed
        if taqrir_khass.reviewer:
            return Response(
                {'error': 'This TaqrirKhass has already been reviewed.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = TaqrirKhassReviewSerializer(
            taqrir_khass, 
            data=request.data, 
            partial=True
        )
        
        if serializer.is_valid():
            serializer.save(
                reviewer=request.user,
                review_date=timezone.now()
            )
            
            # Check if this enables TaqrirJamai creation
            self._check_taqrir_jamai_eligibility(taqrir_khass.document)
            
            return Response(TaqrirKhassSerializer(taqrir_khass).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def _check_taqrir_jamai_eligibility(self, document):
        """Check if document has enough reviewed TaqrirKhass for TaqrirJamai creation."""
        approved_status = VerificationStatus.objects.filter(
            name__icontains='approved', is_final=True
        ).first()
        
        if approved_status:
            approved_count = TaqrirKhass.objects.filter(
                document=document,
                status=approved_status
            ).count()
            
            # If we have 2 or more approved TaqrirKhass, we can potentially create TaqrirJamai
            # This is just a check - actual creation still requires explicit action
            return approved_count >= 2
        
        return False

    @action(detail=False, methods=['get'], url_path='by-document/(?P<document_id>[^/.]+)')
    def by_document(self, request, document_id=None):
        """Get all TaqrirKhass for a specific document."""
        document = get_object_or_404(Document, id=document_id)
        
        # Apply the same filtering logic as get_queryset
        queryset = self.get_queryset().filter(document=document)
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class TaqrirJamaiViewSet(viewsets.ModelViewSet):
    """ViewSet for TaqrirJamai model with role-based permissions."""
    serializer_class = TaqrirJamaiSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['document', 'status']
    search_fields = ['title', 'content']
    ordering_fields = ['created_at', 'updated_at']
    ordering = ['-created_at']

    def get_queryset(self):
        """Filter queryset based on user role and permissions."""
        user = self.request.user
        if user.role == 'admin':
            return TaqrirJamai.objects.all().select_related('document', 'created_by', 'status').prefetch_related('taqrir_khass', 'reviewers')
        elif user.role == 'mushoheh':
            # Mushoheh can see all TaqrirJamai they can review
            return TaqrirJamai.objects.all().select_related('document', 'created_by', 'status').prefetch_related('taqrir_khass', 'reviewers')
        else:
            # Other users can only see their own TaqrirJamai
            return TaqrirJamai.objects.filter(
                created_by=user
            ).select_related('document', 'created_by', 'status').prefetch_related('taqrir_khass', 'reviewers')

    def get_serializer_class(self):
        """Return appropriate serializer based on action."""
        if self.action == 'create':
            return TaqrirJamaiCreateSerializer
        return TaqrirJamaiSerializer

    def get_permissions(self):
        """Return appropriate permissions based on action."""
        if self.action == 'create':
            permission_classes = [IsAuthenticated, CanCreateTaqrirJamai]
        elif self.action in ['review', 'update', 'partial_update']:
            permission_classes = [IsAuthenticated, CanReviewTaqrirJamai]
        else:
            permission_classes = [IsAuthenticated]
        
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        """Create TaqrirJamai with proper initial status."""
        # Get the default "pending" status
        pending_status = VerificationStatus.objects.filter(name__icontains='pending').first()
        if not pending_status:
            pending_status = VerificationStatus.objects.create(
                name='Pending Review',
                description='TaqrirJamai is pending review',
                order=1
            )
        
        serializer.save(
            created_by=self.request.user,
            status=pending_status
        )

    @action(detail=True, methods=['post'], url_path='review')
    def review(self, request, pk=None):
        """Submit review for a TaqrirJamai."""
        taqrir_jamai = self.get_object()
        
        # Check if user has already reviewed this TaqrirJamai
        existing_review = TaqrirJamaiReview.objects.filter(
            taqrir_jamai=taqrir_jamai,
            reviewer=request.user
        ).first()
        
        if existing_review:
            return Response(
                {'error': 'You have already reviewed this TaqrirJamai.'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer = TaqrirJamaiReviewSerializer(data=request.data)
        
        if serializer.is_valid():
            review = serializer.save(
                taqrir_jamai=taqrir_jamai,
                reviewer=request.user
            )
            
            # Check if we can finalize the document verification
            self._check_document_verification(taqrir_jamai, review)
            
            return Response(TaqrirJamaiReviewSerializer(review).data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def _check_document_verification(self, taqrir_jamai, latest_review):
        """Check if document can be marked as verified based on TaqrirJamai reviews."""
        total_reviews = TaqrirJamaiReview.objects.filter(taqrir_jamai=taqrir_jamai).count()
        approved_reviews = TaqrirJamaiReview.objects.filter(
            taqrir_jamai=taqrir_jamai, 
            is_approved=True
        ).count()
        
        # Require at least 2 reviews with majority approval
        if total_reviews >= 2 and approved_reviews > (total_reviews / 2):
            with transaction.atomic():
                # Update document verification status
                document = taqrir_jamai.document
                document.verification_status = 'verified'
                document.save()
                
                # Update TaqrirJamai status
                verified_status = VerificationStatus.objects.filter(
                    name__icontains='verified', is_final=True
                ).first()
                if verified_status:
                    taqrir_jamai.status = verified_status
                    taqrir_jamai.save()

    @action(detail=False, methods=['get'], url_path='by-document/(?P<document_id>[^/.]+)')
    def by_document(self, request, document_id=None):
        """Get all TaqrirJamai for a specific document."""
        document = get_object_or_404(Document, id=document_id)
        
        # Apply the same filtering logic as get_queryset
        queryset = self.get_queryset().filter(document=document)
        
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)


class TashihDashboardViewSet(viewsets.ViewSet):
    """ViewSet for Tashih workflow dashboard and summary views."""
    permission_classes = [IsAuthenticated, IsMushohehOrAdmin]

    @action(detail=False, methods=['get'], url_path='documents-awaiting-verification')
    def documents_awaiting_verification(self, request):
        """Get documents that are awaiting verification with their review summary."""
        documents = Document.objects.filter(
            verification_status='awaiting_verification'
        ).annotate(
            taqrir_khass_count=Count('taqrir_khass'),
            pending_reviews_count=Count(
                'taqrir_khass',
                filter=Q(taqrir_khass__reviewer__isnull=True)
            ),
            completed_reviews_count=Count(
                'taqrir_khass',
                filter=Q(taqrir_khass__reviewer__isnull=False)
            ),
            taqrir_jamai_count=Count('taqrir_jamai')
        ).order_by('-created_at')

        # Build the summary data
        summary_data = []
        for doc in documents:
            summary_data.append({
                'document_id': doc.id,
                'document_title': doc.title,
                'verification_status': doc.verification_status,
                'taqrir_khass_count': doc.taqrir_khass_count,
                'pending_reviews_count': doc.pending_reviews_count,
                'completed_reviews_count': doc.completed_reviews_count,
                'has_taqrir_jamai': doc.taqrir_jamai_count > 0,
                'taqrir_jamai_count': doc.taqrir_jamai_count,
                'created_at': doc.created_at,
                'updated_at': doc.updated_at,
            })

        serializer = DocumentTashihSummarySerializer(summary_data, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='my-review-queue')
    def my_review_queue(self, request):
        """Get the current user's review queue."""
        user = request.user
        
        # Get TaqrirKhass that need review
        pending_taqrir_khass = TaqrirKhass.objects.filter(
            reviewer__isnull=True
        ).exclude(created_by=user).select_related('document', 'created_by', 'status')
        
        # Get TaqrirJamai that need review (excluding those already reviewed by user)
        pending_taqrir_jamai = TaqrirJamai.objects.exclude(
            taqrirjamaireview__reviewer=user
        ).select_related('document', 'created_by', 'status').prefetch_related('taqrir_khass')
        
        return Response({
            'pending_taqrir_khass': TaqrirKhassSerializer(pending_taqrir_khass, many=True).data,
            'pending_taqrir_jamai': TaqrirJamaiSerializer(pending_taqrir_jamai, many=True).data
        })

    @action(detail=False, methods=['get'], url_path='statistics')
    def statistics(self, request):
        """Get Tashih workflow statistics."""
        stats = {
            'documents_awaiting_verification': Document.objects.filter(verification_status='awaiting_verification').count(),
            'documents_verified': Document.objects.filter(verification_status='verified').count(),
            'documents_rejected': Document.objects.filter(verification_status='rejected').count(),
            'total_taqrir_khass': TaqrirKhass.objects.count(),
            'pending_taqrir_khass_reviews': TaqrirKhass.objects.filter(reviewer__isnull=True).count(),
            'completed_taqrir_khass_reviews': TaqrirKhass.objects.filter(reviewer__isnull=False).count(),
            'total_taqrir_jamai': TaqrirJamai.objects.count(),
            'taqrir_jamai_needing_reviews': TaqrirJamai.objects.annotate(
                review_count=Count('taqrirjamaireview')
            ).filter(review_count__lt=2).count(),
        }
        
        return Response(stats) 