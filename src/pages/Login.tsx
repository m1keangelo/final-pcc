
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import LoginForm from "@/components/login/LoginForm";
import BrandImagery from "@/components/login/BrandImagery";
import MatrixBackground from "@/components/login/MatrixBackground";
import SplashScreen from "@/components/splash/SplashScreen";
import { AnimatePresence } from "framer-motion";

const Login = () => {
  const { t } = useLanguage();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      </AnimatePresence>
      
      <div className="min-h-screen flex flex-col bg-black relative w-full overflow-hidden">
        <MatrixBackground />
        
        <div className="absolute top-4 right-4 z-20">
          <LanguageToggle />
        </div>
        
        <div className="flex w-full h-screen z-10">
          {/* Left Column - Brand Imagery (swapped) */}
          <div className="w-full md:w-3/5 bg-[#1a1f2c]/75 flex items-center justify-center order-1">
            <BrandImagery />
          </div>
          
          {/* Right Column - Login Form (swapped) */}
          <div className="w-full md:w-2/5 flex items-center justify-center order-2">
            <LoginForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
