import axios from 'axios';

// Determine base URL based on environment
const API_BASE_URL = import.meta.env.PROD 
  ? '/api'  // In production, use relative path (same domain)
  : 'http://localhost:8080/api'; // In development, use explicit localhost

// Base API configuration
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Type definitions
export interface Category {
  title: string;
  description: string;
  count: number;
  color: string;
  slug: string;
}

export interface Document {
  id: number;
  title: string;
  extracted_text?: string;
  author?: string;
  uploaded_at?: string;
  created_at?: string;
  topics?: string;
  category?: string;
  processing_status?: string;
  source?: string;
  approval_status?: string;
  question?: string;
  answer?: string;
  dalil?: string;
  dalil_arabic?: string;
  mushoheh_verification?: string;
  is_bahtsul_masail?: boolean;
  judul_bahtsul_masail?: string;
  muqaddimah?: string;
  nash_masalah?: string;
  jawaban?: string;
  talil_jawab?: string;
  referensi?: string;
  hadirin?: string;
  panitia?: string;
  tanggal_tempat?: string;
}

// Tashih Al-Masa'il interfaces
export interface TaqrirJamai {
  id: number;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  organizer?: string;
  participants?: string;
  status: 'draft' | 'under_review' | 'approved' | 'published';
  created_by?: User;
  approved_by?: User;
  created_at?: string;
  updated_at?: string;
}

