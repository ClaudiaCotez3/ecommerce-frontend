/**
 * Shop Selector Component
 * Componente para seleccionar la shop activa en la navbar
 */

'use client';

import { useState, useEffect } from 'react';
import { useMyShops } from '../hooks/use-my-shops';
import { useActiveShopStore } from '@/stores/active-shop.store';
import { CreateShopDialog } from './create-shop-dialog';

interface ShopSelectorProps {
  className?: string;
}

export function ShopSelector({ className = '' }: ShopSelectorProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const { data: shops = [], isLoading, error } = useMyShops();
  const { activeShop, setActiveShopById, initializeActiveShop } =
    useActiveShopStore();

  // Inicializar shop activa cuando se cargan las shops
  useEffect(() => {
    if (shops.length > 0) {
      initializeActiveShop(shops);
    }
  }, [shops, initializeActiveShop]);

  const handleShopChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    if (value === 'create-new') {
      setIsCreateDialogOpen(true);
      return;
    }

    const shopId = parseInt(value);
    if (!isNaN(shopId)) {
      setActiveShopById(shopId, shops);
    }
  };

  const handleCreateSuccess = () => {
    setIsCreateDialogOpen(false);
    // La query se invalidará automáticamente y se recargará la lista
  };

  // Estado de loading
  if (isLoading) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <span className="text-sm text-muted-foreground">Shop:</span>
        <div className="animate-pulse bg-muted h-8 w-32 rounded"></div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <span className="text-sm text-red-600">Error loading shops</span>
      </div>
    );
  }

  // No hay shops
  if (shops.length === 0) {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <button
          onClick={() => setIsCreateDialogOpen(true)}
          className="text-sm bg-primary text-primary-foreground px-3 py-1 rounded hover:bg-primary/90"
        >
          Create your first shop
        </button>
        <CreateShopDialog
          isOpen={isCreateDialogOpen}
          onClose={() => setIsCreateDialogOpen(false)}
          onSuccess={handleCreateSuccess}
        />
      </div>
    );
  }

  // Selector normal
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <span className="text-sm text-muted-foreground">Shop:</span>
      <select
        value={activeShop?.id || ''}
        onChange={handleShopChange}
        className="text-sm bg-background border border-border rounded px-2 py-1 min-w-[140px] focus:outline-none focus:ring-2 focus:ring-primary"
      >
        {shops.map((shop) => (
          <option key={shop.id} value={shop.id}>
            {shop.name}
          </option>
        ))}
        <option value="create-new" className="border-t">
          + Create New Shop
        </option>
      </select>

      <CreateShopDialog
        isOpen={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
}
