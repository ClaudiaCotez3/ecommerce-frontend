/**
 * useRequireActiveShop Hook
 * Hook para requerir una shop activa válida
 */

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMyShops } from './use-my-shops';
import { useActiveShopStore } from '@/stores/active-shop.store';

interface UseRequireActiveShopOptions {
  redirectTo?: string;
  allowEmpty?: boolean;
}

export const useRequireActiveShop = (
  options: UseRequireActiveShopOptions = {}
) => {
  const { redirectTo = '/dashboard/shops', allowEmpty = false } = options;
  const router = useRouter();

  const { data: shops = [], isLoading } = useMyShops();
  const { activeShop, initializeActiveShop } = useActiveShopStore();

  useEffect(() => {
    // No hacer nada mientras carga
    if (isLoading) return;

    // Si no hay shops y no se permite vacío
    if (shops.length === 0 && !allowEmpty) {
      router.push(redirectTo as any);
      return;
    }

    // Inicializar shop activa si hay shops
    if (shops.length > 0) {
      initializeActiveShop(shops);
    }
  }, [shops, isLoading, allowEmpty, redirectTo, router, initializeActiveShop]);

  return {
    activeShop,
    shops,
    isLoading,
    hasShops: shops.length > 0,
    needsShop: shops.length === 0 && !allowEmpty,
  };
};
