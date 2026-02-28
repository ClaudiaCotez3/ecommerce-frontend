'use client';

import { useState } from 'react';
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
import { useCreateProduct } from '../hooks';
import { createProductSchema, type CreateProductFormData } from '../schemas';

interface CreateProductDialogProps {
  shopId: number;
  trigger?: React.ReactNode;
  onSuccess?: () => void;
}

/**
 * Dialog for creating a new product
 * Uses React Hook Form + Zod validation
 * TanStack Query mutation with auto cache invalidation
 */
export function CreateProductDialog({
  shopId,
  trigger,
  onSuccess,
}: CreateProductDialogProps) {
  const [open, setOpen] = useState(false);
  const createProductMutation = useCreateProduct(shopId);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<CreateProductFormData>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: '',
      description: '',
      basePrice: 0,
    },
  });

  const onSubmit = async (data: CreateProductFormData) => {
    try {
      await createProductMutation.mutateAsync({
        name: data.name,
        description: data.description || undefined,
        basePrice: data.basePrice,
      });

      // Success
      reset();
      setOpen(false);
      onSuccess?.();
    } catch (error) {
      console.error('❌ Create product error:', error);
      const processedError = handleApiError(error);
      setError('root', {
        message: processedError.message,
      });
    }
  };

  const handleOpenChange = (newOpen: boolean) => {
    console.log('🔍 Dialog state changing:', { from: open, to: newOpen });
    setOpen(newOpen);
    if (!newOpen) {
      reset();
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button onClick={() => console.log('🔍 Default trigger clicked')}>
            Add Product
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
          <DialogDescription>
            Add a new product to your catalog. You can edit details later.
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
              {isSubmitting ? 'Creating...' : 'Create Product'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
