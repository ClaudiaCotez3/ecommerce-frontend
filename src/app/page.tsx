'use client';

import { useQuery } from '@tanstack/react-query';

import { apiClient } from '@/infrastructure';
import { LoadingInline } from '@/shared/components/ui/loading-spinner';

// Example API call function
const fetchApiHealth = async () => {
  const response = await apiClient.get('/health');
  return response.data;
};

export default function HomePage() {
  // Example of using TanStack Query with the infrastructure
  const {
    data: healthData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['health'],
    queryFn: fetchApiHealth,
    retry: false, // Don't retry for demo purposes
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-foreground">
          ECommerce SaaS Platform
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Professional frontend architecture with complete API infrastructure
        </p>
        <div className="inline-flex items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow">
          ✅ Phase 2 Infrastructure Complete
        </div>
      </div>

      {/* API Connection Test */}
      <div className="mt-8 p-6 border border-border rounded-lg bg-card">
        <h3 className="text-lg font-semibold mb-4">API Connection Test</h3>
        {isLoading ? (
          <LoadingInline message="Testing API connection..." />
        ) : error ? (
          <div className="text-orange-600 text-sm">
            ⚠️ API not available (expected - backend not running)
            <br />
            <span className="text-muted-foreground">
              Error: {error instanceof Error ? error.message : 'Unknown error'}
            </span>
          </div>
        ) : healthData ? (
          <div className="text-green-600 text-sm">
            ✅ API Connected Successfully
          </div>
        ) : (
          <div className="text-muted-foreground text-sm">
            Ready to connect to backend
          </div>
        )}
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border border-border rounded-lg bg-card">
          <h3 className="font-semibold mb-2">✅ Axios Client</h3>
          <p className="text-sm text-muted-foreground">
            Centralized HTTP client with automatic token injection and error
            handling.
          </p>
        </div>
        <div className="p-6 border border-border rounded-lg bg-card">
          <h3 className="font-semibold mb-2">✅ TanStack Query</h3>
          <p className="text-sm text-muted-foreground">
            Professional data fetching with caching, retry logic, and dev tools.
          </p>
        </div>
        <div className="p-6 border border-border rounded-lg bg-card">
          <h3 className="font-semibold mb-2">✅ Error Handling</h3>
          <p className="text-sm text-muted-foreground">
            Centralized error processing with user-friendly messages.
          </p>
        </div>
      </div>
    </div>
  );
}
