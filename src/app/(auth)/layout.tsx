'use client';

import { ReactNode } from 'react';

import { PublicGuard } from '@/shared/guards';

/**
 * Authentication layout for login/register pages
 * 
 * Features:
 * - Public route protection (redirects authenticated users)
 * - Centered design for auth forms
 * - Clean, professional appearance
 */

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <PublicGuard>
      <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
        <div className="flex min-h-screen items-center justify-center p-4">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold text-foreground">
                ECommerce SaaS
              </h1>
              <p className="mt-2 text-sm text-muted-foreground">
                Multi-shop platform for modern businesses
              </p>
            </div>
            
            <div className="bg-card border border-border rounded-lg shadow-lg p-8">
              {children}
            </div>
            
            <div className="text-center text-xs text-muted-foreground">
              © 2026 ECommerce SaaS. Professional multi-shop platform.
            </div>
          </div>
        </div>
      </div>
    </PublicGuard>
  );
}
