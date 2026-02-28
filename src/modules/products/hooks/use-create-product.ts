import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productsService } from '../services';
import type { CreateProductRequest } from '../types';

/**
 * Hook to create a new product
 * Invalidates products cache on success
 */
export function useCreateProduct(shopId: number | null) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData: CreateProductRequest) => {
      if (!shopId) {
        throw new Error('Shop ID is required');
      }
      return productsService.createProduct(shopId, productData);
    },
    onSuccess: () => {
      // Invalidate products queries for this shop
      queryClient.invalidateQueries({
        queryKey: ['products', 'shop', shopId],
      });
    },
    onError: (error) => {
      console.error('❌ Create product error:', error);
    },
  });
}
