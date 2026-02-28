'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';

import { useAuthStore } from '@/stores/auth.store';
import { loginSchema, type LoginFormData } from '@/shared/schemas/auth.schemas';
import { Button } from '@/shared/components/ui/button';
import { Input } from '@/shared/components/ui/input';
import { handleApiError } from '@/shared/utils/handle-api-error';
import { LoadingInline } from '@/shared/components/ui/loading-spinner';

/**
 * Login page with professional form handling
 *
 * Features:
 * - React Hook Form with Zod validation
 * - Integration with auth store
 * - Error handling
 * - Loading states
 * - Automatic redirects
 */

export default function LoginPage() {
  const router = useRouter();
  const { login, isAuthenticated, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // Redirect if already authenticated
  useEffect(() => {
    console.log('🔍 LoginPage: Auth state changed:', {
      isAuthenticated,
      isLoading,
    });

    if (isAuthenticated) {
      console.log(
        '✅ LoginPage: Already authenticated, redirecting to dashboard'
      );
      router.replace('/dashboard' as any);
    }
  }, [isAuthenticated, router]);

  const onSubmit = async (data: LoginFormData) => {
    try {
      console.log('🔍 LoginPage: Attempting login with:', data.email);
      console.log('🔍 LoginPage: Current localStorage before login:', {
        accessToken: localStorage.getItem('access_token'),
        authStorage: localStorage.getItem('auth-storage'),
      });

      await login(data);

      console.log('✅ LoginPage: Login successful, checking state...');
      console.log('🔍 LoginPage: Current localStorage after login:', {
        accessToken: localStorage.getItem('access_token'),
        authStorage: localStorage.getItem('auth-storage'),
      });
      console.log('🔍 LoginPage: Auth state after login:', { isAuthenticated });

      // Check for redirect path
      const redirectPath = localStorage.getItem('redirect_path');
      console.log('🔍 LoginPage: Redirect path:', redirectPath);

      if (redirectPath) {
        localStorage.removeItem('redirect_path');
        console.log('➡️ LoginPage: Redirecting to stored path:', redirectPath);
        router.replace(redirectPath as any);
      } else {
        console.log('➡️ LoginPage: Redirecting to dashboard');
        router.replace('/dashboard' as any);
      }
    } catch (error) {
      console.error('❌ LoginPage: Login failed:', error);
      const processedError = handleApiError(error);

      // Set form-level error
      setError('root', {
        message: processedError.message,
      });
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

  // Don't render login form if already authenticated
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center">
        <h2 className="text-2xl font-bold">Sign in to your account</h2>
        <p className="text-muted-foreground">
          Enter your credentials to access your dashboard
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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
          placeholder="Enter your password"
          error={errors.password?.message}
          {...register('password')}
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
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <div className="text-center">
        <p className="text-sm text-muted-foreground">
          Don't have an account?{' '}
          <Link
            href={'/register' as any}
            className="font-medium text-primary hover:underline"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
