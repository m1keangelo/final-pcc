
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Layout from "./Layout";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
  requiresAdmin?: boolean;
  requiresSuperAdmin?: boolean;
  permission?: string;
}

const ProtectedRoute = ({ 
  children, 
  requiresAdmin = false,
  requiresSuperAdmin = false,
  permission
}: ProtectedRouteProps) => {
  const { user, isLoading, isAdmin, isSuperAdmin, hasPermission } = useAuth();
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-gallopurple border-t-transparent rounded-full"></div>
      </div>
    );
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check for super admin requirement
  if (requiresSuperAdmin && !isSuperAdmin) {
    return <Navigate to="/" replace />;
  }
  
  // Check for admin requirement
  if (requiresAdmin && !isAdmin) {
    return <Navigate to="/" replace />;
  }
  
  // Check for specific permission
  if (permission && !hasPermission(permission)) {
    return <Navigate to="/" replace />;
  }
  
  return <Layout>{children}</Layout>;
};

export default ProtectedRoute;
