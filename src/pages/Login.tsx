
import { useState, useEffect } from "react";
import SplashScreen from "@/components/login/SplashScreen";
import LoginForm from "@/components/login/LoginForm";
import BrandImagery from "@/components/login/BrandImagery";
import MatrixBackground from "@/components/login/MatrixBackground";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { toast } from "@/lib/toast";

const LoginError = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black p-6">
    <div className="bg-gray-900 border border-red-500 p-6 rounded-lg max-w-md text-center">
      <h2 className="text-xl text-red-500 mb-4">Something went wrong</h2>
      <p className="text-gray-300 mb-6">We encountered an error while loading the login page. Please try again.</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-4 py-2 bg-[#690dac] text-white rounded hover:bg-[#7a2dac] transition-all"
      >
        Reload Page
      </button>
    </div>
  </div>
);

const Login = () => {
  const { isLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    // If not loading, we still want to show splash for full 9 seconds
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 9000);  // Explicitly set to 9000 milliseconds
      
      return () => clearTimeout(timer);
    }
    
    // Record session start time
    try {
      sessionStorage.setItem('sessionStartTime', Date.now().toString());
    } catch (error) {
      console.warn('Failed to set session start time:', error);
    }
  }, [isLoading]);
  
  if (showSplash || isLoading) {
    return (
      <ErrorBoundary fallback={<LoginError />}>
        <SplashScreen onComplete={() => setShowSplash(false)} />
      </ErrorBoundary>
    );
  }
  
  return (
    <ErrorBoundary fallback={<LoginError />}>
      <LanguageProvider>
        <div className="relative flex h-screen w-full overflow-hidden">
          <MatrixBackground />
          <div className="z-10 flex w-full flex-col md:flex-row">
            <BrandImagery />
            <LoginForm />
          </div>
        </div>
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default Login;
