
import { useState, useEffect } from "react";
import SplashScreen from "@/components/login/SplashScreen";
import LoginForm from "@/components/login/LoginForm";
import BrandImagery from "@/components/login/BrandImagery";
import MatrixBackground from "@/components/login/MatrixBackground";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { toast } from "@/lib/toast";
import { useNavigate } from "react-router-dom";

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
  const { isLoading, user } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already logged in, navigate to dashboard
    if (user) {
      navigate('/');
      return;
    }

    // Only show splash screen if not logged in
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 9000);  // 9 seconds as before
    
    return () => clearTimeout(timer);
  }, [user, navigate]);
  
  // First-time session start tracking
  useEffect(() => {
    try {
      if (!sessionStorage.getItem('sessionStartTime')) {
        sessionStorage.setItem('sessionStartTime', Date.now().toString());
      }
    } catch (error) {
      console.warn('Failed to set session start time:', error);
    }
  }, []);
  
  // Show splash screen only if not logged in and it's the first time
  if (showSplash && !user && !isLoading) {
    return (
      <ErrorBoundary fallback={<LoginError />}>
        <SplashScreen onComplete={() => setShowSplash(false)} />
      </ErrorBoundary>
    );
  }
  
  // If logged in or loading is complete, show login form
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

