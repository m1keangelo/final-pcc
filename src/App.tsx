
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import { AuthProvider } from "./contexts/AuthContext";
import { DataProvider } from "./contexts/DataContext";
import { SidebarProvider } from "./components/ui/sidebar";
import { ErrorBoundary } from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Form from "./pages/Form";
import DocumentSelection from "./pages/DocumentSelection";
import Clients from "./pages/Clients";
import Analytics from "./pages/Analytics";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import { useState, useEffect } from "react";
import { toast } from "./lib/toast";

// Create a more robust QueryClient with retry and error handling
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: true,
      onError: (error) => {
        console.error('Query error:', error);
        toast({
          title: "Network Error",
          description: "There was a problem with the data request. Please try again.",
          variant: "destructive",
        });
      },
    },
    mutations: {
      retry: 1,
      onError: (error) => {
        console.error('Mutation error:', error);
        toast({
          title: "Action Failed",
          description: "Your changes could not be saved. Please try again.",
          variant: "destructive",
        });
      },
    },
  },
});

// Fallback UI for the entire app
const AppError = () => (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
    <div className="bg-gray-800 border border-red-500 rounded-lg p-6 max-w-md text-center">
      <h1 className="text-xl text-red-400 mb-4">Application Error</h1>
      <p className="text-gray-300 mb-6">
        Something went wrong with the application. This could be due to network issues or an internal error.
      </p>
      <button
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
      >
        Reload Application
      </button>
    </div>
  </div>
);

// Offline detector component
const OfflineDetector = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      toast({
        title: "Back Online",
        description: "Your internet connection has been restored.",
      });
    };
    
    const handleOffline = () => {
      setIsOffline(true);
      toast({
        title: "You're Offline",
        description: "Please check your internet connection.",
        variant: "destructive",
      });
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  if (isOffline) {
    return (
      <div className="fixed top-0 left-0 right-0 bg-red-600 text-white py-1 px-4 text-center z-[100]">
        You are currently offline. Some features may be unavailable.
      </div>
    );
  }
  
  return null;
};

const App = () => (
  <ErrorBoundary fallback={<AppError />}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DataProvider>
          <TooltipProvider>
            <SidebarProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <OfflineDetector />
                <Routes>
                  <Route path="/login" element={<Login />} />
                  
                  <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/form" element={<ProtectedRoute><Form /></ProtectedRoute>} />
                  <Route path="/documents" element={<ProtectedRoute><DocumentSelection /></ProtectedRoute>} />
                  <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
                  <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
                  <Route path="/admin" element={
                    <ProtectedRoute requiresAdmin={true}>
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </SidebarProvider>
          </TooltipProvider>
        </DataProvider>
      </AuthProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
