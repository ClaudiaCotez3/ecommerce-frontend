/**
 * Active Shop Store - Zustand
 * Maneja el estado de la shop actualmente seleccionada
 */

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Shop } from '@/modules/shops/types';

interface ActiveShopState {
  // Estado
  activeShopId: number | null;
  activeShop: Shop | null;

  // Acciones
  setActiveShop: (shop: Shop) => void;
  setActiveShopById: (shopId: number, shops: Shop[]) => void;
  clearActiveShop: () => void;
  initializeActiveShop: (shops: Shop[]) => void;
}

export const useActiveShopStore = create<ActiveShopState>()(
  persist(
    (set, get) => ({
      // Estado inicial
      activeShopId: null,
      activeShop: null,

      // Setear shop activa con objeto completo
      setActiveShop: (shop) => {
        set({
          activeShopId: shop.id,
          activeShop: shop,
        });
      },

      // Setear shop activa por ID (busca en la lista)
      setActiveShopById: (shopId, shops) => {
        const shop = shops.find((s) => s.id === shopId);
        if (shop) {
          set({
            activeShopId: shopId,
            activeShop: shop,
          });
        }
      },

      // Limpiar shop activa
      clearActiveShop: () => {
        set({
          activeShopId: null,
          activeShop: null,
        });
      },

      // Inicializar shop activa automáticamente
      initializeActiveShop: (shops) => {
        const currentActiveShopId = get().activeShopId;

        if (shops.length === 0) {
          // No hay shops, limpiar
          set({
            activeShopId: null,
            activeShop: null,
          });
          return;
        }

        // Si no hay shop activa o la actual no existe en la lista
        const currentShopExists = shops.some(
          (shop) => shop.id === currentActiveShopId
        );

        if (!currentActiveShopId || !currentShopExists) {
          // Setear la primera shop como activa
          const firstShop = shops[0];
          set({
            activeShopId: firstShop.id,
            activeShop: firstShop,
          });
        } else {
          // Actualizar el objeto completo de la shop activa
          const activeShop = shops.find(
            (shop) => shop.id === currentActiveShopId
          );
          if (activeShop) {
            set({
              activeShop,
            });
          }
        }
      },
    }),
    {
      name: 'active-shop-storage',
      storage: createJSONStorage(() => localStorage),
      // Solo persistir el ID, el objeto completo se recarga desde la API
      partialize: (state) => ({
        activeShopId: state.activeShopId,
      }),
    }
  )
);
