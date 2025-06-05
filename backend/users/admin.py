from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


class CustomUserAdmin(UserAdmin):
    """Custom admin for User model."""
    list_display = ('username', 'email', 'role', 'first_name', 'last_name', 'is_staff')
    list_filter = ('role', 'is_staff', 'is_superuser', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'bio', 'institution', 'expertise', 'profile_image')}),
        ('Roles and Permissions', {
            'fields': (
                'role',
                'can_create_taqrir_khass', 'can_review_taqrir_khass',
                'can_create_taqrir_jamai', 'can_review_taqrir_jamai',
                'can_upload_documents', 'can_edit_documents', 'can_delete_documents',
                'can_run_analysis', 'can_edit_analysis',
            ),
        }),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'role'),
        }),
    )
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('username',)


admin.site.register(User, CustomUserAdmin)