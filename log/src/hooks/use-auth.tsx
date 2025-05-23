"use client";

import { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { login as apiLogin, logout as apiLogout, register as apiRegister, getCurrentUser } from '@/lib/api';

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  register: (userData: { username: string; email: string; password: string; password_confirm: string; role?: string }) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      // Don't try to load user data if there's no token
      const token = localStorage.getItem('auth_token');
      if (!token) {
        setIsLoading(false);
        return;
      }
      
      try {
        const userData = await getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error('Error loading user:', error);
        // Clear the invalid token if authentication fails
        localStorage.removeItem('auth_token');
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      await apiLogin(username, password);
      const userData = await getCurrentUser();
      setUser(userData);
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: { 
    username: string; 
    email: string; 
    password: string; 
    password_confirm: string; 
    role?: string;
  }) => {
    setIsLoading(true);
    try {
      await apiRegister(userData);
      // Auto-login after registration
      await apiLogin(userData.username, userData.password);
      const newUserData = await getCurrentUser();
      setUser(newUserData);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    apiLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 