// Infrastructure Layer - Centralized exports
// This module provides access to all infrastructure components

// API Client
export { apiClient, createApiClient, getAuthToken, removeAuthToken } from './api/axios-client';
export type { AxiosRequestConfig, AxiosResponse, ApiResponse, PaginatedResponse } from './api/axios-client';

// Query Client
export { queryClient, queryKeys } from './query/query-client';

// Re-export TanStack Query types for convenience
export type { 
  UseQueryResult, 
  UseMutationResult, 
  QueryKey,
  MutationFunction 
} from '@tanstack/react-query';
