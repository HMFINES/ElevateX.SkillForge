"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { api } from "@/lib/api";

const AuthContext = createContext(null);

const STORAGE_KEY = "skillforge-auth-token";
const LEGACY_STORAGE_KEY = "elevatex-auth-token";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken =
      typeof window !== "undefined"
        ? localStorage.getItem(STORAGE_KEY) || localStorage.getItem(LEGACY_STORAGE_KEY)
        : null;

    if (!storedToken) {
      setLoading(false);
      return;
    }

    api
      .getMe(storedToken)
      .then((response) => {
        setToken(storedToken);
        setUser(response.user);
      })
      .catch(() => {
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(LEGACY_STORAGE_KEY);
      })
      .finally(() => setLoading(false));
  }, []);

  const persistAuth = (response) => {
    localStorage.setItem(STORAGE_KEY, response.token);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    setToken(response.token);
    setUser(response.user);
    return response;
  };

  const signup = async (payload) => persistAuth(await api.signup(payload));
  const login = async (payload) => persistAuth(await api.login(payload));
  const signInWithGoogle = async (credential) =>
    persistAuth(await api.googleLogin(credential));

  const logout = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(LEGACY_STORAGE_KEY);
    setToken(null);
    setUser(null);
  };

  const refreshProfile = async () => {
    if (!token) return null;
    const response = await api.getMe(token);
    setUser(response.user);
    return response.user;
  };

  const updateProfile = async (payload) => {
    const response = await api.updateProfile(token, payload);
    setUser(response.user);
    return response.user;
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        isAuthenticated: Boolean(token && user),
        isAdmin: user?.role === "admin",
        signup,
        login,
        signInWithGoogle,
        logout,
        refreshProfile,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
