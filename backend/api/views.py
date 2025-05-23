from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Create your views here.

@api_view(['GET'])
def health_check(request):
    """
    A simple health check endpoint.
    """
    return Response({"status": "ok", "message": "API is healthy"}, status=status.HTTP_200_OK)
