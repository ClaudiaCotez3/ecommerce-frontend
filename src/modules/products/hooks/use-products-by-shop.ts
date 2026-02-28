import { useQuery } from '@tanstack/react-query';
import { productsService } from '../services';
import type { Product } from '../types';

/**
 * Hook to fetch products for a specific shop
 * Uses TanStack Query for caching and state management
 */
export function useProductsByShop(shopId: number | null) {
  return useQuery({
    queryKey: ['products', 'shop', shopId],
    queryFn: () => {
      if (!shopId) {
        throw new Error('Shop ID is required');
      }
      return productsService.getProductsByShop(shopId);
    },
    enabled: !!shopId, // Only run query if shopId exists
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: (failureCount, error) => {
      // Don't retry if it's a 403/404 error
      if (error && typeof error === 'object' && 'response' in error) {
        const status = (error as any).response?.status;
        if (status === 403 || status === 404) {
          return false;
        }
      }
      return failureCount < 3;
    },
  });
}
