'use client';

import { useAuthStore } from '@/stores/auth.store';
import { Button } from '@/shared/components/ui/button';

/**
 * Dashboard page
 *
 * Features:
 * - Protected route (requires authentication)
 * - User info display
 * - Logout functionality
 * - Welcome message
 */

export default function DashboardPage() {
  const { user, logout, isAuthenticated, isLoading } = useAuthStore();

  // Debug logging
  console.log('🔍 Dashboard Debug:', {
    user,
    isAuthenticated,
    isLoading,
  });

  const handleLogout = async () => {
    try {
      await logout();
      // Redirect will be handled by the auth guard
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Debug Info - remover después */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h3 className="font-medium text-yellow-800 mb-2">Debug Info:</h3>
        <pre className="text-xs text-yellow-700">
          {JSON.stringify({ user, isAuthenticated, isLoading }, null, 2)}
        </pre>
      </div>

      <div className="bg-card border border-border rounded-lg p-6">
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Welcome to Dashboard
        </h1>

        {user && (
          <div className="space-y-2 mb-6">
            <p className="text-muted-foreground">
              <span className="font-medium">Email:</span> {user.email}
            </p>
            <p className="text-muted-foreground">
              <span className="font-medium">Name:</span> {user.name}
            </p>
          </div>
        )}

        <div className="flex gap-4">
          <Button onClick={handleLogout} variant="outline">
            Logout
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Products</h2>
          <p className="text-muted-foreground">Manage your products</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Orders</h2>
          <p className="text-muted-foreground">View and manage orders</p>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <h2 className="text-lg font-semibold mb-2">Analytics</h2>
          <p className="text-muted-foreground">View sales analytics</p>
        </div>
      </div>
    </div>
  );
}
