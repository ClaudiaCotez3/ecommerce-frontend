/**
 * useMyShops - TanStack Query hook
 * Hook para obtener las shops del usuario autenticado
 */

import { useQuery } from '@tanstack/react-query';
import { getMyShops } from '../services/shops.service';
import type { Shop } from '../types';

/**
 * Query keys para shops
 */
export const SHOPS_QUERY_KEYS = {
  all: ['shops'] as const,
  my: ['shops', 'my'] as const,
  byId: (id: number) => ['shops', id] as const,
} as const;

/**
 * Hook para obtener mis shops
 */
export const useMyShops = () => {
  return useQuery({
    queryKey: SHOPS_QUERY_KEYS.my,
    queryFn: getMyShops,
    staleTime: 1000 * 60 * 5, // 5 minutos
    retry: 3,
    refetchOnWindowFocus: false,
  });
};
