import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse, AxiosError, InternalAxiosRequestConfig } from 'axios';

/**
 * Centralized Axios client configuration
 * 
 * Features:
 * - Configurable base URL from environment
 * - Automatic timeout handling
 * - Consistent headers
 * - Built-in interceptors
 */

// Token management utilities
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;
  
  return localStorage.getItem('access_token') || 
         sessionStorage.getItem('access_token') || 
         null;
};

const removeAuthToken = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
};

// Request interceptor
const requestInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  // Inject authorization token
  const token = getAuthToken();
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Log request in development
  if (process.env.NODE_ENV === 'development') {
    console.log('🚀 API Request:', {
      method: config.method?.toUpperCase(),
      url: config.url,
      data: config.data,
    });
  }
  
  return config;
};

// Response interceptor
const responseInterceptor = (response: AxiosResponse): AxiosResponse => {
  // Log response in development
  if (process.env.NODE_ENV === 'development') {
    console.log('✅ API Response:', {
      status: response.status,
      url: response.config.url,
      data: response.data,
    });
  }
  
  return response;
};

// Response error handler
const responseErrorHandler = (error: AxiosError): Promise<AxiosError> => {
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Response Error:', error);
  }
  
  // Handle 401 Unauthorized
  if (error.response?.status === 401) {
    // Remove invalid tokens
    removeAuthToken();
    
    // Redirect to login (only in browser)
    if (typeof window !== 'undefined') {
      // Store current path for redirect after login
      const currentPath = window.location.pathname;
      if (currentPath !== '/login') {
        localStorage.setItem('redirect_path', currentPath);
      }
      
      // Redirect to login page
      window.location.href = '/login';
    }
  }
  
  return Promise.reject(error);
};

/**
 * Centralized Axios client configuration
 * 
 * Features:
 * - Configurable base URL from environment
 * - Automatic timeout handling
 * - Consistent headers
 * - Interceptors integration
 */

// Configuration interface
interface ApiClientConfig {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

// Default configuration
const defaultConfig: ApiClientConfig = {
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3001/api',
  timeout: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || '10000'),
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
};

// Create Axios instance
const createApiClient = (config: ApiClientConfig = {}): AxiosInstance => {
  const mergedConfig = { ...defaultConfig, ...config };
  
  const client = axios.create(mergedConfig);
  
  // Setup interceptors directly
  client.interceptors.request.use(
    requestInterceptor,
    (error: AxiosError) => {
      if (process.env.NODE_ENV === 'development') {
        console.error('❌ Request Error:', error);
      }
      return Promise.reject(error);
    }
  );
  
  client.interceptors.response.use(
    responseInterceptor,
    responseErrorHandler
  );
  
  return client;
};

// Main API client instance
export const apiClient = createApiClient();

// Export types for reusability
export type { AxiosRequestConfig, AxiosResponse };
export { createApiClient };

// Export auth utilities
export { getAuthToken, removeAuthToken };

// Utility type for API responses
export interface ApiResponse<T = any> {
  data: T;
  message: string;
  success: boolean;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}
