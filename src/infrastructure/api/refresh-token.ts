import { AxiosInstance, AxiosError, AxiosResponse } from 'axios';

/**
 * Refresh token management utilities
 *
 * Features:
 * - Token refresh logic (when backend supports it)
 * - Request queue management during refresh
 * - Automatic retry of failed requests
 * - Clean error handling
 *
 * Note: This is prepared architecture. Activate when backend supports refresh tokens.
 */

interface RefreshTokenConfig {
  enabled: boolean;
  refreshEndpoint: string;
  tokenStorageKey: string;
  refreshTokenKey: string;
}

// Configuration - modify based on backend implementation
const refreshConfig: RefreshTokenConfig = {
  enabled: false, // Set to true when backend supports refresh tokens
  refreshEndpoint: '/auth/refresh',
  tokenStorageKey: 'access_token',
  refreshTokenKey: 'refresh_token',
};

// Queue for requests that need to wait for token refresh
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
}> = [];

// Process queued requests after successful refresh
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });

  failedQueue = [];
};

// Get refresh token
const getRefreshToken = (): string | null => {
  if (typeof window === 'undefined') return null;

  return (
    localStorage.getItem(refreshConfig.refreshTokenKey) ||
    sessionStorage.getItem(refreshConfig.refreshTokenKey) ||
    null
  );
};

// Save new tokens
const saveTokens = (accessToken: string, refreshToken?: string): void => {
  if (typeof window === 'undefined') return;

  localStorage.setItem(refreshConfig.tokenStorageKey, accessToken);
  if (refreshToken) {
    localStorage.setItem(refreshConfig.refreshTokenKey, refreshToken);
  }
};

// Clear all tokens
const clearTokens = (): void => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem(refreshConfig.tokenStorageKey);
  localStorage.removeItem(refreshConfig.refreshTokenKey);
  sessionStorage.removeItem(refreshConfig.tokenStorageKey);
  sessionStorage.removeItem(refreshConfig.refreshTokenKey);
};

/**
 * Setup refresh token interceptor
 *
 * This function adds a response interceptor that handles 401 errors
 * by attempting to refresh the access token.
 */
export const setupRefreshTokenInterceptor = (
  axiosInstance: AxiosInstance
): void => {
  if (!refreshConfig.enabled) {
    if (process.env.NODE_ENV === 'development') {
      console.log(
        '🔧 Refresh token interceptor disabled. Enable in refresh-token.ts when backend is ready.'
      );
    }
    return;
  }

  axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as any;

      // Handle 401 errors with refresh token logic
      if (error.response?.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // Add request to queue
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              if (originalRequest.headers) {
                originalRequest.headers.Authorization = `Bearer ${token}`;
              }
              return axiosInstance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        const refreshToken = getRefreshToken();

        if (!refreshToken) {
          // No refresh token, redirect to login
          clearTokens();
          processQueue(error, null);

          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }

          return Promise.reject(error);
        }

        try {
          // Attempt to refresh token
          const response = await axiosInstance.post(
            refreshConfig.refreshEndpoint,
            {
              refresh_token: refreshToken,
            }
          );

          const { access_token, refresh_token: newRefreshToken } =
            response.data;

          // Save new tokens
          saveTokens(access_token, newRefreshToken);

          // Update default authorization header
          axiosInstance.defaults.headers.common['Authorization'] =
            `Bearer ${access_token}`;

          // Process queued requests
          processQueue(null, access_token);

          // Retry original request
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
          }

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // Refresh failed, clear tokens and redirect
          clearTokens();
          processQueue(refreshError, null);

          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }

          return Promise.reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};

// Export configuration for external modification
export { refreshConfig };

// Export utilities
export { getRefreshToken, saveTokens, clearTokens };
