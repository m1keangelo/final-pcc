
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { toast } from "@/components/ui/sonner";

// User type
type User = {
  id: string;
  name: string;
  username: string;
};

// Auth context type
type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
};

// Mock users for demo
const MOCK_USERS: Record<string, { password: string, user: User }> = {
  'admin': {
    password: 'password123',
    user: { id: '1', name: 'Admin User', username: 'admin' }
  },
  'maria': {
    password: 'password123',
    user: { id: '2', name: 'Maria Rodriguez', username: 'maria' }
  },
  'juan': {
    password: 'password123',
    user: { id: '3', name: 'Juan Perez', username: 'juan' }
  }
};

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
    
    const userRecord = MOCK_USERS[username.toLowerCase()];
    
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
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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
