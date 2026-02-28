'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shared/components/ui/dialog';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { handleApiError } from '@/shared/utils/handle-api-error';
import { useUpdateProduct } from '../hooks';
import { updateProductSchema, type UpdateProductFormData } from '../schemas';
import type { Product } from '../types';

interface EditProductDialogProps {
  shopId: number;
  product: Product;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

/**
 * Dialog for editing an existing product
 * Pre-populates form with current product data
 */
export function EditProductDialog({
  shopId,
  product,
  trigger,
  onSuccess,
}: EditProductDialogProps) {
  const [open, setOpen] = useState(false);
  const updateProductMutation = useUpdateProduct(shopId, product.id);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
    setValue,
  } = useForm<UpdateProductFormData>({
    resolver: zodResolver(updateProductSchema),
  });

  // Pre-populate form when dialog opens
  useEffect(() => {
    if (open) {
      setValue('name', product.name);
      setValue('description', product.description || '');
      setValue('basePrice', product.basePrice);
    }
  }, [open, product, setValue]);

  const onSubmit = async (data: UpdateProductFormData) => {
    try {
      await updateProductMutation.mutateAsync({
        name: data.name,
        description: data.description || undefined,
        basePrice: data.basePrice,
      });

      // Success
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error('❌ Update product error:', error);
      const processedError = handleApiError(error);
      setError('root', {
        message: processedError.message,
      });
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" size="sm">
            Edit
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update product information. Changes will be saved immediately.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Product Name"
            placeholder="e.g. Premium T-Shirt"
            error={errors.name?.message}
            {...register('name')}
          />

          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Description (Optional)
            </label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Describe your product..."
              {...register('description')}
            />
            {errors.description && (
              <p className="text-sm text-destructive" role="alert">
                {errors.description.message}
              </p>
            )}
          </div>

          <Input
            label="Base Price"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            error={errors.basePrice?.message}
            {...register('basePrice', { valueAsNumber: true })}
          />

          {errors.root && (
            <div className="rounded-md bg-destructive/10 p-3">
              <p className="text-sm text-destructive">{errors.root.message}</p>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              loading={isSubmitting}
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
