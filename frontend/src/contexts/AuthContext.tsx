import { createContext, useContext, useState, ReactNode } from 'react';
import { authApi } from '@/lib/api';

export interface User {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (firstName: string, lastName: string, email: string, password: string, phone: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem('user');
    return stored ? JSON.parse(stored) : null;
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem('token');
  });
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.login(email, password);
      
      const userData: User = {
        id: response.id,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        role: response.role,
      };
      
      setUser(userData);
      setToken(response.token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', response.token);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (firstName: string, lastName: string, email: string, password: string, phone: string) => {
    setIsLoading(true);
    try {
      const response = await authApi.register(firstName, lastName, email, password, phone);
      
      const userData: User = {
        id: response.id,
        email: response.email,
        firstName: response.firstName,
        lastName: response.lastName,
        role: response.role,
      };
      
      setUser(userData);
      setToken(response.token);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', response.token);
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        isLoading,
        login,
        register,
        logout,
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
