import { z } from 'zod';

/**
 * Product Validation Schemas
 * Used with React Hook Form
 */

export const createProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .max(150, 'Product name cannot exceed 150 characters')
    .trim(),
  description: z
    .string()
    .max(500, 'Description cannot exceed 500 characters')
    .optional()
    .or(z.literal('')),
  basePrice: z
    .number({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .positive('Price must be greater than 0')
    .max(999999.99, 'Price cannot exceed 999,999.99'),
});

export const updateProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .max(150, 'Product name cannot exceed 150 characters')
    .trim()
    .optional(),
  description: z
    .string()
    .max(500, 'Description cannot exceed 500 characters')
    .optional()
    .or(z.literal('')),
  basePrice: z
    .number({
      invalid_type_error: 'Price must be a number',
    })
    .positive('Price must be greater than 0')
    .max(999999.99, 'Price cannot exceed 999,999.99')
    .optional(),
});

export type CreateProductFormData = z.infer<typeof createProductSchema>;
export type UpdateProductFormData = z.infer<typeof updateProductSchema>;
