import {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from 'axios';

/**
 * Centralized interceptors for Axios client
 *
 * Features:
 * - Automatic token injection
 * - 401 handling with logout
 * - Centralized error management
 * - Request/Response logging (dev mode)
 */

// Token management utilities
const getAuthToken = (): string | null => {
  if (typeof window === 'undefined') return null;

  // Try localStorage first, fallback to sessionStorage
  return (
    localStorage.getItem('access_token') ||
    sessionStorage.getItem('access_token') ||
    null
  );
};

const removeAuthToken = (): void => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
  sessionStorage.removeItem('access_token');
  sessionStorage.removeItem('refresh_token');
};

// Request interceptor
const requestInterceptor = (
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig => {
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

// Request error handler
const requestErrorHandler = (error: AxiosError): Promise<AxiosError> => {
  if (process.env.NODE_ENV === 'development') {
    console.error('❌ Request Error:', error);
  }
  return Promise.reject(error);
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

// Setup function to apply interceptors to Axios instance
export const setupInterceptors = (axiosInstance: AxiosInstance): void => {
  // Request interceptors
  axiosInstance.interceptors.request.use(
    requestInterceptor,
    requestErrorHandler
  );

  // Response interceptors
  axiosInstance.interceptors.response.use(
    responseInterceptor,
    responseErrorHandler
  );

  // TODO: Setup refresh token interceptor when needed
  // setupRefreshTokenInterceptor(axiosInstance);
};

// Export utilities for external use
export { getAuthToken, removeAuthToken };
