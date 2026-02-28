import { apiClient } from '@/infrastructure/api/axios-client';
import type {
  Product,
  CreateProductRequest,
  UpdateProductRequest,
  ChangeProductStatusRequest,
  ProductsListResponse,
  ProductResponse,
} from '../types';

/**
 * Products API Service
 * All product-related API calls
 * Routes based on backend ProductController
 */

export const productsService = {
  /**
   * GET /api/shops/:shopId/products
   * Get all products for a specific shop
   */
  getProductsByShop: async (shopId: number): Promise<Product[]> => {
    console.log('🔍 Fetching products for shop:', shopId);

    const response = await apiClient.get<ProductsListResponse>(
      `/shops/${shopId}/products`
    );

    console.log('📦 Products API Response:', response.data);

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to fetch products');
    }

    return response.data.data;
  },

  /**
   * POST /api/shops/:shopId/products
   * Create a new product
   */
  createProduct: async (
    shopId: number,
    productData: CreateProductRequest
  ): Promise<Product> => {
    const response = await apiClient.post<ProductResponse>(
      `/shops/${shopId}/products`,
      productData
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to create product');
    }

    return response.data.data;
  },

  /**
   * PATCH /api/shops/:shopId/products/:productId
   * Update product fields
   */
  updateProduct: async (
    shopId: number,
    productId: number,
    productData: UpdateProductRequest
  ): Promise<Product> => {
    const response = await apiClient.patch<ProductResponse>(
      `/shops/${shopId}/products/${productId}`,
      productData
    );

    if (!response.data.success) {
      throw new Error(response.data.message || 'Failed to update product');
    }

    return response.data.data;
  },

  /**
   * PATCH /api/shops/:shopId/products/:productId/status
   * Change product status (active/inactive)
   */
  changeProductStatus: async (
    shopId: number,
    productId: number,
    statusData: ChangeProductStatusRequest
  ): Promise<Product> => {
    const response = await apiClient.patch<ProductResponse>(
      `/shops/${shopId}/products/${productId}/status`,
      statusData
    );

    if (!response.data.success) {
      throw new Error(
        response.data.message || 'Failed to change product status'
      );
    }

    return response.data.data;
  },
};
