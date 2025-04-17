
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
  // Add a key to force RotatingMascot component to remount and get a new random image
  const [mascotKey, setMascotKey] = useState(Date.now());
  
  useEffect(() => {
    // If not loading, we still want to show splash for full 9 seconds
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        // Generate a new key to force RotatingMascot remount
        setMascotKey(Date.now());
      }, 9000);  // Explicitly set to 9000 milliseconds
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  if (showSplash || isLoading) {
    return <SplashScreen onComplete={() => {
      setShowSplash(false);
      // Generate a new key to force RotatingMascot remount
      setMascotKey(Date.now());
    }} />;
  }
  
  return (
    <LanguageProvider>
      <div className="relative flex h-screen w-full overflow-hidden">
        <MatrixBackground />
        <div className="z-10 flex w-full flex-col md:flex-row">
          <BrandImagery key={mascotKey} />
          <LoginForm />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Login;
