import { create } from 'zustand';

interface User {
  id: string;
  name: string;
  phone: string;
  email?: string;
  role: string;
  avatar?: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (token: string, user: User) => void;
  logout: () => void;
  updateUser: (user: Partial<User>) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('medvek_token'),
  user: JSON.parse(localStorage.getItem('medvek_user') || 'null'),
  isAuthenticated: !!localStorage.getItem('medvek_token'),

  setAuth: (token, user) => {
    localStorage.setItem('medvek_token', token);
    localStorage.setItem('medvek_user', JSON.stringify(user));
    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('medvek_token');
    localStorage.removeItem('medvek_user');
    set({ token: null, user: null, isAuthenticated: false });
  },

  updateUser: (data) => {
    set((state) => {
      const user = state.user ? { ...state.user, ...data } : null;
      if (user) localStorage.setItem('medvek_user', JSON.stringify(user));
      return { user };
    });
  },
}));
