/**
 * Shops API Services
 * Servicios para comunicarse con el backend de shops
 */

import { apiClient } from '@/infrastructure/api/axios-client';
import type {
  Shop,
  CreateShopRequest,
  ShopsApiResponse,
  ShopApiResponse,
} from '../types';

/**
 * Obtiene todas las shops del usuario autenticado
 */
export const getMyShops = async (): Promise<Shop[]> => {
  const response = await apiClient.get<ShopsApiResponse>('/shops/my-shops');
  return response.data.data;
};

/**
 * Crea una nueva shop
 */
export const createShop = async (
  shopData: CreateShopRequest
): Promise<Shop> => {
  const response = await apiClient.post<ShopApiResponse>('/shops', shopData);
  return response.data.data;
};

/**
 * Obtiene una shop específica por ID
 */
export const getShopById = async (shopId: number): Promise<Shop> => {
  const response = await apiClient.get<ShopApiResponse>(`/shops/${shopId}`);
  return response.data.data;
};
