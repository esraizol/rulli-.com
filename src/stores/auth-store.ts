import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, AuthState } from '@/types/user';

interface AuthStore extends AuthState {
  login: (user: User) => void;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateUser: (updates: Partial<User>) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: (user) => set({ user, isAuthenticated: true, isLoading: false, error: null }),
      logout: () => set({ user: null, isAuthenticated: false, isLoading: false, error: null }),
      setLoading: (isLoading) => set({ isLoading }),
      setError: (error) => set({ error, isLoading: false }),
      updateUser: (updates) => {
        const { user } = get();
        if (user) set({ user: { ...user, ...updates } });
      },
    }),
    {
      name: 'rullie-auth',
      // Intentionally persist nothing: `user` carries real PII (email,
      // phone, avatar) and should never sit in plaintext localStorage.
      // Once a real backend exists, session state belongs in an httpOnly
      // cookie, and this store should be re-hydrated by revalidating with
      // the server on load rather than trusting a cached client value.
      partialize: () => ({}),
    }
  )
);
