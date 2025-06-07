from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_nested import routers
from . import views

# Create the main router
router = DefaultRouter()
router.register(r'verification-statuses', views.VerificationStatusViewSet)
router.register(r'taqrir-khass', views.TaqrirKhassViewSet, basename='taqrir-khass')
router.register(r'taqrir-jamai', views.TaqrirJamaiViewSet, basename='taqrir-jamai')
router.register(r'dashboard', views.TashihDashboardViewSet, basename='dashboard')

urlpatterns = [
    path('', include(router.urls)),
] 