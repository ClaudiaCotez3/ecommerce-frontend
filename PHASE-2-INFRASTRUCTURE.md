# Phase 2 - Infrastructure & API Communication

## 🏗️ Architecture Overview

This phase implements professional API communication infrastructure for the multi-shop SaaS platform.

## 📦 Core Components

### 1. Axios Client (`src/infrastructure/api/`)

**axios-client.ts**
- Centralized HTTP client configuration
- Environment-based URL configuration
- Consistent headers and timeout settings
- Interceptors integration

**interceptors.ts**
- Automatic token injection
- 401 error handling with logout
- Request/Response logging (dev mode)
- Centralized error management

**refresh-token.ts**
- Prepared architecture for refresh tokens
- Request queuing during token refresh
- Automatic retry of failed requests
- Currently disabled (enable when backend supports)

### 2. TanStack Query (`src/infrastructure/query/`)

**query-client.ts**
- Optimized cache configuration
- Smart retry strategies
- Query key factory for consistency
- Development tools integration

### 3. Global State & Providers (`src/app/`)

**providers.tsx**
- QueryClientProvider wrapper
- Development tools (dev mode only)
- Ready for additional providers (auth, theme)

### 4. Error Handling (`src/shared/utils/`)

**handle-api-error.ts**
- Centralized error processing
- User-friendly error messages
- Axios error extraction
- Development logging

### 5. UI Components (`src/shared/components/ui/`)

**loading-spinner.tsx**
- Multiple loading components
- Configurable sizes and styling
- Accessibility support
- Screen and inline variants

## 🔧 Configuration

### Environment Variables

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
NEXT_PUBLIC_API_TIMEOUT=10000
NODE_ENV=development
```

### Query Keys Structure

```typescript
queryKeys = {
  auth: ['auth'],
  shops: ['shops'],
  products: ['products'],
  orders: ['orders'],
  // ... structured and consistent
}
```

## 🚀 Usage Examples

### API Client
```typescript
import { apiClient } from '@/infrastructure';

// Automatic token injection and error handling
const response = await apiClient.get('/shops');
```

### TanStack Query
```typescript
import { useQuery } from '@tanstack/react-query';
import { queryKeys } from '@/infrastructure';

const { data, isLoading, error } = useQuery({
  queryKey: queryKeys.shops,
  queryFn: () => apiClient.get('/shops')
});
```

### Error Handling
```typescript
import { handleApiError } from '@/shared/components';

try {
  await apiClient.post('/shops', data);
} catch (error) {
  const processedError = handleApiError(error);
  console.log(processedError.message);
}
```

## 🔒 Security Features

- Automatic JWT token injection
- Secure token storage (localStorage/sessionStorage)
- 401 handling with automatic logout
- Request/response logging (dev only)

## 🎯 Ready for Phase 3

The infrastructure is now ready for:
- Authentication modules
- Feature-specific API hooks
- Real-time data synchronization
- Advanced caching strategies

## 📋 Dependencies Added

```json
{
  "axios": "^1.6.0",
  "@tanstack/react-query": "^5.0.0",
  "@tanstack/react-query-devtools": "^5.0.0"
}
```

## 🧪 Development Tools

- React Query DevTools (development only)
- API request/response logging
- Error tracking and debugging
- Environment-based configuration
