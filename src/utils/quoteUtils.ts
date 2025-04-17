
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

// Custom hook for getting language-based quote
export const useQuote = () => {
  const { isInLatinAmerica } = useLocationDetection();
  const [quote, setQuote] = useState<{
    text: string;
    language: string;
    html: string;
  }>({
    text: "",
    language: "",
    html: ""
  });
  
  useEffect(() => {
    const fetchQuote = async () => {
      try {
        const randomQuote = await getRandomQuote();
        setQuote(randomQuote);
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
    
    fetchQuote();
  }, [isInLatinAmerica]);
  
  return quote;
};

export const getRandomQuote = async (language?: 'en' | 'es') => {
  // Get location information without the hook for server-side compatibility
  let isLatinAmerican = false;
  
  try {
    isLatinAmerican = await isInLatinAmerica();
  } catch (error) {
    console.warn("Could not detect location, defaulting to non-Latin America");
  }
  
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
      } else if (isLatinAmerican) {
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
  
  // Spanish quotes - Mob Mentality with Class
  const spanishQuotes = [
    "No corras detrás del billete. Controlá el puto juego — la plata llega sola.",
    "La venganza es pa' calentones. La estrategia es de los que saben matar en frío.",
    "Cerrá la boca. El poder no presume, construye.",
    "Tu valor sube en cuanto dejas de ser el que todos usan.",
    "El más tranquilo del cuarto es el que termina enterrando a todos.",
    "No expliques ni mierda. Que los resultados les revienten la cara.",
    "El miedo es pa' los quebrados. Mente fría o te quedás atrás.",
    "¿Sentimientos? Que se jodan. Te cuestan todo.",
    "Cuidá tu energía como si fuera tu última bala.",
    "La lealtad no se mendiga. Se gana, o te largas.",
    "Que hablen. No les da la cabeza pa' entender lo que estás montando.",
    "El elefante no habla. Camina — y el suelo tiembla.",
    "El que no teme perder… ya lo perdió todo y volvió más cabrón.",
    "Controla tu mente o vas a ser su esclavo.",
    "Desapégate de este mundo de flojos. El poder real no se aferra a nada.",
    "No podés matar a quien ya abrazó su oscuridad.",
    "El dolor no es castigo. Es el precio, y vos sos el alumno.",
    "Rompe a un verdadero hombre y vuelve hecho una bestia.",
    "La quietud no es debilidad. Es la calma antes de romperle el cuello a alguien.",
    "El callado ya decidió cómo borrarte del mapa.",
    "El más duro no grita. Está levantando imperios en silencio.",
    "La incomodidad no es tu enemiga. Es tu entrenador, gonorrea.",
    "El poder se mueve en silencio, no en peleítas de barrio.",
    "Empiezan a respetarte cuando te vale verga.",
    "Sin sentimientos. Solo haz lo que toca.",
    "La disciplina es mandarle a callar la jeta a tus caprichos.",
    "Naciste lobo. Te entrenaron pa' portarte como perrito faldero.",
    "La jaula está abierta. Si no salís es porque sos blando.",
    "No conocés quién sos hasta que la vida te mete una patada en la jeta.",
    "Nadie viene, marica. Parate y movete ya.",
    "¿Tocaste fondo? Bien. Ya tenés piso pa' impulsarte.",
    "Obsesionate o seguí pobre y olvidado.",
    "\"Algún día\" es pa' los pendejos. Es hoy… o nunca.",
    "Los leones no discuten con ovejas. Se las comen.",
    "Los sueños no sirven si no currás. Así que dejá de soñar y metele duro.",
    "Los tiempos duros hacen monstruos. Los blandos, solo llorones.",
    "Si supieras lo letal que podés llegar a ser, dejás de dudar en seco."
  ];
  
  // English quotes - Mob Mentality with Class
  const englishQuotes = [
    "Don't chase money. Control the fuckin' board — the money's just a side effect.",
    "Revenge is for hotheads. Strategy is how real killers move.",
    "Shut your mouth. Power don't brag, it builds.",
    "Your value goes up the second you stop being everyone's bitch.",
    "The calmest motherfucker in the room is usually the one who buries bodies.",
    "Don't explain shit. Let your results slap 'em in the face.",
    "Fear is for the broke. Stay ice cold or stay behind.",
    "Feelings? Fuck feelings. They'll cost you everything.",
    "Protect your energy like it's your last damn bullet.",
    "Loyalty ain't begged for — you earn it or get the fuck out.",
    "Let 'em talk. They're too stupid to see what you're building.",
    "The elephant doesn't talk. It just walks — and the earth shakes.",
    "The man who fears nothing has already burned it all down once.",
    "Control your mind or it'll make you its bitch.",
    "Detach from this weak-ass world. Real power don't cling to shit.",
    "You can't kill what already embraced darkness.",
    "Pain ain't punishment. It's tuition, motherfucker.",
    "Break a man. Watch him rebuild stronger than you'll ever be.",
    "Stillness isn't weakness. It's the calm before you snap a neck.",
    "The quiet guy already figured out how to end you.",
    "The strongest ain't loud. They're busy building empires in the dark.",
    "Discomfort's not your enemy. It's your f*ckin' trainer.",
    "Power moves in silence. Not in arguments.",
    "They start respecting you the moment you stop giving a fuck.",
    "No feelings. Just get the job done.",
    "Discipline means telling your wants to shut the fuck up.",
    "You were born a wolf. They trained you to act like a poodle.",
    "The cage door's open. You stay in 'cause you're soft.",
    "You don't meet your real self 'til life kicks your ass.",
    "Nobody's coming, bro. Get the fuck up and move.",
    "Hitting rock bottom? Good. Now you got something solid to push off.",
    "Get obsessed or stay broke and forgotten.",
    "'Someday' is for suckers. It's day one or never.",
    "Lions don't argue with sheep. They eat 'em.",
    "Dreams don't work unless you do. So stop dreaming, start swinging.",
    "Tough times build monsters. Soft times build bitches.",
    "If you had any clue how dangerous you could be, you'd stop doubting real quick."
  ];
  
  // Select quotes based on language
  const quotes = selectedLanguage === 'es' ? spanishQuotes : englishQuotes;
  
  // Get a random quote
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];
  
  // Return a more robust quote object with language info and HTML version
  // This will highlight key words in the quote for emphasis
  const highlightedHtml = randomQuote.replace(
    /(power|control|mind|strategy|bitch|fuck|poder|mente|estrategia|control)/gi, 
    '<span class="text-white font-bold text-[115%]">$1</span>'
  );
  
  return {
    text: randomQuote,
    language: selectedLanguage,
    html: highlightedHtml
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
