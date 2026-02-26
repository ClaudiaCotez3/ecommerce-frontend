'use client';

import { useAuthStore } from '@/stores/auth.store';

/**
 * Dashboard Overview Page
 *
 * Features:
 * - Protected route (requires authentication)
 * - User welcome message
 * - Quick stats overview
 * - Navigation to main sections
 */

export default function DashboardPage() {
  const { user, isLoading } = useAuthStore();

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
      {/* Welcome Section */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Welcome back{user?.name ? `, ${user.name}` : ''}! 👋
        </h1>
        <p className="text-muted-foreground">
          Here's an overview of your ecommerce business performance.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Products
              </p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="text-blue-600">📦</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Total Orders
              </p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="text-green-600">🛒</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Revenue
              </p>
              <p className="text-2xl font-bold">$0</p>
            </div>
            <div className="text-yellow-600">💰</div>
          </div>
        </div>

        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">
                Customers
              </p>
              <p className="text-2xl font-bold">0</p>
            </div>
            <div className="text-purple-600">👥</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold mb-2">Manage Products</h2>
          <p className="text-muted-foreground mb-4">
            Add, edit, and organize your product catalog.
          </p>
          <a
            href="/dashboard/products"
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            Go to Products →
          </a>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold mb-2">View Orders</h2>
          <p className="text-muted-foreground mb-4">
            Track and manage customer orders.
          </p>
          <a
            href="/dashboard/orders"
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            Go to Orders →
          </a>
        </div>

        <div className="bg-card border border-border rounded-lg p-6 hover:shadow-md transition-shadow">
          <h2 className="text-lg font-semibold mb-2">Settings</h2>
          <p className="text-muted-foreground mb-4">
            Configure your account and preferences.
          </p>
          <a
            href="/dashboard/settings"
            className="inline-flex items-center text-sm text-primary hover:underline"
          >
            Go to Settings →
          </a>
        </div>
      </div>

      {/* User Info (Debug - can be removed later) */}
      {process.env.NODE_ENV === 'development' && user && (
        <div className="bg-muted/50 border border-border rounded-lg p-4">
          <h3 className="font-medium text-sm mb-2">
            Debug Info (Development):
          </h3>
          <div className="text-xs text-muted-foreground">
            <p>
              <strong>ID:</strong> {user.id}
            </p>
            <p>
              <strong>Email:</strong> {user.email}
            </p>
            <p>
              <strong>Role:</strong> {user.role}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
