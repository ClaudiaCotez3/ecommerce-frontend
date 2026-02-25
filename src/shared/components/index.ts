// Shared Components - Centralized exports
// This module provides access to all reusable components

// UI Components
export { 
  LoadingSpinner, 
  LoadingScreen, 
  LoadingInline 
} from './ui/loading-spinner';

// Utilities
export { cn } from '../lib/utils';

// Error handling utilities
export { 
  handleApiError, 
  handleApiErrorWithFallback,
  extractErrorMessage,
  getUserFriendlyMessage 
} from '../utils/handle-api-error';

export type { 
  ProcessedError, 
  ApiErrorResponse 
} from '../utils/handle-api-error';
