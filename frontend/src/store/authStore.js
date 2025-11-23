import { create } from "zustand";

export const useAuthStore = create((set) => ({
  isAuthenticated: false,
  role: null,

  login: (token, role) => {
    localStorage.setItem("token", token);
    set({ isAuthenticated: true, role });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ isAuthenticated: false, role: null  });
  }
}));
