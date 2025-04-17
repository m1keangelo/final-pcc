
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
  // Generate a unique key for the mascot on each render
  const [mascotKey, setMascotKey] = useState(() => Date.now());
  
  // Force a new mascot on each page load/refresh
  useEffect(() => {
    const newKey = Date.now();
    setMascotKey(newKey);
    console.log("Login page rendered, new mascot key:", newKey);
  }, []);
  
  useEffect(() => {
    // If not loading, we still want to show splash for full 9 seconds
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        // Generate a new key to force RotatingMascot remount
        const newKey = Date.now();
        setMascotKey(newKey);
        console.log("Splash screen complete, new mascot key:", newKey);
      }, 9000);  // Explicitly set to 9000 milliseconds
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  if (showSplash || isLoading) {
    return <SplashScreen onComplete={() => {
      setShowSplash(false);
      // Generate a new key to force RotatingMascot remount
      const newKey = Date.now(); 
      setMascotKey(newKey);
      console.log("SplashScreen callback, new mascot key:", newKey);
    }} />;
  }
  
  return (
    <LanguageProvider>
      <div className="relative flex h-screen w-full overflow-hidden">
        <MatrixBackground />
        <div className="z-10 flex w-full flex-col md:flex-row">
          <BrandImagery rotationKey={mascotKey} />
          <LoginForm />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Login;
