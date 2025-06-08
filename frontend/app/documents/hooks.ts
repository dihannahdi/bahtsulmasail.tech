/**
 * React Query Hooks for Document Management
 * 
 * This file contains all the React Query hooks for document-related operations:
 * - useDocuments: Fetch documents with pagination and filtering
 * - useDocument: Fetch a single document
 * - useUploadDocument: Upload a document with progress tracking
 * - useOcrStatus: Get OCR status for a document
 * - useUpdateDocument: Update document metadata
 * - useDeleteDocument: Delete a document
 */

import { useQuery, useMutation, useQueryClient, UseQueryOptions, UseMutationOptions } from '@tanstack/react-query';
import { useState, useEffect, useRef } from 'react';
import { 
  getDocuments, 
  getDocument, 
  uploadDocument, 
  getOcrStatus, 
  updateDocument, 
  deleteDocument,
  Document, 
  DocumentListResponse, 
  DocumentUploadData, 
  OCRStatusResponse, 
  DocumentFilters 
} from '../services/documents';

// Re-export types for convenience
export type { Document, DocumentListResponse, DocumentUploadData, OCRStatusResponse, DocumentFilters };

// Query Keys
export const documentKeys = {
  all: ['documents'] as const,
  lists: () => [...documentKeys.all, 'list'] as const,
  list: (filters: DocumentFilters) => [...documentKeys.lists(), filters] as const,
  details: () => [...documentKeys.all, 'detail'] as const,
  detail: (id: string) => [...documentKeys.details(), id] as const,
  ocr: (id: string) => [...documentKeys.detail(id), 'ocr'] as const,
};

/**
 * Hook to fetch documents with pagination and filtering
 */
export const useDocuments = (
  filters: DocumentFilters = {},
  options?: Omit<UseQueryOptions<DocumentListResponse, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: documentKeys.list(filters),
    queryFn: () => getDocuments(filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: (query) => {
      // Auto-refetch every 5 seconds if any document is still processing
      const data = query.state.data;
      if (data && data.results) {
        const hasProcessingDocuments = data.results.some(
          (doc: Document) => doc.ocr_status === 'pending' || doc.ocr_status === 'processing'
        );
        if (hasProcessingDocuments) {
          return 5000; // Poll every 5 seconds
        }
      }
      return false; // No polling needed
    },
    ...options,
  });
};

/**
 * Hook to fetch a single document
 */
export const useDocument = (
  id: string,
  options?: Omit<UseQueryOptions<Document, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: documentKeys.detail(id),
    queryFn: () => getDocument(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000, // 10 minutes
    ...options,
  });
};

/**
 * Hook to upload a document with progress tracking
 */
export const useUploadDocument = (
  options?: UseMutationOptions<Document, Error, { data: DocumentUploadData; onProgress?: (progress: number) => void }>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ data, onProgress }) => uploadDocument(data, onProgress),
    onSuccess: (newDocument) => {
      // Invalidate and refetch documents list
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
      
      // Add the new document to the cache
      queryClient.setQueryData(documentKeys.detail(newDocument.id), newDocument);
    },
    onError: (error) => {
      console.error('Document upload failed:', error);
    },
    ...options,
  });
};

/**
 * Hook to get OCR status for a document
 */
export const useOcrStatus = (
  id: string,
  options?: Omit<UseQueryOptions<OCRStatusResponse, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: documentKeys.ocr(id),
    queryFn: () => getOcrStatus(id),
    enabled: !!id,
    refetchInterval: (query) => {
      // Auto-refetch every 5 seconds if OCR is still processing
      const data = query.state.data;
      if (data && (data.status === 'pending' || data.status === 'processing')) {
        return 5000;
      }
      return false;
    },
    staleTime: 0, // Always fetch fresh OCR status
    ...options,
  });
};

/**
 * Hook to update a document
 */
export const useUpdateDocument = (
  options?: UseMutationOptions<Document, Error, { id: string; data: Partial<Pick<Document, 'title' | 'description' | 'is_public'>> }>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }) => updateDocument(id, data),
    onSuccess: (updatedDocument) => {
      // Update the document in the cache
      queryClient.setQueryData(documentKeys.detail(updatedDocument.id), updatedDocument);
      
      // Invalidate documents list to reflect changes
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
    },
    onError: (error) => {
      console.error('Document update failed:', error);
    },
    ...options,
  });
};

/**
 * Hook to delete a document
 */
export const useDeleteDocument = (
  options?: UseMutationOptions<void, Error, string>
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteDocument(id),
    onSuccess: (_, deletedId) => {
      // Remove the document from the cache
      queryClient.removeQueries({ queryKey: documentKeys.detail(deletedId) });
      
      // Invalidate documents list to reflect changes
      queryClient.invalidateQueries({ queryKey: documentKeys.lists() });
    },
    onError: (error) => {
      console.error('Document deletion failed:', error);
    },
    ...options,
  });
};

/**
 * Hook to prefetch a document (useful for hover states, etc.)
 */
export const usePrefetchDocument = () => {
  const queryClient = useQueryClient();

  return (id: string) => {
    queryClient.prefetchQuery({
      queryKey: documentKeys.detail(id),
      queryFn: () => getDocument(id),
      staleTime: 10 * 60 * 1000, // 10 minutes
    });
  };
};

/**
 * Hook to invalidate all document queries (useful for manual refresh)
 */
export const useInvalidateDocuments = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: documentKeys.all });
  };
};

/**
 * Hook for animated counter effect
 */
export const useAnimatedCounter = (
  targetValue: number,
  duration: number = 2000
) => {
  const [currentValue, setCurrentValue] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const startAnimation = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentValue(0);
    
    const startTime = Date.now();
    const startValue = 0;
    const difference = targetValue - startValue;

    const updateCounter = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration * 1000, 1); // Convert duration to milliseconds
      
      // Easing function (ease-out)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      const newValue = Math.round(startValue + (difference * easedProgress));
      
      setCurrentValue(newValue);
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        setIsAnimating(false);
      }
    };

    requestAnimationFrame(updateCounter);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimating) {
            startAnimation();
          }
        });
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [targetValue, isAnimating]);

  return {
    ref,
    count: currentValue,
  };
};
