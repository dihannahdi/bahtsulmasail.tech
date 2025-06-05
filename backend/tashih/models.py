from django.db import models
from django.contrib.auth import get_user_model
from documents.models import Document
import uuid

User = get_user_model()


class VerificationStatus(models.Model):
    """Model for tracking verification status in the Tashih workflow."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)
    is_final = models.BooleanField(default=False)
    
    class Meta:
        verbose_name_plural = "Verification Statuses"
        ordering = ['order']
    
    def __str__(self):
        return self.name


class TaqrirKhass(models.Model):
    """
    Model for individual reviews/reports (Taqrir Khass) in the Tashih workflow.
    A Taqrir Khass is created by a Katib and reviewed by a Mushoheh.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='taqrir_khass')
    title = models.CharField(max_length=255)
    content = models.TextField()
    created_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name='created_taqrir_khass')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.ForeignKey(VerificationStatus, on_delete=models.PROTECT)
    reviewer = models.ForeignKey(
        User, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True, 
        related_name='reviewed_taqrir_khass'
    )
    review_notes = models.TextField(blank=True)
    review_date = models.DateTimeField(null=True, blank=True)
    metadata = models.JSONField(default=dict)
    
    class Meta:
        verbose_name_plural = "Taqrir Khass"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['document']),
            models.Index(fields=['created_by']),
            models.Index(fields=['reviewer']),
            models.Index(fields=['status']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return self.title


class TaqrirJamai(models.Model):
    """
    Model for collective reviews/reports (Taqrir Jamai) in the Tashih workflow.
    A Taqrir Jamai is created based on multiple Taqrir Khass and is reviewed by multiple Mushoheh.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    document = models.ForeignKey(Document, on_delete=models.CASCADE, related_name='taqrir_jamai')
    title = models.CharField(max_length=255)
    content = models.TextField()
    taqrir_khass = models.ManyToManyField(TaqrirKhass, related_name='taqrir_jamai')
    created_by = models.ForeignKey(User, on_delete=models.PROTECT, related_name='created_taqrir_jamai')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.ForeignKey(VerificationStatus, on_delete=models.PROTECT)
    reviewers = models.ManyToManyField(User, related_name='reviewed_taqrir_jamai', through='TaqrirJamaiReview')
    metadata = models.JSONField(default=dict)
    
    class Meta:
        verbose_name_plural = "Taqrir Jamai"
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['document']),
            models.Index(fields=['created_by']),
            models.Index(fields=['status']),
            models.Index(fields=['created_at']),
        ]
    
    def __str__(self):
        return self.title


class TaqrirJamaiReview(models.Model):
    """Model for tracking reviews of Taqrir Jamai by multiple Mushoheh."""
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    taqrir_jamai = models.ForeignKey(TaqrirJamai, on_delete=models.CASCADE)
    reviewer = models.ForeignKey(User, on_delete=models.CASCADE)
    review_notes = models.TextField(blank=True)
    review_date = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField(default=False)
    
    class Meta:
        unique_together = ['taqrir_jamai', 'reviewer']
        indexes = [
            models.Index(fields=['taqrir_jamai', 'reviewer']),
            models.Index(fields=['review_date']),
            models.Index(fields=['is_approved']),
        ]
    
    def __str__(self):
        return f"Review by {self.reviewer.username} on {self.taqrir_jamai.title}"