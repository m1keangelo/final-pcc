
import { useState, useEffect } from "react";
import SplashScreen from "@/components/login/SplashScreen";
import LoginForm from "@/components/login/LoginForm";
import BrandImagery from "@/components/login/BrandImagery";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { useNavigate } from "react-router-dom";

const LoginError = () => (
  <div className="fixed inset-0 flex items-center justify-center bg-black/95 p-6">
    <div className="glass-card border border-red-500 p-8 rounded-xl max-w-md text-center">
      <h2 className="text-xl text-red-400 mb-4 font-display">Something went wrong</h2>
      <p className="text-gray-300 mb-6">We encountered an error while loading the login page. Please try again.</p>
      <button 
        onClick={() => window.location.reload()}
        className="px-5 py-2.5 bg-gradient-to-r from-gallomodern-500 to-gallomodern-600 text-white rounded-lg hover:from-gallomodern-400 hover:to-gallomodern-500 transition-all shadow-xl shadow-gallomodern-700/20"
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
    // If user is already logged in, redirect to home
    if (user) {
      navigate('/');
    }

    // Show splash screen for 3 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [user, navigate]);
  
  if (showSplash && !user && !isLoading) {
    return (
      <ErrorBoundary fallback={<LoginError />}>
        <SplashScreen onComplete={() => setShowSplash(false)} />
      </ErrorBoundary>
    );
  }
  
  return (
    <ErrorBoundary fallback={<LoginError />}>
      <LanguageProvider>
        <div className="relative flex h-screen w-full overflow-hidden bg-gradient-to-br from-[#12121e] via-[#1a1a2a] to-[#121220]">
          <div className="z-10 flex w-full flex-col md:flex-row h-full items-center justify-center md:justify-start">
            <BrandImagery />
            <LoginForm className="md:ml-[-5%] lg:ml-[-10%] xl:ml-[-15%] pt-16 md:pt-8" />
          </div>
        </div>
      </LanguageProvider>
    </ErrorBoundary>
  );
};

export default Login;
