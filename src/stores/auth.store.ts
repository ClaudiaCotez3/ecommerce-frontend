import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import { apiClient } from '@/infrastructure';
import type {
  User,
  AuthState,
  LoginRequest,
  RegisterRequest,
  AuthResponse,
} from '@/types/auth';

/**
 * Authentication store using Zustand
 *
 * Features:
 * - User state management
 * - Token persistence
 * - Authentication methods
 * - Automatic token injection
 */

interface AuthStore extends AuthState {
  // Actions
  login: (credentials: LoginRequest) => Promise<void>;
  register: (userData: RegisterRequest) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  initializeAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      accessToken: null,
      isAuthenticated: false,
      isLoading: false,

      // Login method
      login: async (credentials: LoginRequest) => {
        try {
          set({ isLoading: true });

          // Debug: Log what we're sending
          console.log('🔍 Login payload:', credentials);

          const response = await apiClient.post<AuthResponse>(
            '/auth/login',
            credentials
          );
          const { user, accessToken } = response.data;

          console.log('✅ Login response:', {
            user,
            accessToken: accessToken ? '***' : null,
          });

          // Update store state
          set({
            user,
            accessToken,
            isAuthenticated: true,
            isLoading: false,
          });

          // Update axios default header for future requests
          if (apiClient.defaults.headers.common) {
            apiClient.defaults.headers.common['Authorization'] =
              `Bearer ${accessToken}`;
          }
        } catch (error) {
          console.error('❌ Login error:', error);
          if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as any;
            console.error('❌ Error response:', axiosError.response?.data);
            console.error('❌ Error status:', axiosError.response?.status);
          }
          set({
            isLoading: false,
            user: null,
            accessToken: null,
            isAuthenticated: false,
          });
          throw error; // Re-throw to handle in component
        }
      },

      // Register method
      register: async (userData: RegisterRequest) => {
        try {
          set({ isLoading: true });

          // Debug: Log what we're sending
          console.log('🔍 Register payload (frontend):', userData);

          // Transform frontend data to backend format
          const nameParts = userData.name.trim().split(' ');
          const firstName = nameParts[0] || '';
          const lastName = nameParts.slice(1).join(' ') || 'User'; // Fallback for lastName

          const backendPayload = {
            email: userData.email,
            password: userData.password,
            firstName: firstName,
            lastName: lastName,
          };

          console.log('🔍 Register payload (backend format):', backendPayload);

          const response = await apiClient.post(
            '/auth/register',
            backendPayload
          );

          console.log('✅ Register response:', response.data);

          set({ isLoading: false });

          // Note: After successful registration, user should login
          // Don't auto-authenticate after registration for security
        } catch (error) {
          console.error('❌ Register error:', error);
          if (error && typeof error === 'object' && 'response' in error) {
            const axiosError = error as any;
            console.error('❌ Error response:', axiosError.response?.data);
            console.error('❌ Error status:', axiosError.response?.status);
          }
          set({ isLoading: false });
          throw error; // Re-throw to handle in component
        }
      },

      // Logout method
      logout: () => {
        // Clear store state
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false,
          isLoading: false,
        });

        // Clear axios header
        if (apiClient.defaults.headers.common) {
          delete apiClient.defaults.headers.common['Authorization'];
        }

        // Clear localStorage/sessionStorage (handled by persist middleware)
        // Clear React Query cache
        if (typeof window !== 'undefined') {
          // Import and clear query client cache if needed
          // queryClient.clear();
        }
      },

      // Set user method (for updates)
      setUser: (user: User | null) => {
        set({ user });
      },

      // Set token method (for manual token management)
      setToken: (token: string | null) => {
        set({ accessToken: token });

        if (token && apiClient.defaults.headers.common) {
          apiClient.defaults.headers.common['Authorization'] =
            `Bearer ${token}`;
        } else if (apiClient.defaults.headers.common) {
          delete apiClient.defaults.headers.common['Authorization'];
        }
      },

      // Initialize authentication on app start
      initializeAuth: async () => {
        const { accessToken } = get();

        if (!accessToken) {
          return;
        }

        try {
          set({ isLoading: true });

          // Verify token by fetching user profile
          const response = await apiClient.get<{ user: User }>('/auth/me');
          const { user } = response.data;

          set({
            user,
            isAuthenticated: true,
            isLoading: false,
          });

          // Set axios header
          if (apiClient.defaults.headers.common) {
            apiClient.defaults.headers.common['Authorization'] =
              `Bearer ${accessToken}`;
          }
        } catch (error) {
          // Token is invalid, clear auth state
          set({
            user: null,
            accessToken: null,
            isAuthenticated: false,
            isLoading: false,
          });

          // Clear axios header
          if (apiClient.defaults.headers.common) {
            delete apiClient.defaults.headers.common['Authorization'];
          }
        }
      },
    }),
    {
      name: 'auth-storage', // Storage key
      storage: createJSONStorage(() => localStorage), // Use localStorage
      partialize: (state) => ({
        // Only persist these fields
        accessToken: state.accessToken,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        // Set isAuthenticated based on persisted data
        if (state?.accessToken && state?.user) {
          state.isAuthenticated = true;
        }
      },
    }
  )
);
