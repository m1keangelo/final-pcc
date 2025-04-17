
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
  const [imageKey, setImageKey] = useState(Date.now()); // Force re-render with timestamp
  
  // Force a new image when splash screen completes
  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        setImageKey(Date.now()); // Generate new key after splash screen
      }, 9000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  if (showSplash || isLoading) {
    return <SplashScreen onComplete={() => {
      setShowSplash(false);
      setImageKey(Date.now()); // Generate new key when splash completes via callback
    }} />;
  }
  
  return (
    <LanguageProvider>
      <div className="relative flex h-screen w-full overflow-hidden">
        <MatrixBackground />
        <div className="z-10 flex w-full flex-col md:flex-row">
          <BrandImagery key={`mascot-${imageKey}`} />
          <LoginForm />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Login;
