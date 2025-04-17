
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
  permissions?: string[]; // Added permissions array
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
  updateUserPermissions: (userId: string, permissions: string[]) => void; // New function
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
      email: 'admin@galloavion.com',
      permissions: ['MANAGE_USERS', 'MANAGE_FORMS', 'ACCESS_ANALYTICS', 'DELETE_CLIENTS']
    }
  },
  'maria': {
    password: 'password123',
    user: { 
      id: '2', 
      name: 'Maria Rodriguez', 
      username: 'maria', 
      role: 'assistant',
      campaign: 'Dennis',
      permissions: []
    }
  },
  'juan': {
    password: 'password123',
    user: { 
      id: '3', 
      name: 'Juan Perez', 
      username: 'juan', 
      role: 'assistant',
      campaign: 'Michael',
      permissions: []
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
      permissions: ['MANAGE_USERS', 'MANAGE_FORMS', 'ACCESS_ANALYTICS', 'DELETE_CLIENTS', 'VIEW_ALL_CAMPAIGNS', 'MANAGE_TRAINING', 'MANAGE_ANIMATIONS']
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
  DELETE_CLIENTS: [], // This is now controlled by the user permissions array
};

// Provider component
export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [users, setUsers] = useState<Record<string, { password: string, user: User }>>(MOCK_USERS);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Computed properties for roles
  const isSuperAdmin = user?.role === 'superadmin';
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  // Permission checker function
  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    // First check if permission is role-based
    const allowedRoles = PERMISSIONS[permission as keyof typeof PERMISSIONS] || [];
    if (allowedRoles.length > 0 && user.role && allowedRoles.includes(user.role)) {
      return true;
    }
    
    // Then check if user has explicit permission
    return user.permissions?.includes(permission) || false;
  };

  // Update user permissions
  const updateUserPermissions = (userId: string, permissions: string[]) => {
    setUsers(prevUsers => {
      const updatedUsers = { ...prevUsers };
      
      // Find the user to update
      const userKey = Object.keys(updatedUsers).find(
        key => updatedUsers[key].user.id === userId
      );
      
      if (userKey) {
        // Update permissions for this user
        updatedUsers[userKey] = {
          ...updatedUsers[userKey],
          user: {
            ...updatedUsers[userKey].user,
            permissions
          }
        };
        
        // If this is the current logged in user, update that too
        if (user && user.id === userId) {
          setUser({
            ...user,
            permissions
          });
        }
      }
      
      return updatedUsers;
    });
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
    const userRecord = users[userKey];
    
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
      hasPermission,
      updateUserPermissions
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
