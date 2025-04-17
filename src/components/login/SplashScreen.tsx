
import React, { useEffect, useState } from "react";
import { getRandomQuote, getBrowserLanguage, forceLanguageForTesting } from "@/utils/quoteUtils";
import { useToast } from "@/hooks/use-toast";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const { toast } = useToast();
  
  const [quote, setQuote] = useState<{text: string, language: string, html: string}>({
    text: "", 
    language: "",
    html: ""
  });
  
  const [loadingProgress, setLoadingProgress] = useState(0);
  
  const [debugInfo, setDebugInfo] = useState<{
    browserLanguage: string;
    quoteLanguage: string;
    forcedLanguage: string | null;
  }>({
    browserLanguage: '',
    quoteLanguage: '',
    forcedLanguage: null
  });
  
  const fetchQuote = async () => {
    try {
      const randomQuote = await getRandomQuote();
      setQuote(randomQuote);
      
      setDebugInfo({
        browserLanguage: getBrowserLanguage(),
        quoteLanguage: randomQuote.language,
        forcedLanguage: null
      });
    } catch (error) {
      console.error("Error fetching quote:", error);
      // Fallback quote in case of error
      setQuote({
        text: "Control your mind or it'll make you its bitch.",
        language: "en",
        html: "Control your mind or it'll make you its <span class=\"text-white font-bold text-[115%]\">bitch</span>."
      });
      
      toast({
        description: "Failed to load inspirational quote. Using default.",
        variant: "destructive",
      });
    }
  };
  
  useEffect(() => {
    fetchQuote();
    
    // Simulate loading progress
    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        const newProgress = prev + (100 - prev) / 10;
        return newProgress >= 100 ? 100 : newProgress;
      });
    }, 200);
    
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 5500);
    
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 6000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(fadeOutTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-[#0f0f1a] via-[#121225] to-[#0a0a12] transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="relative flex flex-col items-center text-center max-w-4xl px-6">
        <div className="mb-4">
          <h3 className="text-gallomodern-400 font-display tracking-wider text-sm uppercase mb-3">
            Mob Mentality with Class
          </h3>
          <div className="h-[1px] w-16 bg-gallomodern-500/50 mx-auto"></div>
        </div>
        
        <div className="mb-10">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gallomodern-500 rounded-full blur opacity-50 group-hover:opacity-75 transition duration-300 animate-pulse"></div>
            <img 
              src="/lovable-uploads/b9619f78-7281-46a1-93d2-c7c8123e5e56.png" 
              alt="Gallo Avión Logo" 
              className="relative w-28 h-28 md:w-32 md:h-32 object-contain"
              style={{
                filter: "drop-shadow(0 0 25px rgba(155, 135, 245, 0.8))"
              }}
            />
          </div>
        </div>
        
        <div className="mb-16 animate-fade-in">
          {quote.html ? (
            <h2 
              className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-gradient-gallo"
              dangerouslySetInnerHTML={{ __html: quote.html }}
            />
          ) : (
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-gradient-gallo">
              <span className="animate-pulse">...</span>
            </h2>
          )}
        </div>
        
        <div className="mt-8 w-full max-w-sm">
          <div className="flex justify-between text-xs text-white/60 mb-2">
            <span>Loading assets</span>
            <span>{Math.round(loadingProgress)}%</span>
          </div>
          <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-gallomodern-300 via-gallomodern-500 to-gallomodern-600 rounded-full" 
              style={{ width: `${loadingProgress}%` }}
            />
          </div>
        </div>
      </div>
      
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-4 left-4 text-white bg-black/80 p-3 rounded shadow-lg">
          <p className="font-bold mb-2 text-gallomodern-300">Quote Debug Info:</p>
          <p>Browser Language: {debugInfo.browserLanguage}</p>
          <p>Quote Language: {debugInfo.quoteLanguage || 'Loading...'}</p>
          <p>Language: {quote.language === 'es' ? '🇪🇸 Spanish' : '🇺🇸 English'}</p>
          <p>Forced Lang: {debugInfo.forcedLanguage || 'None'}</p>
          
          <div className="mt-4 flex gap-2">
            <button 
              onClick={() => {
                forceLanguageForTesting('es');
                fetchQuote();
              }}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              🇪🇸
            </button>
            <button 
              onClick={() => {
                forceLanguageForTesting('en');
                fetchQuote();
              }}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              🇺🇸
            </button>
            <button 
              onClick={() => {
                forceLanguageForTesting(null);
                fetchQuote();
              }}
              className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              🔄
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
