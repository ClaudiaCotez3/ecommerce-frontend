/**
 * Shop Validation Schemas
 * Esquemas de validación con Zod para shops
 */

import { z } from 'zod';

export const createShopSchema = z.object({
  name: z
    .string()
    .min(1, 'Shop name is required')
    .min(2, 'Shop name must be at least 2 characters')
    .max(50, 'Shop name must not exceed 50 characters'),

  description: z
    .string()
    .max(255, 'Description must not exceed 255 characters')
    .optional(),

  currency: z
    .string()
    .min(1, 'Currency is required')
    .length(3, 'Currency must be a 3-letter code (e.g., USD, EUR)')
    .toUpperCase(),
});

export type CreateShopFormData = z.infer<typeof createShopSchema>;
