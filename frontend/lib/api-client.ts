import axios, { AxiosInstance, AxiosResponse } from 'axios';

// Create axios instance with default configuration
const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 30000, // 30 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add authentication token
apiClient.interceptors.request.use(
  (config) => {
    // Get token from localStorage or session storage
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token') || sessionStorage.getItem('access_token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 unauthorized errors
    if (error.response?.status === 401) {
      // Clear tokens and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('access_token');
        sessionStorage.removeItem('access_token');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

/**
 * Create FormData from an object, handling nested objects and arrays
 */
export const createFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();

  const appendToFormData = (key: string, value: any) => {
    if (value === null || value === undefined) {
      return;
    }

    if (value instanceof File) {
      formData.append(key, value);
    } else if (value instanceof Date) {
      formData.append(key, value.toISOString());
    } else if (typeof value === 'object' && !(value instanceof Array)) {
      // Handle nested objects
      Object.keys(value).forEach(nestedKey => {
        appendToFormData(`${key}[${nestedKey}]`, value[nestedKey]);
      });
    } else if (value instanceof Array) {
      // Handle arrays
      value.forEach((item, index) => {
        appendToFormData(`${key}[${index}]`, item);
      });
    } else {
      formData.append(key, String(value));
    }
  };

  Object.keys(data).forEach(key => {
    appendToFormData(key, data[key]);
  });

  return formData;
};

/**
 * Upload with progress tracking
 */
export const uploadWithProgress = async (
  url: string,
  formData: FormData,
  onProgress?: (progress: number) => void
): Promise<AxiosResponse> => {
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