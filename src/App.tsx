
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
import ClientTrash from "./pages/ClientTrash";
import Analytics from "./pages/Analytics";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import { useState } from "react";
import { toast } from "./lib/toast";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
    mutations: {
      retry: 1,
    },
  },
});

// Remove the unsubscribe functions that could be causing issues
// queryClient subscription handlers are causing errors

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

const OfflineDetector = () => {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);
  
  // useEffect is causing issues - let's simplify this component
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
                <Routes>
                  <Route path="/login" element={<Login />} />
                  
                  <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
                  <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                  <Route path="/form" element={<ProtectedRoute><Form /></ProtectedRoute>} />
                  <Route path="/documents" element={<ProtectedRoute><DocumentSelection /></ProtectedRoute>} />
                  <Route path="/clients" element={<ProtectedRoute><Clients /></ProtectedRoute>} />
                  <Route path="/trash" element={<ProtectedRoute requiresAdmin={true}><ClientTrash /></ProtectedRoute>} />
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
