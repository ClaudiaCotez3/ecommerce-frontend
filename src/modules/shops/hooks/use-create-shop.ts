/**
 * useCreateShop - TanStack Query mutation hook
 * Hook para crear una nueva shop
 */

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createShop } from '../services/shops.service';
import { SHOPS_QUERY_KEYS } from './use-my-shops';
import type { CreateShopRequest, Shop } from '../types';
import { handleApiError } from '@/shared/utils/handle-api-error';

interface UseCreateShopOptions {
  onSuccess?: (shop: Shop) => void;
  onError?: (error: any) => void;
}

/**
 * Hook para crear una nueva shop
 */
export const useCreateShop = (options?: UseCreateShopOptions) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (shopData: CreateShopRequest) => createShop(shopData),

    onSuccess: (shop) => {
      // Invalidar la query de mis shops para refrescar la lista
      queryClient.invalidateQueries({
        queryKey: SHOPS_QUERY_KEYS.my,
      });

      // Callback personalizado
      options?.onSuccess?.(shop);
    },

    onError: (error) => {
      // Manejar error con utilidad centralizada
      const processedError = handleApiError(error);
      console.error('Error creating shop:', processedError);

      // Callback personalizado
      options?.onError?.(processedError);
    },
  });
};
