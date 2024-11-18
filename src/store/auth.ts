import { create } from 'zustand';
import { User } from 'firebase/auth';
import { auth } from '../config/firebase';

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: false,
  error: null,

  signUp: async (email: string, password: string) => {
    try {
      set({ error: null, loading: true });
      await auth.createUserWithEmailAndPassword(email, password);
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  signIn: async (email: string, password: string) => {
    try {
      set({ error: null, loading: true });
      await auth.signInWithEmailAndPassword(email, password);
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },

  signOut: async () => {
    try {
      set({ error: null, loading: true });
      await auth.signOut();
      set({ user: null });
    } catch (error: any) {
      set({ error: error.message });
    } finally {
      set({ loading: false });
    }
  },
}));

// Set up auth state listener
auth.onAuthStateChanged((user) => {
  useAuthStore.setState({ user, loading: false });
});