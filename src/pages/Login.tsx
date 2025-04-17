
import { useState, useEffect } from "react";
import SplashScreen from "@/components/login/SplashScreen";
import LoginForm from "@/components/login/LoginForm";
import BrandImagery from "@/components/login/BrandImagery";
import MatrixBackground from "@/components/login/MatrixBackground";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

// Utility function to get a truly random image index
const getRandomImageIndex = (max: number) => {
  // Create a more random selection by using timestamp + Math.random
  const randomValue = Math.floor(Math.random() * 100000) + Date.now();
  console.log("Generated random value:", randomValue);
  return randomValue % max;
};

const Login = () => {
  const { isLoading } = useAuth();
  const [showSplash, setShowSplash] = useState(true);
  
  // Set a random image index on initial load with a key to force re-render
  const [imageIndex, setImageIndex] = useState(() => {
    const randomIndex = getRandomImageIndex(10); // We have 10 rooster images
    console.log("Initial login image index:", randomIndex);
    return randomIndex;
  });
  
  // Force a new image if user has been on the page for more than 30 seconds
  useEffect(() => {
    const refreshTimer = setTimeout(() => {
      const newIndex = getRandomImageIndex(10);
      console.log("Timer-based image refresh, new index:", newIndex);
      setImageIndex(newIndex);
    }, 30000);
    
    return () => clearTimeout(refreshTimer);
  }, []);
  
  useEffect(() => {
    // If not loading, we still want to show splash for full 9 seconds
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowSplash(false);
        
        // Change image after splash screen
        const newIndex = getRandomImageIndex(10);
        console.log("Splash screen complete, new image index:", newIndex);
        setImageIndex(newIndex);
      }, 9000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading]);
  
  if (showSplash || isLoading) {
    return <SplashScreen onComplete={() => {
      setShowSplash(false);
      
      // Change image after splash screen completion via callback
      const newIndex = getRandomImageIndex(10);
      console.log("SplashScreen callback, new image index:", newIndex);
      setImageIndex(newIndex);
    }} />;
  }
  
  return (
    <LanguageProvider>
      <div className="relative flex h-screen w-full overflow-hidden">
        <MatrixBackground />
        <div className="z-10 flex w-full flex-col md:flex-row">
          {/* Force component re-render with key prop */}
          <BrandImagery 
            key={`mascot-${imageIndex}`} 
            imageIndex={imageIndex} 
          />
          <LoginForm />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Login;
