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
  campaigns?: string[]; // Added for multiple campaigns
  permissions?: string[]; // Added permissions array
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

// Add new types for system logs
export interface SystemLog {
  id: string;
  type: 'translation' | 'error' | 'debug';
  message: string;
  details?: any;
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
  // Feedback management
  feedbackItems: FeedbackItem[];
  addFeedbackItem: (type: 'bug' | 'suggestion', description: string, imageUrl?: string) => void;
  updateFeedbackStatus: (id: string, status: 'new' | 'read' | 'resolved') => void;
  deleteFeedbackItem: (id: string) => void;
  systemLogs: SystemLog[];
  addSystemLog: (type: SystemLog['type'], message: string, details?: any) => void;
  clearSystemLogs: () => void;
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
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>([]);
  
  const [systemLogs, setSystemLogs] = useState<SystemLog[]>([]);

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

  // Get all users (for admin dashboard)
  const getAllUsers = (): User[] => {
    return Object.values(users).map(entry => entry.user);
  };

  // Add a new user
  const addUser = (userData: NewUserInput): boolean => {
    const { username, password, name, role, campaign, campaigns, permissions = [] } = userData;
    
    // Check if username is already taken
    if (users[username.toLowerCase()]) {
      return false;
    }
    
    // Create new user ID
    const newUserId = Date.now().toString();
    
    // Create the new user object
    const newUser = {
      id: newUserId,
      name,
      username,
      role,
      campaign,
      campaigns: campaigns || (campaign ? [campaign] : []),
      permissions
    };
    
    // Add to users state
    setUsers(prev => ({
      ...prev,
      [username.toLowerCase()]: {
        password,
        user: newUser
      }
    }));
    
    console.log("Added user:", newUser);
    console.log("Current users:", getAllUsers());
    
    return true;
  };

  // Delete a user
  const deleteUser = (userId: string): boolean => {
    let deleted = false;
    
    setUsers(prev => {
      const newUsers = { ...prev };
      
      // Find and remove user with the matching ID
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

  // Add feedback item (bug or suggestion)
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
    
    // Send email notification
    try {
      await sendEmailNotification(newItem);
      console.log(`Email notification sent for new ${type}`);
    } catch (error) {
      console.error('Failed to send email notification:', error);
    }
  };

  // Update feedback status
  const updateFeedbackStatus = (id: string, status: 'new' | 'read' | 'resolved') => {
    setFeedbackItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, status } : item
      )
    );
  };

  // Delete feedback item
  const deleteFeedbackItem = (id: string) => {
    setFeedbackItems(prevItems => prevItems.filter(item => item.id !== id));
  };
  
  const addSystemLog = (type: SystemLog['type'], message: string, details?: any) => {
    const newLog: SystemLog = {
      id: Date.now().toString(),
      type,
      message,
      details,
      timestamp: new Date().toISOString()
    };
    
    setSystemLogs(prev => [newLog, ...prev].slice(0, 1000)); // Keep last 1000 logs
    
    // Also log to console for immediate debugging
    console.log(`[${type.toUpperCase()}] ${message}`, details || '');
  };

  const clearSystemLogs = () => {
    setSystemLogs([]);
  };
  
  // Email notification function
  const sendEmailNotification = async (item: FeedbackItem) => {
    const subject = item.type === 'bug' 
      ? ':::: Mucho Dinero BUG ::::' 
      : ':::: Mucho Dinero SUGGESTION ::::';
      
    const emailData = {
      to: 'm1keangelo@icloud.com',
      subject,
      body: `
        Type: ${item.type.toUpperCase()}
        
        Description:
        ${item.description}
        
        Timestamp: ${new Date(item.timestamp).toLocaleString()}
        ${item.imageUrl ? `\nScreenshot: ${item.imageUrl}` : ''}
      `
    };
    
    // In a real application, this would send an actual email
    // For demo purposes, we'll just log it
    console.log('Email notification data:', emailData);
    
    // Simulating email API call
    return new Promise((resolve) => {
      setTimeout(resolve, 500);
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
