'use client';

import { useState } from 'react';
import { useMyShops } from '@/modules/shops/hooks/use-my-shops';
import { useActiveShopStore } from '@/stores/active-shop.store';
import { CreateShopDialog } from '@/modules/shops/components/create-shop-dialog';

/**
 * Shops Management Page
 * URL: /dashboard/shops
 */
export default function ShopsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { data: shops = [], isLoading, error } = useMyShops();
  const { activeShop, setActiveShop } = useActiveShopStore();

  const handleSetActiveShop = (shop: any) => {
    setActiveShop(shop);
  };

  const handleCreateSuccess = () => {
    setIsCreateDialogOpen(false);
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Shops</h1>
            <p className="text-muted-foreground">
              Manage your shops and stores
            </p>
          </div>
        </div>
        <div className="animate-pulse space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-muted h-24 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">My Shops</h1>
            <p className="text-muted-foreground">
              Manage your shops and stores
            </p>
          </div>
        </div>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <p className="text-red-700">Error loading shops. Please try again.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">My Shops</h1>
          <p className="text-muted-foreground">Manage your shops and stores</p>
        </div>
        <button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90"
        >
          Create Shop
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Shops
              </p>
              <p className="text-2xl font-bold">{shops.length}</p>
            </div>
            <div className="text-blue-600">🏪</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Active Shop
              </p>
              <p className="text-lg font-medium">
                {activeShop?.name || 'None'}
              </p>
            </div>
            <div className="text-green-600">✅</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Status
              </p>
              <p className="text-lg font-medium">Active</p>
            </div>
            <div className="text-purple-600">🚀</div>
          </div>
        </div>
      </div>

      {/* Shops List */}
      {shops.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-12">
          <div className="text-center">
            <div className="text-6xl mb-4">🏪</div>
            <h2 className="text-xl font-semibold mb-2">No shops yet</h2>
            <p className="text-muted-foreground mb-6">
              Create your first shop to start selling online.
            </p>
            <button
              onClick={() => setIsCreateDialogOpen(true)}
              className="bg-primary text-primary-foreground px-6 py-3 rounded-md font-medium hover:bg-primary/90"
            >
              Create Your First Shop
            </button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Your Shops</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {shops.map((shop) => (
              <div
                key={shop.id}
                className={`bg-card border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${
                  activeShop?.id === shop.id
                    ? 'border-primary bg-primary/5'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => handleSetActiveShop(shop)}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">{shop.name}</h3>
                  {activeShop?.id === shop.id && (
                    <span className="text-primary text-sm font-medium">
                      Active
                    </span>
                  )}
                </div>

                {shop.description && (
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                    {shop.description}
                  </p>
                )}

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Currency: {shop.currency}</span>
                  <span>{shop.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <CreateShopDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}
