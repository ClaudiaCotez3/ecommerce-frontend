import { QueryClient, QueryClientConfig } from '@tanstack/react-query';

/**
 * TanStack Query configuration
 *
 * Features:
 * - Optimized retry strategy
 * - Centralized error handling
 * - Performance optimizations
 * - Development-friendly settings
 */

// Query client configuration
const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      // Retry configuration
      retry: (failureCount, error: any) => {
        // Don't retry on 4xx errors (client errors)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // Retry up to 2 times for other errors
        return failureCount < 2;
      },

      // Cache configuration
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)

      // Refetch configuration
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      refetchOnReconnect: true,

      // Error handling
      throwOnError: false,
    },
    mutations: {
      // Retry mutations once
      retry: 1,

      // Error handling
      throwOnError: false,
    },
  },
};

// Create query client instance
export const queryClient = new QueryClient(queryClientConfig);

// Query keys factory for consistency
export const queryKeys = {
  // Authentication
  auth: ['auth'] as const,
  user: ['auth', 'user'] as const,

  // Shops
  shops: ['shops'] as const,
  shop: (id: string) => ['shops', id] as const,
  shopProducts: (shopId: string) => ['shops', shopId, 'products'] as const,

  // Products
  products: ['products'] as const,
  product: (id: string) => ['products', id] as const,
  productsByCategory: (categoryId: string) =>
    ['products', 'category', categoryId] as const,

  // Orders
  orders: ['orders'] as const,
  order: (id: string) => ['orders', id] as const,
  userOrders: (userId: string) => ['orders', 'user', userId] as const,

  // Inventory
  inventory: ['inventory'] as const,
  inventoryByShop: (shopId: string) => ['inventory', 'shop', shopId] as const,

  // Categories
  categories: ['categories'] as const,
  category: (id: string) => ['categories', id] as const,
};

// Development helpers
if (process.env.NODE_ENV === 'development') {
  // Enable React Query DevTools in development
  import('@tanstack/react-query-devtools').then(({ ReactQueryDevtools }) => {
    // DevTools will be available in development
  });
}
