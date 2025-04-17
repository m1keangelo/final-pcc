import React, { useEffect, useState } from "react";
import { getRandomQuote, getBrowserLanguage, forceLanguageForTesting } from "@/utils/quoteUtils";

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [quote, setQuote] = useState<{text: string, language: string, html: string}>({
    text: "", 
    language: "",
    html: ""
  });
  
  const [debugInfo, setDebugInfo] = useState<{
    browserLanguage: string;
    quoteLanguage: string;
    forcedLanguage: string | null;
  }>({
    browserLanguage: '',
    quoteLanguage: '',
    forcedLanguage: null
  });
  
  const forceSpanish = () => {
    forceLanguageForTesting('es');
    fetchQuote();
  };
  
  const forceEnglish = () => {
    forceLanguageForTesting('en');
    fetchQuote();
  };
  
  const resetLanguage = () => {
    forceLanguageForTesting(null);
    fetchQuote();
  };
  
  const fetchQuote = async () => {
    try {
      const randomQuote = await getRandomQuote();
      setQuote(randomQuote);
      
      setDebugInfo({
        browserLanguage: getBrowserLanguage(),
        quoteLanguage: randomQuote.language,
        forcedLanguage: null // Will be updated if set
      });
    } catch (error) {
      console.error("Error fetching quote:", error);
      // Fallback quote in case of error
      setQuote({
        text: "Control your mind or it'll make you its bitch.",
        language: "en",
        html: "Control your mind or it'll make you its <span class=\"text-white font-bold text-[115%]\">bitch</span>."
      });
    }
  };
  
  useEffect(() => {
    fetchQuote();
    
    if (process.env.NODE_ENV === 'development') {
      (async () => {
        try {
          const testQuote = await getRandomQuote();
          setDebugInfo(prev => ({
            ...prev,
            forcedLanguage: testQuote.language
          }));
        } catch (error) {
          console.error("Failed to check forced language state:", error);
        }
      })();
    }
  }, []);
  
  useEffect(() => {
    const fadeOutTimer = setTimeout(() => {
      setFadeOut(true);
    }, 9000);
    
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
      <div className="relative flex flex-col items-center text-center max-w-4xl px-6">
        <div className="mb-6">
          <img 
            src="/lovable-uploads/b9619f78-7281-46a1-93d2-c7c8123e5e56.png" 
            alt="Gallo Avión Logo" 
            className="w-24 h-24 md:w-28 md:h-28 object-contain animate-pulse"
            style={{
              filter: "drop-shadow(0 0 20px rgba(105, 13, 172, 0.6))"
            }}
          />
        </div>
        
        <div className="mb-12 animate-fade-in">
          {quote.html ? (
            <h2 
              className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-[#9b87f5]"
              dangerouslySetInnerHTML={{ __html: quote.html }}
            />
          ) : (
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-8 text-[#9b87f5]">
              Loading awesome quote...
            </h2>
          )}
        </div>
        
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
      
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-4 left-4 text-white bg-gray-800/90 p-3 rounded shadow-lg">
          <p className="font-bold mb-2">Quote Debug Info:</p>
          <p>Browser Language: {debugInfo.browserLanguage}</p>
          <p>Quote Language: {debugInfo.quoteLanguage || 'Loading...'}</p>
          <p>Language Class: {quote.language === 'es' ? '🇪🇸 Spanish' : '🇺🇸 English'}</p>
          <p>Forced Language: {debugInfo.forcedLanguage || 'None'}</p>
          
          <div className="mt-4 flex gap-2">
            <button 
              onClick={forceSpanish}
              className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              🇪🇸 Test Spanish
            </button>
            <button 
              onClick={forceEnglish}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
            >
              🇺🇸 Test English
            </button>
            <button 
              onClick={resetLanguage}
              className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              🔄 Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SplashScreen;
