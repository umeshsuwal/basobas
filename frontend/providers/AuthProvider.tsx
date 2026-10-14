"use client";

import { createContext, useContext, useState } from "react";
import type { AuthUser } from "@/types/auth";

interface AuthContextValue {
  user: AuthUser | null;
  login: (user: AuthUser, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function readStoredUser(): AuthUser | null {
  if (typeof window === "undefined") return null;

  const storedUser = window.localStorage.getItem("user");
  if (!storedUser) return null;

  try {
    return JSON.parse(storedUser) as AuthUser;
  } catch {
    window.localStorage.removeItem("user");
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(readStoredUser);

  function login(nextUser: AuthUser, token: string) {
    setUser(nextUser);
    window.localStorage.setItem("user", JSON.stringify(nextUser));
    window.localStorage.setItem("token", token);
  }

  function logout() {
    setUser(null);
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
