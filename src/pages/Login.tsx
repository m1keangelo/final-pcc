
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import LoginForm from "@/components/login/LoginForm";
import BrandImagery from "@/components/login/BrandImagery";
import MatrixBackground from "@/components/login/MatrixBackground";
import SplashScreen from "@/components/login/SplashScreen";

const Login = () => {
  const { t } = useLanguage();
  const [showSplash, setShowSplash] = useState(true);
  
  // Hide the splash screen when complete
  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  return (
    <>
      {/* Splash Screen */}
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      
      <div className="min-h-screen flex flex-col bg-black relative w-full overflow-hidden">
        {/* Animated Background */}
        <MatrixBackground />
        
        {/* Main Content Container */}
        <div className="flex w-full h-screen z-10">
          {/* Left Column - Login Form */}
          <div className="w-full md:w-2/5 flex flex-col items-center justify-center p-4 order-2 md:order-1">
            <LoginForm />
            
            {/* Language Toggle - Now centered under login form */}
            <div className="mt-6">
              <LanguageToggle />
            </div>
          </div>
          
          {/* Right Column - Brand Imagery */}
          <div className="w-full md:w-3/5 bg-[#1a1f2c]/75 flex items-center justify-center order-1 md:order-2 overflow-hidden relative">
            <BrandImagery />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
