from rest_framework import permissions


class IsMushohehOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow Mushoheh or Admin users to access Tashih workflow.
    """
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        return request.user.role in ['mushoheh', 'admin']


class CanReviewTaqrirKhass(permissions.BasePermission):
    """
    Custom permission to check if user can review TaqrirKhass.
    """
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        return (
            request.user.can_review_taqrir_khass or 
            request.user.role in ['mushoheh', 'admin']
        )


class CanReviewTaqrirJamai(permissions.BasePermission):
    """
    Custom permission to check if user can review TaqrirJamai.
    """
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        return (
            request.user.can_review_taqrir_jamai or 
            request.user.role in ['mushoheh', 'admin']
        )


class CanCreateTaqrirKhass(permissions.BasePermission):
    """
    Custom permission to check if user can create TaqrirKhass.
    """
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        return (
            request.user.can_create_taqrir_khass or 
            request.user.role in ['katib', 'admin']
        )


class CanCreateTaqrirJamai(permissions.BasePermission):
    """
    Custom permission to check if user can create TaqrirJamai.
    """
    
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        
        return (
            request.user.can_create_taqrir_jamai or 
            request.user.role in ['katib', 'admin']
        )


class IsOwnerOrReviewer(permissions.BasePermission):
    """
    Custom permission to allow access only to owners or reviewers of an object.
    """
    
    def has_object_permission(self, request, view, obj):
        # Allow access if user is the creator
        if hasattr(obj, 'created_by') and obj.created_by == request.user:
            return True
        
        # Allow access if user is the reviewer
        if hasattr(obj, 'reviewer') and obj.reviewer == request.user:
            return True
        
        # Allow access for admins
        if request.user.role == 'admin':
            return True
        
        return False 