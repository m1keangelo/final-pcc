import { useLocationDetection } from './locationUtils';

export const getRandomQuote = async (language?: 'en' | 'es') => {
  const { isInLatinAmerica } = useLocationDetection();
  
  // If language is explicitly provided, use it
  let selectedLanguage = language;
  
  // If no language is provided, try to detect based on location
  if (!selectedLanguage) {
    try {
      // Check browser language first
      const browserLang = navigator.language.substring(0, 2).toLowerCase();
      if (browserLang === 'es') {
        console.info('🇪🇸 Forcing Spanish due to browser setting');
        selectedLanguage = 'es';
      } else if (browserLang === 'en') {
        console.info('🇺🇸 Forcing English due to browser setting');
        selectedLanguage = 'en';
      } else if (isInLatinAmerica) {
        // If in Latin America and browser isn't explicitly set to English, default to Spanish
        console.info('🌎 Detected Latin American location, using Spanish');
        selectedLanguage = 'es';
      } else {
        // Default to English for all other cases
        console.info('🌍 Using default English');
        selectedLanguage = 'en';
      }
    } catch (error) {
      console.error('Error detecting language:', error);
      selectedLanguage = 'en'; // Default to English on error
    }
  }
  
  console.info('Selected Language:', selectedLanguage);
  
  // Spanish quotes
  const spanishQuotes = [
    "El camino hacia tu hogar comienza con un solo paso.",
    "Tu casa es donde comienza tu historia.",
    "Invierte en tu futuro, compra una casa hoy.",
    "Cada casa tiene una historia. Crea la tuya.",
    "El hogar es donde el corazón encuentra paz.",
    "No es solo una casa, es tu santuario.",
    "Construye patrimonio, no solo pagues renta.",
    "Tu casa, tu reglas, tu libertad.",
    "El mejor momento para comprar una casa fue hace 20 años. El segundo mejor momento es ahora.",
    "Donde hay voluntad, hay un camino hacia tu hogar."
  ];
  
  // English quotes
  const englishQuotes = [
    "The journey to your home begins with a single step.",
    "Home is where your story begins.",
    "Invest in your future, buy a home today.",
    "Every house has a story. Create yours.",
    "Home is where the heart finds peace.",
    "It's not just a house, it's your sanctuary.",
    "Build equity, not just pay rent.",
    "Your house, your rules, your freedom.",
    "The best time to buy a house was 20 years ago. The second best time is now.",
    "Where there's a will, there's a way to homeownership."
  ];
  
  // Select quotes based on language
  const quotes = selectedLanguage === 'es' ? spanishQuotes : englishQuotes;
  
  // Get a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  return quotes[randomIndex];
};

export const isInLatinAmerica = async (): Promise<boolean> => {
  try {
    const response = await fetch('https://ipapi.co/json/', { 
      signal: AbortSignal.timeout(3000) 
    });
    
    if (!response.ok) {
      throw new Error('Location fetch failed');
    }
    
    const data = await response.json();
    const latinAmericanCountries = [
      'MX', 'GT', 'BZ', 'SV', 'HN', 'NI', 
      'CR', 'PA', 'CO', 'VE', 'EC', 'PE', 
      'BO', 'CL', 'AR', 'UY', 'PY', 'BR'
    ];
    
    return latinAmericanCountries.includes(data.country_code);
  } catch (error) {
    console.error('Error detecting location:', error);
    return false; // Default to false on error
  }
};
