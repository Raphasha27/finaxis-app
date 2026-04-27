import { create } from "zustand";

interface AuthState {
  role: "ATTENDEE" | "ORGANIZER" | null;
  isAuthenticated: boolean;
  setRole: (role: "ATTENDEE" | "ORGANIZER" | null) => void;
  login: () => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  role: null,
  isAuthenticated: false,
  setRole: (role) => set({ role }),
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false, role: null }),
}));
