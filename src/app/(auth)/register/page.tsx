'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { useAuthStore } from '@/stores/auth.store';
import {
  registerSchema,
  type RegisterFormData,
} from '@/shared/schemas/auth.schemas';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { handleApiError } from '@/shared/utils/handle-api-error';
import { LoadingInline } from '@/shared/components/ui/loading-spinner';

/**
 * Register page with professional form handling
 *
 * Features:
 * - React Hook Form with Zod validation
 * - Password confirmation
 * - Success state handling
 * - Error handling
 * - Loading states
 */

export default function RegisterPage() {
  const router = useRouter();
  const { register: registerUser, isAuthenticated, isLoading } = useAuthStore();
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace('/dashboard' as any);
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      setRegistrationSuccess(true);

      // Redirect to login after short delay
      setTimeout(() => {
        router.push('/login' as any);
      }, 2000);
    } catch (error) {
      const processedError = handleApiError(error);

      // Handle specific validation errors
      if (processedError.statusCode === 409) {
        setError('email', {
          message: 'An account with this email already exists',
        });
      } else {
        setError('root', {
          message: processedError.message,
        });
      }
    }
  };

  // Show loading while checking auth status
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingInline message="Checking authentication..." />
      </div>
    );
  }

  // Don't render register form if already authenticated
  if (isAuthenticated) {
    return null;
  }

  // Success state
  if (registrationSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="rounded-full bg-green-100 p-3 w-12 h-12 mx-auto flex items-center justify-center">
          <svg
            className="w-6 h-6 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-green-600">
          Registration Successful!
        </h2>
        <p className="text-muted-foreground">
          Your account has been created successfully.
          <br />
          Redirecting to login page...
        </p>
        <LoadingInline message="Redirecting..." size="sm" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Create your account</h2>
        <p className="text-muted-foreground">
          Sign up to get started with our platform
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="e.g., John Smith"
          error={errors.name?.message}
          {...register('name')}
        />

        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          error={errors.email?.message}
          {...register('email')}
        />

        <Input
          label="Password"
          type="password"
          placeholder="Create a password"
          error={errors.password?.message}
          {...register('password')}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm your password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />

        {errors.root && (
          <div className="rounded-md bg-destructive/10 p-3">
            <p className="text-sm text-destructive">{errors.root.message}</p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full"
          loading={isSubmitting}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating account...' : 'Create account'}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link
            href={'/login' as any}
            className="font-medium text-primary hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
