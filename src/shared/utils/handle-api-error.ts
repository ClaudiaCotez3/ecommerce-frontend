import { AxiosError } from 'axios';

/**
 * Centralized API error handling utilities
 *
 * Features:
 * - Extract meaningful error messages
 * - Handle different error types
 * - Consistent error formatting
 * - Development logging
 */

// Standard error response structure
export interface ApiErrorResponse {
  message: string;
  statusCode?: number;
  error?: string;
  details?: any;
}

// Processed error for UI consumption
export interface ProcessedError {
  message: string;
  statusCode: number;
  type: 'network' | 'server' | 'client' | 'unknown';
  details?: any;
}

/**
 * Extract error message from various error formats
 */
export const extractErrorMessage = (error: unknown): string => {
  // Axios error
  if (error instanceof AxiosError) {
    // Server responded with error status
    if (error.response?.data) {
      const data = error.response.data as ApiErrorResponse;
      return data.message || data.error || 'Server error occurred';
    }

    // Network error
    if (error.request) {
      return 'Network error. Please check your connection.';
    }

    // Request setup error
    return error.message || 'Request configuration error';
  }

  // Standard Error object
  if (error instanceof Error) {
    return error.message;
  }

  // String error
  if (typeof error === 'string') {
    return error;
  }

  // Unknown error type
  return 'An unexpected error occurred';
};

/**
 * Process API error for consistent handling
 */
export const handleApiError = (error: unknown): ProcessedError => {
  const message = extractErrorMessage(error);

  // Axios error processing
  if (error instanceof AxiosError) {
    const statusCode = error.response?.status || 0;

    // Determine error type
    let type: ProcessedError['type'] = 'unknown';
    if (!error.response) {
      type = 'network';
    } else if (statusCode >= 400 && statusCode < 500) {
      type = 'client';
    } else if (statusCode >= 500) {
      type = 'server';
    }

    const processed: ProcessedError = {
      message,
      statusCode,
      type,
      details: error.response?.data,
    };

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('🚨 API Error:', {
        url: error.config?.url,
        method: error.config?.method,
        status: statusCode,
        message,
        details: error.response?.data,
      });
    }

    return processed;
  }

  // Generic error
  const processed: ProcessedError = {
    message,
    statusCode: 0,
    type: 'unknown',
  };

  if (process.env.NODE_ENV === 'development') {
    console.error('🚨 Unknown Error:', error);
  }

  return processed;
};

/**
 * Get user-friendly error message based on status code
 */
export const getUserFriendlyMessage = (statusCode: number): string => {
  switch (statusCode) {
    case 400:
      return 'Invalid request. Please check your input.';
    case 401:
      return 'Authentication required. Please log in.';
    case 403:
      return 'Access denied. You do not have permission.';
    case 404:
      return 'Resource not found.';
    case 409:
      return 'Conflict. The resource already exists.';
    case 422:
      return 'Validation error. Please check your input.';
    case 429:
      return 'Too many requests. Please try again later.';
    case 500:
      return 'Internal server error. Please try again.';
    case 502:
    case 503:
    case 504:
      return 'Service temporarily unavailable. Please try again.';
    default:
      return 'An error occurred. Please try again.';
  }
};

/**
 * Enhanced error handler with user-friendly messages
 */
export const handleApiErrorWithFallback = (error: unknown): ProcessedError => {
  const processed = handleApiError(error);

  // Use user-friendly message for known status codes
  if (processed.statusCode > 0) {
    const friendlyMessage = getUserFriendlyMessage(processed.statusCode);
    processed.message = friendlyMessage;
  }

  return processed;
};
