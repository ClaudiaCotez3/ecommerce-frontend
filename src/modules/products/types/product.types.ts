/**
 * Product Types
 * Based on backend domain model
 */

export type ProductStatus = 'active' | 'inactive';

export interface Product {
  id: number;
  shopId: number;
  name: string;
  description?: string | null;
  basePrice: number;
  status: ProductStatus;
  createdAt: string; // ISO string
}

export interface CreateProductRequest {
  name: string;
  description?: string;
  basePrice: number;
}

export interface UpdateProductRequest {
  name?: string;
  description?: string;
  basePrice?: number;
}

export interface ChangeProductStatusRequest {
  status: ProductStatus;
}

export interface ProductsListResponse {
  success: boolean;
  message: string;
  data: Product[];
  // Future: pagination
  // pagination?: {
  //   page: number;
  //   pageSize: number;
  //   total: number;
  // };
}

export interface ProductResponse {
  success: boolean;
  message: string;
  data: Product;
}
