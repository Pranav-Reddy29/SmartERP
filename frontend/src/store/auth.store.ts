import { create } from "zustand";

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Company {
  id: string;
  companyName: string;
}

interface AuthState {
  token: string | null;

  user: User | null;

  company: Company | null;

  login: (
    token: string,
    user: User
  ) => void;

  logout: () => void;

  setUser: (
    user: User
  ) => void;

  setCompany: (
    company: Company | null
  ) => void;

  loadToken: () => void;
}

export const useAuthStore =
  create<AuthState>((set) => ({

    token: null,

    user: null,

    company: null,

    login: (token, user) => {

      localStorage.setItem(
        "token",
        token
      );

      set({
        token,
        user,
      });

    },

    logout: () => {

      localStorage.removeItem(
        "token"
      );

      set({

        token: null,

        user: null,

        company: null,

      });

    },

    setUser: (user) =>

      set({
        user,
      }),

    setCompany: (company) =>

      set({
        company,
      }),

    loadToken: () => {

      if (
        typeof window ===
        "undefined"
      )
        return;

      const token =
        localStorage.getItem(
          "token"
        );

      if (token) {

        set({
          token,
        });

      }

    },

  }));