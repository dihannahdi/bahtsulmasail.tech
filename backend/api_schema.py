"""
OpenAPI 3.0 Schema Definition for BahtsulMasail.tech API

This file defines the comprehensive API specification for our platform.
Key endpoints covered:
- Authentication (JWT)
- Document management (upload, list, retrieve, OCR status)
"""

from drf_spectacular.openapi import AutoSchema
from drf_spectacular.utils import extend_schema, OpenApiParameter, OpenApiExample
from drf_spectacular.types import OpenApiTypes
from rest_framework import status

# Authentication Schema Extensions
auth_token_schema = extend_schema(
    operation_id='auth_token_create',
    summary='Obtain JWT Token',
    description='Authenticate user and return JWT access and refresh tokens',
    request={
        'application/json': {
            'type': 'object',
            'properties': {
                'username': {
                    'type': 'string',
                    'description': 'Username or email address'
                },
                'password': {
                    'type': 'string',
                    'description': 'User password'
                }
            },
            'required': ['username', 'password']
        }
    },
    responses={
        200: {
            'description': 'Authentication successful'
        },
        401: {
            'description': 'Invalid credentials'
        }
    }
)

# Document Upload Schema
document_upload_schema = extend_schema(
    operation_id='document_upload',
    summary='Upload Document',
    description='Upload a PDF/DOCX document for processing. File will be stored in GCS and OCR processing will be initiated.',
    request={
        'multipart/form-data': {
            'type': 'object',
            'properties': {
                'file': {
                    'type': 'string',
                    'format': 'binary',
                    'description': 'Document file (PDF, DOCX, JPG, PNG)'
                },
                'title': {
                    'type': 'string',
                    'maxLength': 255,
                    'description': 'Document title'
                },
                'description': {
                    'type': 'string',
                    'description': 'Optional document description'
                },
                'is_public': {
                    'type': 'boolean',
                    'default': False,
                    'description': 'Whether document should be publicly accessible'
                }
            },
            'required': ['file', 'title']
        }
    },
    responses={
        201: {
            'description': 'Document uploaded successfully',
            'content': {
                'application/json': {
                    'schema': {
                        'type': 'object',
                        'properties': {
                            'id': {'type': 'string', 'format': 'uuid'},
                            'title': {'type': 'string'},
                            'description': {'type': 'string'},
                            'file_url': {'type': 'string', 'nullable': True},
                            'file_size': {'type': 'integer'},
                            'mime_type': {'type': 'string'},
                            'created_by': {'type': 'string'},
                            'created_at': {'type': 'string', 'format': 'date-time'},
                            'updated_at': {'type': 'string', 'format': 'date-time'},
                            'is_public': {'type': 'boolean'},
                            'metadata': {'type': 'object'},
                            'ocr_status': {
                                'type': 'string',
                                'enum': ['pending', 'processing', 'completed', 'failed']
                            },
                            'ocr_result': {'type': 'object', 'nullable': True}
                        }
                    }
                }
            }
        },
        400: {
            'description': 'Invalid file or missing required fields'
        },
        401: {
            'description': 'Authentication required'
        },
        413: {
            'description': 'File too large (max 50MB)'
        }
    }
)

# Document List Schema
document_list_schema = extend_schema(
    operation_id='document_list',
    summary='List Documents',
    description='Retrieve paginated list of documents accessible to the authenticated user',
    parameters=[
        OpenApiParameter(
            name='page',
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            description='Page number for pagination'
        ),
        OpenApiParameter(
            name='page_size',
            type=OpenApiTypes.INT,
            location=OpenApiParameter.QUERY,
            description='Number of items per page (max 100)'
        ),
        OpenApiParameter(
            name='search',
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description='Search term for title and description'
        ),
        OpenApiParameter(
            name='ocr_status',
            type=OpenApiTypes.STR,
            location=OpenApiParameter.QUERY,
            description='Filter by OCR status',
            enum=['pending', 'processing', 'completed', 'failed']
        )
    ],
    responses={
        200: {
            'description': 'Documents retrieved successfully',
            'content': {
                'application/json': {
                    'schema': {
                        'type': 'object',
                        'properties': {
                            'count': {'type': 'integer'},
                            'next': {'type': 'string', 'nullable': True},
                            'previous': {'type': 'string', 'nullable': True},
                            'results': {
                                'type': 'array',
                                'items': {
                                    'type': 'object',
                                    'properties': {
                                        'id': {'type': 'string', 'format': 'uuid'},
                                        'title': {'type': 'string'},
                                        'description': {'type': 'string'},
                                        'file_url': {'type': 'string', 'nullable': True},
                                        'file_size': {'type': 'integer'},
                                        'mime_type': {'type': 'string'},
                                        'created_by': {'type': 'string'},
                                        'created_at': {'type': 'string', 'format': 'date-time'},
                                        'updated_at': {'type': 'string', 'format': 'date-time'},
                                        'is_public': {'type': 'boolean'},
                                        'metadata': {'type': 'object'},
                                        'ocr_status': {
                                            'type': 'string',
                                            'enum': ['pending', 'processing', 'completed', 'failed']
                                        },
                                        'ocr_result': {'type': 'object', 'nullable': True}
                                    }
                                }
                            }
                        }
                    }
                }
            }
        },
        401: {
            'description': 'Authentication required'
        }
    }
)

# Document Retrieve Schema
document_retrieve_schema = extend_schema(
    operation_id='document_retrieve',
    summary='Get Document Details',
    description='Retrieve detailed information about a specific document',
    responses={
        200: {
            'description': 'Document details retrieved successfully'
        },
        401: {
            'description': 'Authentication required'
        },
        403: {
            'description': 'Access denied - document not accessible to user'
        },
        404: {
            'description': 'Document not found'
        }
    }
)

# OCR Status Schema
ocr_status_schema = extend_schema(
    operation_id='document_ocr_status',
    summary='Get OCR Status',
    description='Retrieve OCR processing status and results for a document',
    responses={
        200: {
            'description': 'OCR status retrieved successfully',
            'content': {
                'application/json': {
                    'schema': {
                        'type': 'object',
                        'properties': {
                            'status': {
                                'type': 'string',
                                'enum': ['pending', 'processing', 'completed', 'failed']
                            },
                            'result': {
                                'type': 'object',
                                'nullable': True,
                                'properties': {
                                    'text': {'type': 'string'},
                                    'confidence': {'type': 'number'},
                                    'pages': {'type': 'integer'},
                                    'processed_at': {'type': 'string', 'format': 'date-time'}
                                }
                            }
                        }
                    }
                }
            }
        },
        401: {
            'description': 'Authentication required'
        },
        404: {
            'description': 'Document not found'
        }
    }
) 