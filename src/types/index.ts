// Global type definitions for the application

export interface User {
  id: string;
  email: string;
  role: string;
  permissions: string[];
}

export interface Shop {
  id: string;
  name: string;
  slug: string;
  ownerId: string;
}

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

// Common UI types
export type Variant =
  | 'default'
  | 'destructive'
  | 'outline'
  | 'secondary'
  | 'ghost'
  | 'link';
export type Size = 'default' | 'sm' | 'lg' | 'icon';

// Navigation types
export interface NavItem {
  title: string;
  href?: string;
  disabled?: boolean;
  external?: boolean;
  icon?: string;
  label?: string;
  description?: string;
}
