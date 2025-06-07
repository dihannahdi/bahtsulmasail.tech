/**
 * React Query Hooks for Search Functionality
 * 
 * This file contains React Query hooks for search operations:
 * - useSearch: Search documents with both keyword and semantic search
 */

import { useQuery, useQueryClient, UseQueryOptions } from '@tanstack/react-query';
import { 
  searchDocuments, 
  SearchFilters, 
  SearchResponse 
} from '../services/documents';

// Re-export types for convenience
export type { SearchFilters, SearchResponse };

// Query Keys
export const searchKeys = {
  all: ['search'] as const,
  results: (filters: SearchFilters) => [...searchKeys.all, 'results', filters] as const,
};

/**
 * Hook to search documents with keyword or semantic search
 */
export const useSearch = (
  filters: SearchFilters,
  options?: Omit<UseQueryOptions<SearchResponse, Error>, 'queryKey' | 'queryFn'>
) => {
  return useQuery({
    queryKey: searchKeys.results(filters),
    queryFn: () => searchDocuments(filters),
    enabled: !!filters.q && filters.q.trim().length > 0, // Only search if query is not empty
    staleTime: 5 * 60 * 1000, // 5 minutes
    ...options,
  });
};

/**
 * Hook to invalidate search results (useful for manual refresh)
 */
export const useInvalidateSearch = () => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries({ queryKey: searchKeys.all });
  };
}; 