
import { useState, useEffect } from "react";
import SplashScreen from "@/components/login/SplashScreen";
import LoginForm from "@/components/login/LoginForm";
import BrandImagery from "@/components/login/BrandImagery";
import MatrixBackground from "@/components/login/MatrixBackground";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const { isLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  
  useEffect(() => {
    // If not loading, we still want to show splash for a bit
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  if (showSplash || isLoading) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }
  
  return (
    <LanguageProvider>
      <div className="relative flex h-screen w-full overflow-hidden">
        <MatrixBackground />
        <div className="z-10 flex w-full flex-col md:flex-row">
          <BrandImagery />
          <LoginForm />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Login;
