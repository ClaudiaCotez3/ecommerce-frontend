/**
 * Create Shop Dialog Component
 * Modal para crear una nueva shop con React Hook Form + Zod
 */

'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateShop } from '../hooks/use-create-shop';
import { useActiveShopStore } from '@/stores/active-shop.store';
import { createShopSchema, type CreateShopFormData } from '../schemas/shop.schemas';
import { Button } from '@/shared/components/ui/button';

interface CreateShopDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export function CreateShopDialog({ isOpen, onClose, onSuccess }: CreateShopDialogProps) {
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { setActiveShop } = useActiveShopStore();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CreateShopFormData>({
    resolver: zodResolver(createShopSchema),
    defaultValues: {
      name: '',
      description: '',
      currency: 'USD',
    },
  });

  const createShopMutation = useCreateShop({
    onSuccess: (shop) => {
      // Setear la nueva shop como activa
      setActiveShop(shop);
      
      // Limpiar formulario y cerrar
      reset();
      setErrorMessage('');
      onSuccess?.();
    },
    onError: (error) => {
      setErrorMessage(error.message || 'Failed to create shop');
    },
  });

  const onSubmit = async (data: CreateShopFormData) => {
    setErrorMessage('');
    await createShopMutation.mutateAsync(data);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      reset();
      setErrorMessage('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50" 
        onClick={handleClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-background border border-border rounded-lg shadow-lg w-full max-w-md mx-4">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Create New Shop</h2>
            <button
              onClick={handleClose}
              disabled={isSubmitting}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded text-red-700 text-sm">
              {errorMessage}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {/* Shop Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">
                Shop Name *
              </label>
              <input
                {...register('name')}
                type="text"
                id="name"
                placeholder="My Awesome Shop"
                className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                {...register('description')}
                id="description"
                rows={3}
                placeholder="Describe your shop..."
                className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary resize-none"
                disabled={isSubmitting}
              />
              {errors.description && (
                <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            {/* Currency */}
            <div>
              <label htmlFor="currency" className="block text-sm font-medium mb-1">
                Currency *
              </label>
              <select
                {...register('currency')}
                id="currency"
                className="w-full px-3 py-2 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary"
                disabled={isSubmitting}
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="MXN">MXN - Mexican Peso</option>
                <option value="CAD">CAD - Canadian Dollar</option>
              </select>
              {errors.currency && (
                <p className="text-red-600 text-sm mt-1">{errors.currency.message}</p>
              )}
            </div>

            {/* Actions */}
            <div className="flex space-x-3 pt-2">
              <Button
                type="button"
                onClick={handleClose}
                disabled={isSubmitting}
                className="flex-1 bg-muted text-muted-foreground hover:bg-muted/80"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? 'Creating...' : 'Create Shop'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
