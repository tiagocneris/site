import { create } from 'zustand';
import { authService } from '../services/supabase/auth';
import { usersService } from '../services/supabase/users';
import type { Database } from '../types/database';

type User = Database['public']['Tables']['users']['Row'];

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: { name: string; role?: string }) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updatePassword: (newPassword: string) => Promise<void>;
  setUser: (user: User | null) => void;
  setError: (error: string | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  error: null,

  signIn: async (email, password) => {
    try {
      set({ loading: true, error: null });
      await authService.signIn(email, password);
      const user = await usersService.getCurrentUser();
      set({ user, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  signUp: async (email, password, userData) => {
    try {
      set({ loading: true, error: null });
      await authService.signUp(email, password, userData);
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ loading: true, error: null });
      await authService.signOut();
      set({ user: null, loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  resetPassword: async (email) => {
    try {
      set({ loading: true, error: null });
      await authService.resetPassword(email);
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  updatePassword: async (newPassword) => {
    try {
      set({ loading: true, error: null });
      await authService.updatePassword(newPassword);
      set({ loading: false });
    } catch (error) {
      set({ error: (error as Error).message, loading: false });
    }
  },

  setUser: (user) => set({ user }),
  setError: (error) => set({ error })
}));

// Initialize auth state
authService.onAuthStateChange(async (event, session) => {
  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    const user = await usersService.getCurrentUser();
    useAuthStore.getState().setUser(user);
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.getState().setUser(null);
  }
});