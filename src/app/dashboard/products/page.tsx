'use client';

import { Button } from '@/shared/components/ui/button';
import { LoadingInline } from '@/shared/components/ui/loading-spinner';
import { handleApiError } from '@/shared/utils/handle-api-error';
import { useRequireActiveShop } from '@/modules/shops/hooks/use-require-active-shop';
import {
  useProductsByShop,
  CreateProductDialog,
  ProductsTable,
} from '@/modules/products';

/**
 * Products Management Page - FASE 6 IMPLEMENTADA
 * URL: /dashboard/products
 *
 * Features:
 * - Requires active shop selection
 * - CRUD operations for products
 * - Professional table with pagination
 * - Real-time status updates with optimistic UI
 */
export default function ProductsPage() {
  // Require active shop to be selected
  const { activeShop, isLoading: isShopLoading } = useRequireActiveShop();

  // Fetch products for the active shop
  const {
    data: products = [],
    isLoading: isProductsLoading,
    error: productsError,
  } = useProductsByShop(activeShop?.id || null);

  // Debug log
  console.log('🛍️ Products Page Debug:', {
    activeShopId: activeShop?.id,
    productsCount: products.length,
    products: products,
    isLoading: isProductsLoading,
    error: productsError,
  });

  // Handle shop loading
  if (isShopLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingInline message="Loading shop information..." />
      </div>
    );
  }

  // Handle no active shop (shouldn't happen with useRequireActiveShop)
  if (!activeShop) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">
          Please select a shop to manage products.
        </p>
      </div>
    );
  }

  // Handle products error
  if (productsError) {
    const error = handleApiError(productsError);
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-xl font-semibold mb-2">Failed to Load Products</h2>
        <p className="text-muted-foreground mb-4">{error.message}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    );
  }

  // Stats calculation
  const totalProducts = products.length;
  const activeProducts = products.filter((p) => p.status === 'active').length;
  const inactiveProducts = totalProducts - activeProducts;
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-muted-foreground">
            Manage your product catalog and variants
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            className="bg-muted text-muted-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-muted/80"
            onClick={() => console.log('Import clicked')}
          >
            Import
          </button>
          <CreateProductDialog shopId={activeShop.id} />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Products
              </p>
              <p className="text-2xl font-bold">{totalProducts}</p>
            </div>
            <div className="text-blue-600">🛍️</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active
              </p>
              <p className="text-2xl font-bold text-green-600">
                {activeProducts}
              </p>
            </div>
            <div className="text-green-600">✅</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Inactive
              </p>
              <p className="text-2xl font-bold text-orange-600">
                {inactiveProducts}
              </p>
            </div>
            <div className="text-orange-600">❌</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Categories
              </p>
              <p className="text-2xl font-bold">-</p>
            </div>
            <div className="text-purple-600">🏷️</div>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <ProductsTable
        products={products}
        shopId={activeShop.id}
        isLoading={isProductsLoading}
      />
    </div>
  );
}
