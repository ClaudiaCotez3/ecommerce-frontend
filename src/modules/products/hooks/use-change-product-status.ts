import { useMutation, useQueryClient } from '@tanstack/react-query';
import { productsService } from '../services';
import type { Product, ProductStatus } from '../types';

/**
 * Hook to change product status (active/inactive)
 * Includes optimistic updates for better UX
 */
export function useChangeProductStatus(
  shopId: number | null,
  productId: number
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (status: ProductStatus) => {
      if (!shopId) {
        throw new Error('Shop ID is required');
      }
      return productsService.changeProductStatus(shopId, productId, { status });
    },
    // Optimistic update
    onMutate: async (newStatus: ProductStatus) => {
      // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({
        queryKey: ['products', 'shop', shopId],
      });

      // Snapshot the previous value
      const previousProducts = queryClient.getQueryData<Product[]>([
        'products',
        'shop',
        shopId,
      ]);

      // Optimistically update to the new status
      if (previousProducts) {
        queryClient.setQueryData<Product[]>(
          ['products', 'shop', shopId],
          (old) =>
            old?.map((product) =>
              product.id === productId
                ? { ...product, status: newStatus }
                : product
            ) || []
        );
      }

      // Return a context object with the snapshotted value
      return { previousProducts };
    },
    onError: (err, newStatus, context) => {
      // If the mutation fails, use the context returned from onMutate to roll back
      if (context?.previousProducts) {
        queryClient.setQueryData(
          ['products', 'shop', shopId],
          context.previousProducts
        );
      }
      console.error('❌ Change product status error:', err);
    },
    onSettled: () => {
      // Always refetch after error or success to ensure we have the latest data
      queryClient.invalidateQueries({
        queryKey: ['products', 'shop', shopId],
      });
    },
  });
}
