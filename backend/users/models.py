from django.contrib.auth.models import AbstractUser
from django.db import models
import uuid


class User(AbstractUser):
    """
    Custom user model with role-based permissions for BahtsulMasail.tech.
    Extends Django's AbstractUser to add fields for roles and permissions.
    """
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    
    # User roles
    ROLE_CHOICES = [
        ('admin', 'Administrator'),
        ('mushoheh', 'Mushoheh'),  # Reviewer/Verifier
        ('katib', 'Katib'),  # Writer
        ('reader', 'Reader'),  # Regular user
    ]
    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='reader')
    
    # Additional fields
    bio = models.TextField(blank=True)
    institution = models.CharField(max_length=255, blank=True)
    expertise = models.JSONField(default=list)  # List of expertise areas
    profile_image = models.CharField(max_length=1024, blank=True)  # Path in GCS
    
    # Tashih workflow permissions
    can_create_taqrir_khass = models.BooleanField(default=False)
    can_review_taqrir_khass = models.BooleanField(default=False)
    can_create_taqrir_jamai = models.BooleanField(default=False)
    can_review_taqrir_jamai = models.BooleanField(default=False)
    
    # Document permissions
    can_upload_documents = models.BooleanField(default=False)
    can_edit_documents = models.BooleanField(default=False)
    can_delete_documents = models.BooleanField(default=False)
    
    # Analysis permissions
    can_run_analysis = models.BooleanField(default=False)
    can_edit_analysis = models.BooleanField(default=False)
    
    class Meta:
        indexes = [
            models.Index(fields=['role']),
            models.Index(fields=['username']),
            models.Index(fields=['email']),
        ]
    
    def save(self, *args, **kwargs):
        """Override save to set permissions based on role."""
        # Set permissions based on role
        if self.role == 'admin':
            self.can_create_taqrir_khass = True
            self.can_review_taqrir_khass = True
            self.can_create_taqrir_jamai = True
            self.can_review_taqrir_jamai = True
            self.can_upload_documents = True
            self.can_edit_documents = True
            self.can_delete_documents = True
            self.can_run_analysis = True
            self.can_edit_analysis = True
        elif self.role == 'mushoheh':
            self.can_review_taqrir_khass = True
            self.can_review_taqrir_jamai = True
            self.can_upload_documents = True
            self.can_edit_documents = True
            self.can_run_analysis = True
        elif self.role == 'katib':
            self.can_create_taqrir_khass = True
            self.can_create_taqrir_jamai = True
            self.can_upload_documents = True
            self.can_edit_documents = True
            self.can_run_analysis = True
        
        super().save(*args, **kwargs)