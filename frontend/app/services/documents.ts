/**
 * Document Service for BahtsulMasail.tech
 * 
 * This service handles all document-related API calls using the centralized API client.
 * It provides functions for:
 * - Fetching documents with pagination and filtering
 * - Uploading documents
 * - Getting OCR status
 * - Downloading documents
 */

import apiClient, { createFormData, uploadWithProgress } from '@/lib/api-client';
import { AxiosResponse } from 'axios';

// Type definitions
export interface Document {
  id: string;
  title: string;
  description?: string;
  file_url: string | null;
  file_size: number;
  mime_type: string;
  created_by: string;
  created_at: string;
  updated_at: string;
  is_public: boolean;
  metadata: any;
  ocr_status: 'pending' | 'processing' | 'completed' | 'failed';
  ocr_result: any;
}

export interface DocumentListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Document[];
}

export interface DocumentUploadData {
  file: File;
  title: string;
  description?: string;
  is_public?: boolean;
}

export interface OCRStatusResponse {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result: {
    text?: string;
    confidence?: number;
    pages?: number;
    processed_at?: string;
  } | null;
}

export interface DocumentFilters {
  page?: number;
  page_size?: number;
  search?: string;
  ocr_status?: string;
  ordering?: string;
}

export interface SearchResult extends Document {
  snippet?: string;
  search_rank?: number;
  similarity_score?: number;
}

export interface SearchResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: SearchResult[];
  search_type?: 'keyword' | 'semantic';
  query?: string;
}

export interface SearchFilters {
  q: string;
  type?: 'keyword' | 'semantic';
  page?: number;
  page_size?: number;
}

/**
 * Fetch documents with optional filtering and pagination
 */
export const getDocuments = async (filters: DocumentFilters = {}): Promise<DocumentListResponse> => {
  const params = new URLSearchParams();
  
  // Add filters to query parameters
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });

  const response: AxiosResponse<DocumentListResponse> = await apiClient.get(
    `/documents/?${params.toString()}`
  );
  
  return response.data;
};

/**
 * Upload a document with progress tracking
 */
export const uploadDocument = async (
  data: DocumentUploadData,
  onProgress?: (progress: number) => void
): Promise<Document> => {
  const formData = createFormData(data);
  
  const response: AxiosResponse<Document> = await uploadWithProgress(
    '/documents/upload/',
    formData,
    onProgress
  );
  
  return response.data;
};

/**
 * Get a specific document by ID
 */
export const getDocument = async (id: string): Promise<Document> => {
  const response: AxiosResponse<Document> = await apiClient.get(`/documents/${id}/`);
  return response.data;
};

/**
 * Get OCR status and results for a document
 */
export const getOcrStatus = async (id: string): Promise<OCRStatusResponse> => {
  const response: AxiosResponse<OCRStatusResponse> = await apiClient.get(
    `/documents/${id}/ocr_status/`
  );
  return response.data;
};

/**
 * Get download URL for a document
 */
export const getDownloadUrl = async (id: string): Promise<{ download_url: string }> => {
  const response: AxiosResponse<{ download_url: string }> = await apiClient.get(
    `/documents/${id}/download/`
  );
  return response.data;
};

/**
 * Update a document (partial update)
 */
export const updateDocument = async (
  id: string,
  data: Partial<Pick<Document, 'title' | 'description' | 'is_public'>>
): Promise<Document> => {
  const response: AxiosResponse<Document> = await apiClient.patch(`/documents/${id}/`, data);
  return response.data;
};

/**
 * Delete a document
 */
export const deleteDocument = async (id: string): Promise<void> => {
  await apiClient.delete(`/documents/${id}/`);
};

/**
 * Search documents using keyword or semantic search
 */
export const searchDocuments = async (filters: SearchFilters): Promise<SearchResponse> => {
  const params = new URLSearchParams();
  
  // Add search parameters
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      params.append(key, String(value));
    }
  });

  const response: AxiosResponse<SearchResponse> = await apiClient.get(
    `/documents/search/?${params.toString()}`
  );
  
  return response.data;
};

// Export all functions as default for backward compatibility
export default {
  getDocuments,
  uploadDocument,
  getDocument,
  getOcrStatus,
  getDownloadUrl,
  updateDocument,
  deleteDocument,
  searchDocuments,
};
