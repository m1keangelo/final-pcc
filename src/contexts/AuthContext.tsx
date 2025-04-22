
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
  campaigns?: string[];
  permissions?: string[];
};

// New user input type
type NewUserInput = {
  username: string;
  password: string;
  name: string;
  role: 'admin' | 'superadmin' | 'assistant';
  campaign?: string;
  campaigns?: string[];
  permissions?: string[];
  email?: string;
};

// Feedback item type for bugs and suggestions
export interface FeedbackItem {
  id: string;
  type: 'bug' | 'suggestion';
  description: string;
  timestamp: string;
  status: 'new' | 'read' | 'resolved';
  imageUrl?: string;
}

// Add new types for system logs - simplified to avoid issues
export interface SystemLog {
  id: string;
  type: string;
  message: string;
  timestamp: string;
}

// Auth context type
type AuthContextType = {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
  isSuperAdmin: boolean;
  isAdmin: boolean;
  hasPermission: (permission: string) => boolean;
  updateUserPermissions: (userId: string, permissions: string[]) => void;
  addUser: (userData: NewUserInput) => boolean;
  deleteUser: (userId: string) => boolean;
  getAllUsers: () => User[];
  feedbackItems: FeedbackItem[];
  addFeedbackItem: (type: 'bug' | 'suggestion', description: string, imageUrl?: string) => void;
  updateFeedbackStatus: (id: string, status: 'new' | 'read' | 'resolved') => void;
  deleteFeedbackItem: (id: string) => void;
  systemLogs: SystemLog[];
  addSystemLog: (type: string, message: string) => void;
  clearSystemLogs: () => void;
};

// Mock users for demo
const MOCK_USERS: Record<string, { password: string, user: User }> = {
  'admin': {
    password: 'password123',
    user: { 
      id: '1', 
      name: 'Admin User', 
      username: 'admin', 
      role: 'admin', 
      email: 'admin@galloavion.com',
      campaigns: ['All'],
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
      campaigns: ['Dennis', 'Tito'],
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
      campaigns: ['Michael'],
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
      campaigns: ['All'],
      permissions: ['MANAGE_USERS', 'MANAGE_FORMS', 'ACCESS_ANALYTICS', 'DELETE_CLIENTS', 'VIEW_ALL_CAMPAIGNS']
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
  VIEW_ALL_CAMPAIGNS: ['superadmin'],
  DELETE_CLIENTS: [],
};

// Provider component
export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [users, setUsers] = useState<Record<string, { password: string, user: User }>>(MOCK_USERS);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);

  const isSuperAdmin = user?.role === 'superadmin';
  const isAdmin = user?.role === 'admin' || user?.role === 'superadmin';

  const hasPermission = (permission: string): boolean => {
    if (!user) return false;
    
    const allowedRoles = PERMISSIONS[permission as keyof typeof PERMISSIONS] || [];
    if (allowedRoles.length > 0 && user.role && allowedRoles.includes(user.role)) {
      return true;
    }
    
    return user.permissions?.includes(permission) || false;
  };

  const getAllUsers = (): User[] => {
    return Object.values(users).map(entry => entry.user);
  };

  const addUser = (userData: NewUserInput): boolean => {
    const { username, password, name, role, campaign, campaigns, permissions = [] } = userData;
    
    if (users[username.toLowerCase()]) {
      return false;
    }
    
    const newUserId = Date.now().toString();
    
    const newUser = {
      id: newUserId,
      name,
      username,
      role,
      campaign,
      campaigns: campaigns || (campaign ? [campaign] : []),
      permissions
    };
    
    setUsers(prev => ({
      ...prev,
      [username.toLowerCase()]: {
        password,
        user: newUser
      }
    }));
    
    return true;
  };

  const deleteUser = (userId: string): boolean => {
    let deleted = false;
    
    setUsers(prev => {
      const newUsers = { ...prev };
      
      for (const key in newUsers) {
        if (newUsers[key].user.id === userId) {
          delete newUsers[key];
          deleted = true;
          break;
        }
      }
      
      return deleted ? newUsers : prev;
    });
    
    return deleted;
  };

  const updateUserPermissions = (userId: string, permissions: string[]) => {
    setUsers(prevUsers => {
      const updatedUsers = { ...prevUsers };
      
      const userKey = Object.keys(updatedUsers).find(
        key => updatedUsers[key].user.id === userId
      );
      
      if (userKey) {
        updatedUsers[userKey] = {
          ...updatedUsers[userKey],
          user: {
            ...updatedUsers[userKey].user,
            permissions
          }
        };
        
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

  const addFeedbackItem = async (type: 'bug' | 'suggestion', description: string, imageUrl?: string) => {
    const newItem: FeedbackItem = {
      id: Date.now().toString(),
      type,
      description,
      timestamp: new Date().toISOString(),
      status: 'new',
      imageUrl
    };
    
    setFeedbackItems(prev => [newItem, ...prev]);
  };

  const updateFeedbackStatus = (id: string, status: 'new' | 'read' | 'resolved') => {
    setFeedbackItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, status } : item
      )
    );
  };

  const deleteFeedbackItem = (id: string) => {
    setFeedbackItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  // Simplified logging function to avoid crashes
  const addSystemLog = (type: string, message: string) => {
    try {
      const newLog: SystemLog = {
        id: Date.now().toString(),
        type,
        message,
        timestamp: new Date().toISOString()
      };
      
      setSystemLogs(prev => [newLog, ...prev].slice(0, 100)); // Keep only the last 100 logs
      
      // Only log to console in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`[${type.toUpperCase()}] ${message}`);
      }
    } catch (error) {
      console.error("Error adding system log:", error);
    }
  };

  const clearSystemLogs = () => {
    setSystemLogs([]);
  };
  
  useEffect(() => {
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

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate network request
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const userKey = username.toLowerCase();
    const userRecord = users[userKey];
    
    // Add a debug log
    console.log("Login attempt:", { username: userKey, found: !!userRecord });
    
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
      updateUserPermissions,
      addUser,
      deleteUser,
      getAllUsers,
      feedbackItems,
      addFeedbackItem,
      updateFeedbackStatus,
      deleteFeedbackItem,
      systemLogs,
      addSystemLog,
      clearSystemLogs
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
