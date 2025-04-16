
import { useEffect, useState } from "react";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);
  
  // Handle the splash screen timing
  useEffect(() => {
    // Start fade out after 8 seconds
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 8000);
    
    // Complete transition after 9 seconds (total time)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 9000);
    
    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-black transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Center content */}
      <div className="relative flex flex-col items-center text-center max-w-4xl px-6">
        {/* Logo container */}
        <div className="mb-6">
          <img 
            src="/lovable-uploads/b9619f78-7281-46a1-93d2-c7c8123e5e56.png" 
            alt="Gallo Avión Logo" 
            className="w-32 h-32 md:w-40 md:h-40 object-contain animate-pulse"
            style={{
              filter: "drop-shadow(0 0 20px rgba(105, 13, 172, 0.6))"
            }}
          />
        </div>
        
        {/* Tagline */}
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-2 animate-fade-in">
          <span className="text-[#9b87f5]">Fuck Mediocrity,</span>
        </h1>
        
        <h2 className="text-5xl md:text-6xl font-bold leading-tight mb-6 animate-fade-in" style={{ animationDelay: '1s' }}>
          <span className="text-[#9b87f5]">Unleashing</span> <span className="text-white">Real Estate</span> <span className="text-[#9b87f5]">Marketing Power!</span>
        </h2>
        
        {/* Animated loading indicator */}
        <div className="mt-8 w-full max-w-xs h-1 bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#9b87f5] rounded-full" 
            style={{ 
              width: '100%',
              animation: 'progressBar 8s linear forwards'
            }}
          />
        </div>
      </div>
      
      <style>{`
        @keyframes progressBar {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
