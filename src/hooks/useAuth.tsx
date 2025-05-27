'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import {
  findUserByEmail,
  validateCredentials,
  addUser as svcAddUser,
  changePassword as svcChangePassword,
  updateUser as svcUpdateUser,
  User,
} from '@/services/authService';

interface AuthContextValue {
  user: User | null;
  login: (email: string, pwd: string) => boolean;
  logout: () => void;
  signup: (data: Omit<User, 'id'>) => void;
  updateProfile: (updates: Partial<Omit<User, 'password'>>) => void;
  changePassword: (currentPwd: string, newPwd: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Optional: load from sessionStorage for persistence
    const stored = sessionStorage.getItem('auth_user');
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const login = (email: string, pwd: string) => {
    if (validateCredentials(email, pwd)) {
      const u = findUserByEmail(email)!;
      setUser(u);
      sessionStorage.setItem('auth_user', JSON.stringify(u));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('auth_user');
  };

  const signup = (data: Omit<User, 'id'>) => {
    svcAddUser(data);
    // Optionally auto-login:
    login(data.email, data.password);
  };

  const updateProfile = (updates: Partial<Omit<User, 'password'>>) => {
    if (!user) return;
    svcUpdateUser(user.id, updates);
    const refreshed = { ...user, ...updates };
    setUser(refreshed);
    sessionStorage.setItem('auth_user', JSON.stringify(refreshed));
  };

  const changePassword = (currentPwd: string, newPwd: string) => {
    if (!user) return false;
    if (!validateCredentials(user.email, currentPwd)) return false;
    svcChangePassword(user.id, newPwd);
    return true;
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, signup, updateProfile, changePassword }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be inside AuthProvider');
  return ctx;
}