export interface TaqrirKhass {
  id: number;
  taqrir_jamai: number | TaqrirJamai;
  order: number;
  title: string;
  nash_masalah?: string;
  khalfiyyah?: string;
  munaqashah?: string;
  jawaban?: string;
  talil_jawab?: string;
  referensi?: string;
  status: 'draft' | 'under_review' | 'needs_revision' | 'approved';
  verification_notes?: string;
  created_by?: User;
  verified_by?: User;
  verified_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface MushohehVerification {
  id: number;
  taqrir_khass: number | TaqrirKhass;
  mushoheh: User;
  nash_masalah_verified: boolean;
  nash_masalah_notes?: string;
  khalfiyyah_verified: boolean;
  khalfiyyah_notes?: string;
  munaqashah_verified: boolean;
  munaqashah_notes?: string;
  jawaban_verified: boolean;
  jawaban_notes?: string;
  talil_jawab_verified: boolean;
  talil_jawab_notes?: string;
  referensi_verified: boolean;
  referensi_notes?: string;
  is_approved: boolean;
  overall_notes?: string;
  created_at?: string;
  updated_at?: string;
}

export interface ReferenceAnnotation {
  id: number;
  taqrir_khass: number | TaqrirKhass;
  text: string;
  reference_type: string;
  source: string;
  verification_status: 'unverified' | 'verified' | 'incorrect';
  verification_notes?: string;
  section: string;
  start_position?: number;
  end_position?: number;
  verified_by?: User;
  verified_at?: string;
  created_at?: string;
  updated_at?: string;
}

export interface User {
  id: number;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  role?: string;
  is_staff?: boolean;
}

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle authentication errors
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      // Clear token if it's invalid or expired
      localStorage.removeItem('auth_token');
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const login = async (username: string, password: string) => {
  try {
    const response = await api.post('auth/login/', { username, password });
    const { token } = response.data;
    localStorage.setItem('auth_token', token);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const logout = async () => {
  await api.post('auth/logout/');
  localStorage.removeItem('auth_token');
};

export const register = async (userData: { 
  username: string; 
  email: string; 
  password: string; 
  password_confirm: string;
  accept_terms: boolean;
  role?: string;
}) => {
  const response = await api.post('auth/register/', userData);
  return response.data;
};

export const verifyEmail = async (token: string) => {
  const response = await api.get(`auth/verify-email/${token}/`);
  return response.data;
};

export const resendVerificationEmail = async (email: string) => {
  const response = await api.post('auth/resend-verification-email/', { email });
  return response.data;
};

export const getCurrentUser = async () => {
  try {
    const response = await api.post('auth/token/verify/');
    return response.data;
  } catch (error) {
    // Check if the error has a response and handle accordingly
    if (error.response) {
      if (error.response.status === 404) {
        throw new Error('Authentication endpoint not found');
      } else if (error.response.status === 401 || error.response.status === 403) {
        throw new Error('Invalid or expired authentication token');
      }
    }
    throw error;
  }
};

// Category APIs
export const fetchCategories = async (): Promise<Category[]> => {
  try {
    const response = await api.get('categories/');
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return []; // Return empty array on error
  }
};

// Document APIs
export const fetchRecentDocuments = async (limit: number = 6): Promise<Document[]> => {
  try {
    const response = await api.get('documents/latest/', { params: { limit } });
    return Array.isArray(response.data) ? response.data : [];
  } catch (error) {
    console.error('Error fetching recent documents:', error);
    // Return empty array on error instead of throwing
    return []; 
  }
};

export const documentApi = {
  // Get all documents with optional filtering
  getDocuments: async (params?: { type?: string; topic?: string }) => {
    let endpoint = 'documents/';
    
    // Use specific endpoint for Bahtsul Masail documents
    if (params?.type === 'bahtsul_masail') {
      endpoint = 'documents/bahtsul_masail/';
      delete params.type; // Remove type from params as it's now in the endpoint
    }
    
    const response = await api.get(endpoint, { params });
    return response.data;
  },
  
  // Get featured documents
  getFeatured: async () => {
    const response = await api.get('documents/featured/');
    return response.data;
  },
  
  // Get latest documents
  getLatest: async () => {
    const response = await api.get('documents/latest/');
    return response.data;
  },
  
  // Get documents pending review (admin/mushoheh only)
  getPendingReview: async () => {
    const response = await api.get('documents/pending_review/');
    return response.data;
  },
  
  // Get a single document by ID
  getDocument: async (id: string | number) => {
    const response = await api.get(`documents/${id}/`);
    return response.data;
  },
  
  // Update a document
  updateDocument: async (id: string | number, data: any) => {
    const response = await api.patch(`documents/${id}/`, data);
    return response.data;
  },
  
  // Upload a new document
  uploadDocument: async (formData: FormData) => {
    const response = await api.post('documents/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  // Submit a document for review
  submitForReview: async (id: string | number, data?: { change_summary?: string }) => {
    const response = await api.post(`documents/${id}/submit_for_review/`, data);
    return response.data;
  },
  
  // Reprocess a document
  reprocessDocument: async (id: string | number) => {
    const response = await api.post(`documents/${id}/reprocess/`);
    return response.data;
  },
  
  // Analyze a document to extract structure and content
  analyzeDocument: async (id: string | number) => {
    const response = await api.post(`documents/${id}/analyze/`);
    return response.data;
  },
  
  // Document approval workflow
  approveDocument: async (id: string | number, data?: { comment?: string }) => {
    const response = await api.post(`documents/${id}/approve/`, data);
    return response.data;
  },
  
  publishDocument: async (id: string | number) => {
    const response = await api.post(`documents/${id}/publish/`);
    return response.data;
  },
  
  requestRevision: async (id: string | number, revision_notes: string) => {
    const response = await api.post(`documents/${id}/request_revision/`, { revision_notes });
    return response.data;
  },
  
  rejectDocument: async (id: string | number, rejection_reason: string) => {
    const response = await api.post(`documents/${id}/reject/`, { rejection_reason });
    return response.data;
  },
  
  // Document comments
  getComments: async (id: string | number) => {
    const response = await api.get(`documents/${id}/comments/`);
    return response.data;
  },
  
  addComment: async (id: string | number, text: string) => {
    const response = await api.post(`documents/${id}/add_comment/`, { text });
    return response.data;
  },
  
  // Document revisions
  getRevisions: async (id: string | number) => {
    const response = await api.get(`documents/${id}/revisions/`);
    return response.data;
  }
};

interface SemanticSearchParams {
  query: string;
  num_results: number;
  threshold: number;
  filters?: {
    dateRange?: [Date | null, Date | null];
    topics?: string[];
    minSimilarity?: number;
    documentTypes?: string[];
  };
}

interface SearchResult {
  id: number;
  title: string;
  author: string | null;
  similarity: number;
  matching_text: string;
  topics: string | null;
  upload_date: string;
  approval_status?: string;
  is_public?: boolean;
}

export const searchApi = {
  semanticSearch: async (
    query: string,
    numResults: number,
    threshold: number,
    filters?: SemanticSearchParams["filters"]
  ): Promise<SearchResult[]> => {
    // Get CSRF token from cookie
    const getCsrfToken = () => {
      const cookies = document.cookie.split(';');
      for (let cookie of cookies) {
        const [name, value] = cookie.trim().split('=');
        if (name === 'csrftoken') {
          return value;
        }
      }
      return '';
    };

    try {
      const response = await fetch('/api/search/semantic/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': getCsrfToken(),
        },
        credentials: 'include',
        body: JSON.stringify({
          query,
          num_results: numResults,
          threshold,
          filters,
        }),
      });

      if (!response.ok) {
        throw new Error(`Search failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Search error:', error);
      throw error;
    }
  },
};

// Admin dashboard API
export const adminApi = {
  getDashboardStats: async () => {
    const response = await api.get('admin_dashboard_stats/');
    return response.data;
  }
};

// Tashih Al-Masa'il API services
export const tashihApi = {
  // Taqrir Jama'i endpoints
  getTaqrirJamaiList: async () => {
    const response = await api.get('taqrir-jamai/');
    return response.data;
  },
  
  getTaqrirJamai: async (id: string | number) => {
    const response = await api.get(`taqrir-jamai/${id}/`);
    return response.data;
  },
  
  createTaqrirJamai: async (data: any) => {
    const response = await api.post('taqrir-jamai/', data);
    return response.data;
  },
  
  updateTaqrirJamai: async (id: string | number, data: any) => {
    const response = await api.patch(`taqrir-jamai/${id}/`, data);
    return response.data;
  },
  
  submitTaqrirJamaiForReview: async (id: string | number) => {
    const response = await api.post(`taqrir-jamai/${id}/submit_for_review/`);
    return response.data;
  },
  
  approveTaqrirJamai: async (id: string | number) => {
    const response = await api.post(`taqrir-jamai/${id}/approve/`);
    return response.data;
  },
  
  publishTaqrirJamai: async (id: string | number) => {
    const response = await api.post(`taqrir-jamai/${id}/publish/`);
    return response.data;
  },
  
  // Taqrir Khass endpoints
  getTaqrirKhassList: async (taqrirJamaiId?: string | number) => {
    const params = taqrirJamaiId ? { taqrir_jamai: taqrirJamaiId } : {};
    const response = await api.get('taqrir-khass/', { params });
    return response.data;
  },
  
  getTaqrirKhass: async (id: string | number) => {
    const response = await api.get(`taqrir-khass/${id}/`);
    return response.data;
  },
  
  createTaqrirKhass: async (data: any) => {
    const response = await api.post('taqrir-khass/', data);
    return response.data;
  },
  
  updateTaqrirKhass: async (id: string | number, data: any) => {
    const response = await api.patch(`taqrir-khass/${id}/`, data);
    return response.data;
  },
  
  submitTaqrirKhassForReview: async (id: string | number) => {
    const response = await api.post(`taqrir-khass/${id}/submit_for_review/`);
    return response.data;
  },
  
  verifyTaqrirKhass: async (id: string | number) => {
    const response = await api.post(`taqrir-khass/${id}/verify/`);
    return response.data;
  },
  
  requestTaqrirKhassRevision: async (id: string | number, notes: string) => {
    const response = await api.post(`taqrir-khass/${id}/request_revision/`, { verification_notes: notes });
    return response.data;
  },
  
  // New verification dashboard endpoints
  getPendingVerifications: async () => {
    const response = await api.get('taqrir-khass/pending_verification/');
    return response.data;
  },
  
  getCompletedVerifications: async () => {
    const response = await api.get('taqrir-khass/completed_verification/');
    return response.data;
  },
  
  getVerificationMetrics: async () => {
    const response = await api.get('mushoheh-verification/metrics/');
    return response.data;
  },
  
  // Mushoheh Verification endpoints
  getMushohehVerifications: async (taqrirKhassId?: string | number) => {
    const params = taqrirKhassId ? { taqrir_khass: taqrirKhassId } : {};
    const response = await api.get('mushoheh-verification/', { params });
    return response.data;
  },
  
  getMushohehVerification: async (id: string | number) => {
    const response = await api.get(`mushoheh-verification/${id}/`);
    return response.data;
  },
  
  createMushohehVerification: async (data: any) => {
    const response = await api.post('mushoheh-verification/', data);
    return response.data;
  },
  
  updateMushohehVerification: async (id: string | number, data: any) => {
    const response = await api.patch(`mushoheh-verification/${id}/`, data);
    return response.data;
  },
  
  completeMushohehVerification: async (id: string | number) => {
    const response = await api.post(`mushoheh-verification/${id}/complete/`);
    return response.data;
  },
  
  // Reference Annotation endpoints
  getReferenceAnnotations: async (taqrirKhassId?: string | number) => {
    const params = taqrirKhassId ? { taqrir_khass_id: taqrirKhassId } : {};
    const response = await api.get('reference-annotation/', { params });
    return response.data;
  },
  
  getReferenceAnnotation: async (id: string | number) => {
    const response = await api.get(`reference-annotation/${id}/`);
    return response.data;
  },
  
  createReferenceAnnotation: async (data: any) => {
    const response = await api.post('reference-annotation/', data);
    return response.data;
  },
  
  updateReferenceAnnotation: async (id: string | number, data: any) => {
    const response = await api.patch(`reference-annotation/${id}/`, data);
    return response.data;
  },
  
  verifyReferenceAnnotation: async (id: string | number, status: 'verified' | 'incorrect', notes?: string) => {
    const response = await api.post(`reference-annotation/${id}/verify/`, { 
      verification_status: status,
      verification_notes: notes || ''
    });
    return response.data;
  }
};

export default api;