'use client';

import { useState, useEffect } from 'react';
import { useAuthStore } from '@/stores/auth.store';
import { Button } from '@/shared/components/ui/button';

/**
 * Auth Status Demo Component
 * Shows current authentication state and provides quick actions
 */

export function AuthStatusDemo() {
  const { user, isAuthenticated, isLoading, logout } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Avoid hydration mismatch
  }

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-card border border-border rounded-lg p-4 shadow-lg max-w-sm">
      <div className="text-sm font-medium mb-2">Auth Status</div>
      
      {isLoading ? (
        <div className="text-sm text-muted-foreground">Loading...</div>
      ) : isAuthenticated && user ? (
        <div className="space-y-2">
          <div className="text-xs">
            <div><span className="text-green-500">✅</span> Authenticated</div>
            <div className="text-muted-foreground">Email: {user.email}</div>
            <div className="text-muted-foreground">Name: {user.name}</div>
          </div>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={handleLogout}
            className="w-full"
          >
            Logout
          </Button>
        </div>
      ) : (
        <div className="space-y-2">
          <div className="text-xs">
            <span className="text-red-500">❌</span> Not authenticated
          </div>
          <div className="text-xs text-muted-foreground">
            Visit /login or /register
          </div>
        </div>
      )}
    </div>
  );
}
