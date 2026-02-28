/**
 * Shop Types
 * Definiciones TypeScript para el módulo de shops
 */

export interface Shop {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  currency: string;
  status: string;
  ownerId: string;
  createdAt: string;
}

export interface CreateShopRequest {
  name: string;
  description?: string;
  currency: string;
}

export interface ShopsApiResponse {
  success: boolean;
  message: string;
  data: Shop[];
  total: number;
}

export interface ShopApiResponse {
  success: boolean;
  message: string;
  data: Shop;
}

// Form data para React Hook Form
export interface CreateShopFormInput {
  name: string;
  description?: string;
  currency: string;
}

// Estado del shop selector
export interface ShopSelectorState {
  selectedShopId: number | null;
  isLoading: boolean;
  error: string | null;
}
