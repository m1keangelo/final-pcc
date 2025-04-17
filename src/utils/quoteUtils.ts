
import { useLocationDetection } from './locationUtils';
import { useState, useEffect } from 'react';

// Add a state to force language for testing purposes
let forcedLanguage: 'en' | 'es' | null = null;

// Helper to get browser language
export const getBrowserLanguage = (): string => {
  try {
    return navigator.language.substring(0, 2).toLowerCase();
  } catch (error) {
    console.error('Error detecting browser language:', error);
    return 'en'; // Default to English
  }
};

// For testing purposes
export const forceLanguageForTesting = (language: 'en' | 'es' | null) => {
  console.info(`🌐 Setting forced language to: ${language || 'none (auto)'}`);
  forcedLanguage = language;
};

export const getRandomQuote = async (language?: 'en' | 'es') => {
  const { isInLatinAmerica } = useLocationDetection();
  
  // If language is explicitly provided, use it
  let selectedLanguage = language;
  
  // Check if a language is being forced for testing
  if (forcedLanguage !== null) {
    console.info(`🧪 Using forced language: ${forcedLanguage}`);
    selectedLanguage = forcedLanguage;
  } 
  // If no language is provided and not forced, try to detect based on location and browser
  else if (!selectedLanguage) {
    try {
      // Check browser language first
      const browserLang = getBrowserLanguage();
      if (browserLang === 'es') {
        console.info('🇪🇸 Using Spanish due to browser setting');
        selectedLanguage = 'es';
      } else if (browserLang === 'en') {
        console.info('🇺🇸 Using English due to browser setting');
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
  const randomQuote = quotes[randomIndex];
  
  // Return a more robust quote object with language info and HTML version
  return {
    text: randomQuote,
    language: selectedLanguage,
    html: randomQuote.replace(/(casa|home|house|hogar)/gi, '<span class="text-white font-bold text-[115%]">$1</span>')
  };
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
