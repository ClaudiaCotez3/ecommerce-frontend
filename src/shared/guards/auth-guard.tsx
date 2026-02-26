'use client';

import { useEffect, ReactNode } from 'react';
import { useRouter, usePathname } from 'next/navigation';

import { useAuthStore } from '@/stores/auth.store';
import { LoadingScreen } from '@/shared/components/ui/loading-spinner';

/**
 * Authentication guard component
 * 
 * Features:
 * - Protects routes from unauthenticated access
 * - Automatic redirects
 * - Loading states
 * - Path preservation for post-login redirect
 */

interface AuthGuardProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AuthGuard({ children, fallback }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isLoading, initializeAuth } = useAuthStore();

  useEffect(() => {
    // Initialize auth on mount
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    // Redirect to login if not authenticated and not loading
    if (!isLoading && !isAuthenticated) {
      // Store current path for redirect after login
      if (pathname && pathname !== '/login') {
        localStorage.setItem('redirect_path', pathname);
      }
      
      router.replace('/login' as any);
    }
  }, [isAuthenticated, isLoading, router, pathname]);

  // Show loading while checking authentication
  if (isLoading) {
    return fallback || <LoadingScreen message="Checking authentication..." />;
  }

  // Don't render children if not authenticated
  if (!isAuthenticated) {
    return fallback || <LoadingScreen message="Redirecting to login..." />;
  }

  // Render protected content
  return <>{children}</>;
}

/**
 * Public route guard - redirects authenticated users
 * Used for login/register pages
 */
interface PublicGuardProps {
  children: ReactNode;
  redirectTo?: string;
}

export function PublicGuard({ children, redirectTo = '/dashboard' }: PublicGuardProps) {
  const router = useRouter();
  const { isAuthenticated, isLoading, initializeAuth } = useAuthStore();

  useEffect(() => {
    // Initialize auth on mount
    initializeAuth();
  }, [initializeAuth]);

  useEffect(() => {
    // Redirect authenticated users away from public pages
    if (!isLoading && isAuthenticated) {
      router.replace(redirectTo as any);
    }
  }, [isAuthenticated, isLoading, router, redirectTo]);

  // Show loading while checking authentication
  if (isLoading) {
    return <LoadingScreen message="Loading..." />;
  }

  // Don't render if authenticated (will redirect)
  if (isAuthenticated) {
    return <LoadingScreen message="Redirecting..." />;
  }

  // Render public content
  return <>{children}</>;
}
