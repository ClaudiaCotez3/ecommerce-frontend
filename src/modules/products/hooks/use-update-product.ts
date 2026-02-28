import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productsService } from '../services';
import type { UpdateProductRequest } from '../types';

/**
 * Hook to update a product
 * Invalidates products cache on success
 */
export function useUpdateProduct(shopId: number | null, productId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData: UpdateProductRequest) => {
      if (!shopId) {
        throw new Error('Shop ID is required');
      }
      return productsService.updateProduct(shopId, productId, productData);
    },
    onSuccess: () => {
      // Invalidate products queries for this shop
      queryClient.invalidateQueries({
        queryKey: ['products', 'shop', shopId],
      });
    },
    onError: (error) => {
      console.error('❌ Update product error:', error);
    },
  });
}
