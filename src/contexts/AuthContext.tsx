import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { User, AuthState } from '@/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>(() => {
    const stored = localStorage.getItem('auth');
    if (stored) {
      try { return JSON.parse(stored); } catch { /* ignore */ }
    }
    return { user: null, token: null, isAuthenticated: false };
  });

  useEffect(() => {
    localStorage.setItem('auth', JSON.stringify(state));
  }, [state]);

  const login = useCallback(async (email: string, password: string) => {
    // Mock: check stored users
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const found = users.find((u: any) => u.email === email && u.password === password);
    if (!found) throw new Error('Invalid email or password');
    const user: User = { id: found.id, email: found.email, name: found.name };
    const token = `mock-jwt-${Date.now()}`;
    setState({ user, token, isAuthenticated: true });
  }, []);

  const register = useCallback(async (name: string, email: string, password: string) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u: any) => u.email === email)) throw new Error('Email already registered');
    const newUser = { id: crypto.randomUUID(), name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    const user: User = { id: newUser.id, email, name };
    const token = `mock-jwt-${Date.now()}`;
    setState({ user, token, isAuthenticated: true });
  }, []);

  const logout = useCallback(() => {
    setState({ user: null, token: null, isAuthenticated: false });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
