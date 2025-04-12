
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from "../lib/toast";

// User type with expanded role information
type User = {
  id: string;
  name: string;
  username: string;
  email?: string;
  role?: 'admin' | 'superadmin' | 'assistant';
  campaign?: string;
};

// Auth context type
type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  hasPermission: (permission: string) => boolean;
};

// Expanded mock users for demo with proper role definitions
const MOCK_USERS: Record<string, { password: string, user: User }> = {
  'admin': {
    password: 'password123',
    user: { 
      id: '1', 
      name: 'Admin User', 
      username: 'admin', 
      role: 'admin', 
      email: 'admin@galloavion.com' 
    }
  },
  'maria': {
    password: 'password123',
    user: { 
      id: '2', 
      name: 'Maria Rodriguez', 
      username: 'maria', 
      role: 'assistant',
      campaign: 'Dennis'
    }
  },
  'juan': {
    password: 'password123',
    user: { 
      id: '3', 
      name: 'Juan Perez', 
      username: 'juan', 
      role: 'assistant',
      campaign: 'Michael'
    }
  },
  'm1keangelo@icloud.com': {
    password: '@rce5587!!',
    user: { 
      id: '0', 
      name: 'Super Admin', 
      username: 'm1keangelo', 
      role: 'superadmin', 
      email: 'm1keangelo@icloud.com',
    }
  }
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define permission levels
const PERMISSIONS = {
  VIEW_ADMIN_DASHBOARD: ['admin', 'superadmin'],
  MANAGE_USERS: ['superadmin'],
  MANAGE_FORMS: ['admin', 'superadmin'],
  ACCESS_ANALYTICS: ['admin', 'superadmin'],
  MANAGE_TRAINING: ['admin', 'superadmin'],
  MANAGE_ANIMATIONS: ['admin', 'superadmin'],
  VIEW_ALL_CAMPAIGNS: ['superadmin'],
};

// Provider component
export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Computed properties for roles
  const isSuperAdmin = user?.role === 'superadmin';
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  // Permission checker function
  const hasPermission = (permission: string): boolean => {
    if (!user || !user.role) return false;
    
    const allowedRoles = PERMISSIONS[permission as keyof typeof PERMISSIONS] || [];
    return allowedRoles.includes(user.role);
  };

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('galloavion_user');
    
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('galloavion_user');
      }
    }
    
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if username is an email or username
    const userKey = username.toLowerCase();
    const userRecord = MOCK_USERS[userKey];
    
    if (userRecord && userRecord.password === password) {
      setUser(userRecord.user);
      localStorage.setItem('galloavion_user', JSON.stringify(userRecord.user));
      setIsLoading(false);
      toast.success("Logged in successfully!");
      return true;
    }
    
    setIsLoading(false);
    toast.error("Invalid username or password");
    return false;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('galloavion_user');
    toast.info("Logged out");
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isLoading,
      isSuperAdmin,
      isAdmin,
      hasPermission
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
