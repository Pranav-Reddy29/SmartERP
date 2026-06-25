import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthState {
  token: string | null;
  user: User | null;

  login: (token: string, user: User) => void;
  logout: () => void;
  setUser: (user: User) => void;
  loadToken: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: null,
  user: null,

  login: (token, user) => {
    localStorage.setItem("token", token);

    set({
      token,
      user,
    });
  },

  logout: () => {
    localStorage.removeItem("token");

    set({
      token: null,
      user: null,
    });
  },

  setUser: (user) =>
    set({
      user,
    }),

  loadToken: () => {
    if (typeof window === "undefined") return;

    const token = localStorage.getItem("token");

    if (token) {
      set({
        token,
      });
    }
  },
}));