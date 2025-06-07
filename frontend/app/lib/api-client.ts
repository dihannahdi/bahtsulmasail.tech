/**
 * Centralized API Client for BahtsulMasail.tech
 * 
 * This module provides a pre-configured axios instance with:
 * - Automatic JWT token attachment
 * - Global error handling
 * - Request/response interceptors
 * - Base URL configuration
 */

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { getSession, signOut } from 'next-auth/react';

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

// Create axios instance
const apiClient: AxiosInstance = axios.create({
  baseURL: `${API_BASE_URL}/api/v1`,
  timeout: 30000, // 30 seconds timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add JWT token
apiClient.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const session = await getSession();
      
      if (session?.accessToken) {
        config.headers.Authorization = `Bearer ${session.accessToken}`;
      }
      
      // Log request in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      }
      
      return config;
    } catch (error) {
      console.error('Error in request interceptor:', error);
      return config;
    }
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for global error handling
apiClient.interceptors.response.use(
  (response) => {
    // Log successful responses in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    }
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config;

    // Log errors in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`❌ API Error: ${error.response?.status} ${originalRequest?.url}`, error.response?.data);
    }

    // Handle 401 Unauthorized - token expired or invalid
    if (error.response?.status === 401) {
      console.warn('Authentication failed - redirecting to login');
      
      // Sign out user and redirect to login
      await signOut({ 
        callbackUrl: '/login',
        redirect: true 
      });
      
      return Promise.reject(new Error('Authentication required'));
    }

    // Handle 403 Forbidden
    if (error.response?.status === 403) {
      console.warn('Access forbidden');
      return Promise.reject(new Error('Access denied'));
    }

    // Handle 404 Not Found
    if (error.response?.status === 404) {
      return Promise.reject(new Error('Resource not found'));
    }

    // Handle 413 Payload Too Large
    if (error.response?.status === 413) {
      return Promise.reject(new Error('File too large'));
    }

    // Handle 500 Internal Server Error
    if (error.response?.status === 500) {
      return Promise.reject(new Error('Server error. Please try again later.'));
    }

    // Handle network errors
    if (!error.response) {
      return Promise.reject(new Error('Network error. Please check your connection.'));
    }

    // Return the original error for other status codes
    return Promise.reject(error);
  }
);

// Helper function to create form data for file uploads
export const createFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  
  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (value instanceof File) {
        formData.append(key, value);
      } else if (typeof value === 'boolean') {
        formData.append(key, value.toString());
      } else {
        formData.append(key, String(value));
      }
    }
  });
  
  return formData;
};

// Helper function for file uploads with progress tracking
export const uploadWithProgress = (
  url: string,
  formData: FormData,
  onProgress?: (progress: number) => void
) => {
  return apiClient.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    onUploadProgress: (progressEvent) => {
      if (onProgress && progressEvent.total) {
        const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        onProgress(progress);
      }
    },
  });
};

export default apiClient; 