interface Quote {
  en: string;
  es: string;
  badWords?: {
    en: string[];
    es: string[];
  };
}

// Array of quote pairs (English and Spanish versions)
const quotes: Quote[] = [
  {
    en: "Don't chase money. Control the fuckin' board — the money's just a side effect.",
    es: "No corras detrás del billete. Controlá el puto juego — la plata llega sola.",
    badWords: {
      en: ["fuckin'"],
      es: ["puto"]
    }
  },
  {
    en: "Revenge is for hotheads. Strategy is how real killers move.",
    es: "La venganza es pa' calentones. La estrategia es de los que saben matar en frío.",
    badWords: {
      en: ["killers"],
      es: ["matar"]
    }
  },
  {
    en: "Shut your mouth. Power don't brag, it builds.",
    es: "Cerrá la boca. El poder no presume, construye.",
    badWords: {
      en: [],
      es: []
    }
  },
  {
    en: "Your value goes up the second you stop being everyone's bitch.",
    es: "Tu valor sube en cuanto dejas de ser el que todos usan.",
    badWords: {
      en: ["bitch"],
      es: []
    }
  },
  {
    en: "The calmest motherfucker in the room is usually the one who buries bodies.",
    es: "El más tranquilo del cuarto es el que termina enterrando a todos.",
    badWords: {
      en: ["motherfucker"],
      es: []
    }
  },
  {
    en: "Don't explain shit. Let your results slap 'em in the face.",
    es: "No expliques ni mierda. Que los resultados les revienten la cara.",
    badWords: {
      en: ["shit"],
      es: ["mierda"]
    }
  },
  {
    en: "Fear is for the broke. Stay ice cold or stay behind.",
    es: "El miedo es pa' los quebrados. Mente fría o te quedás atrás.",
    badWords: {
      en: [],
      es: []
    }
  },
  {
    en: "Feelings? Fuck feelings. They'll cost you everything.",
    es: "¿Sentimientos? Que se jodan. Te cuestan todo.",
    badWords: {
      en: ["Fuck"],
      es: ["jodan"]
    }
  },
  {
    en: "Protect your energy like it's your last damn bullet.",
    es: "Cuidá tu energía como si fuera tu última bala.",
    badWords: {
      en: ["damn"],
      es: []
    }
  },
  {
    en: "Loyalty ain't begged for — you earn it or get the fuck out.",
    es: "La lealtad no se mendiga. Se gana, o te largas.",
    badWords: {
      en: ["fuck"],
      es: []
    }
  },
  {
    en: "Let 'em talk. They're too stupid to see what you're building.",
    es: "Que hablen. No les da la cabeza pa' entender lo que estás montando.",
    badWords: {
      en: ["stupid"],
      es: []
    }
  },
  {
    en: "The elephant doesn't talk. It just walks — and the earth shakes.",
    es: "El elefante no habla. Camina — y el suelo tiembla.",
    badWords: {
      en: [],
      es: []
    }
  },
  {
    en: "The man who fears nothing has already burned it all down once.",
    es: "El que no teme perder… ya lo perdió todo y volvió más cabrón.",
    badWords: {
      en: [],
      es: ["cabrón"]
    }
  },
  {
    en: "Control your mind or it'll make you its bitch.",
    es: "Controla tu mente o vas a ser su esclavo.",
    badWords: {
      en: ["bitch"],
      es: []
    }
  },
  {
    en: "Detach from this weak-ass world. Real power don't cling to shit.",
    es: "Desapégate de este mundo de flojos. El poder real no se aferra a nada.",
    badWords: {
      en: ["ass", "shit"],
      es: []
    }
  },
  {
    en: "You can't kill what already embraced darkness.",
    es: "No podés matar a quien ya abrazó su oscuridad.",
    badWords: {
      en: ["kill"],
      es: ["matar"]
    }
  },
  {
    en: "Pain ain't punishment. It's tuition, motherfucker.",
    es: "El dolor no es castigo. Es el precio, y vos sos el alumno.",
    badWords: {
      en: ["motherfucker"],
      es: []
    }
  },
  {
    en: "Break a man. Watch him rebuild stronger than you'll ever be.",
    es: "Rompe a un verdadero hombre y vuelve hecho una bestia.",
    badWords: {
      en: [],
      es: []
    }
  },
  {
    en: "Stillness isn't weakness. It's the calm before you snap a neck.",
    es: "La quietud no es debilidad. Es la calma antes de romperle el cuello a alguien.",
    badWords: {
      en: ["snap a neck"],
      es: ["romperle el cuello"]
    }
  },
  {
    en: "The quiet guy already figured out how to end you.",
    es: "El callado ya decidió cómo borrarte del mapa.",
    badWords: {
      en: ["end you"],
      es: ["borrarte"]
    }
  },
  {
    en: "The strongest ain't loud. They're busy building empires in the dark.",
    es: "El más duro no grita. Está levantando imperios en silencio.",
    badWords: {
      en: [],
      es: []
    }
  },
  {
    en: "Discomfort's not your enemy. It's your f*ckin' trainer.",
    es: "La incomodidad no es tu enemiga. Es tu entrenador, gonorrea.",
    badWords: {
      en: ["Discomfort", "trainer"],
      es: ["incomodidad", "entrenador"]
    }
  },
  {
    en: "Power moves in silence. Not in arguments.",
    es: "El poder se mueve en silencio, no en peleítas de barrio.",
    badWords: {
      en: ["Power moves", "silence"],
      es: ["poder", "silencio"]
    }
  },
  {
    en: "They start respecting you the moment you stop giving a fuck.",
    es: "Empiezan a respetarte cuando te vale verga.",
    badWords: {
      en: ["respecting", "stop giving a fuck"],
      es: ["respetarte", "vale verga"]
    }
  },
  {
    en: "No feelings. Just get the job done.",
    es: "Sin sentimientos. Solo haz lo que toca.",
    badWords: {
      en: ["get the job done"],
      es: ["haz lo que toca"]
    }
  },
  {
    en: "Discipline means telling your wants to shut the fuck up.",
    es: "La disciplina es mandarle a callar la jeta a tus caprichos.",
    badWords: {
      en: ["Discipline", "shut the fuck up"],
      es: ["disciplina", "callar la jeta"]
    }
  },
  {
    en: "You were born a wolf. They trained you to act like a poodle.",
    es: "Naciste lobo. Te entrenaron pa' portarte como perrito faldero.",
    badWords: {
      en: ["wolf", "poodle"],
      es: ["lobo", "perrito faldero"]
    }
  },
  {
    en: "The cage door's open. You stay in 'cause you're soft.",
    es: "La jaula está abierta. Si no salís es porque sos blando.",
    badWords: {
      en: ["cage door's open", "soft"],
      es: ["jaula", "blando"]
    }
  },
  {
    en: "You don't meet your real self 'til life kicks your ass.",
    es: "No conocés quién sos hasta que la vida te mete una patada en la jeta.",
    badWords: {
      en: ["real self", "kicks your ass"],
      es: ["quién sos", "patada en la jeta"]
    }
  },
  {
    en: "Nobody's coming, bro. Get the fuck up and move.",
    es: "Nadie viene, marica. Parate y movete ya.",
    badWords: {
      en: ["Get the fuck up", "move"],
      es: ["Parate", "movete"]
    }
  },
  {
    en: "Hitting rock bottom? Good. Now you got something solid to push off.",
    es: "¿Tocaste fondo? Bien. Ya tenés piso pa' impulsarte.",
    badWords: {
      en: ["rock bottom", "push off"],
      es: ["Tocaste fondo", "impulsarte"]
    }
  },
  {
    en: "Get obsessed or stay broke and forgotten.",
    es: "Obsesionate o seguí pobre y olvidado.",
    badWords: {
      en: ["obsessed", "forgotten"],
      es: ["Obsesionate", "olvidado"]
    }
  },
  {
    en: "'Someday' is for suckers. It's day one or never.",
    es: "Algún día es pa' los pendejos. Es hoy… o nunca.",
    badWords: {
      en: ["day one", "never"],
      es: ["hoy", "nunca"]
    }
  },
  {
    en: "Lions don't argue with sheep. They eat 'em.",
    es: "Los leones no discuten con ovejas. Se las comen.",
    badWords: {
      en: ["Lions", "eat"],
      es: ["leones", "comen"]
    }
  },
  {
    en: "Dreams don't work unless you do. So stop dreaming, start swinging.",
    es: "Los sueños no sirven si no currás. Así que dejá de soñar y metele duro.",
    badWords: {
      en: ["work", "swinging"],
      es: ["currás", "metele duro"]
    }
  },
  {
    en: "Tough times build monsters. Soft times build bitches.",
    es: "Los tiempos duros hacen monstruos. Los blandos, solo llorones.",
    badWords: {
      en: ["monsters", "bitches"],
      es: ["monstruos", "llorones"]
    }
  },
  {
    en: "If you had any clue how dangerous you could be, you'd stop doubting real quick.",
    es: "Si supieras lo letal que podés llegar a ser, dejás de dudar en seco.",
    badWords: {
      en: ["dangerous", "stop doubting"],
      es: ["letal", "dejás de dudar"]
    }
  }
];

/**
 * Detects if the user is in a Latin American country based on their IP
 * @returns Promise<boolean>
 */
const isInLatinAmerica = async (): Promise<boolean> => {
  try {
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    
    // List of Latin American country codes
    const latinAmericanCountries = [
      'AR', 'BO', 'BR', 'CL', 'CO', 'CR', 'CU', 'DO', 
      'EC', 'SV', 'GT', 'HT', 'HN', 'MX', 'NI', 'PA', 
      'PY', 'PE', 'PR', 'UY', 'VE'
    ];
    
    return latinAmericanCountries.includes(data.country_code);
  } catch (error) {
    console.error('Error detecting location:', error);
    return false;
  }
};

/**
 * Gets the user's browser language
 * @returns string - 'en', 'es', or other language code
 */
export const getBrowserLanguage = (): string => {
  const language = navigator.language || (navigator as any).userLanguage;
  return language.split('-')[0].toLowerCase();
};

// For testing: override language detection behavior
let forceLanguage: string | null = null;

/**
 * Forces a specific language for testing purposes
 * @param lang Language code to force ('en', 'es', or null to reset)
 */
export const forceLanguageForTesting = (lang: 'en' | 'es' | null): void => {
  console.log(`🧪 Testing override: forcing language to ${lang || 'RESET'}`);
  forceLanguage = lang;
};

/**
 * Determines which language to use based on location and browser settings
 * @returns Promise<string> - 'en' or 'es'
 */
const determineLanguageToUse = async (): Promise<string> => {
  // If we have a forced language for testing, use that
  if (forceLanguage) {
    console.log(`🧪 Using forced language: ${forceLanguage}`);
    return forceLanguage;
  }
  
  const browserLanguage = getBrowserLanguage();
  const inLatinAmerica = await isInLatinAmerica();
  
  console.group('🌐 Language Detection Diagnostics');
  console.log('Browser Language:', browserLanguage);
  console.log('In Latin America:', inLatinAmerica);
  
  let selectedLanguage = 'en'; // Default
  
  if (browserLanguage === 'en') {
    selectedLanguage = 'en';
    console.log('🇺🇸 Forcing English due to browser setting');
  } else if (inLatinAmerica || browserLanguage === 'es') {
    selectedLanguage = 'es';
    console.log('🇪🇸 Selecting Spanish (Location or Browser)');
  } else {
    console.log('🔄 Defaulting to English');
  }
  
  console.log('Selected Language:', selectedLanguage);
  console.groupEnd();
  
  return selectedLanguage;
};

/**
 * Highlights only bad words in a quote
 * @param text The quote text
 * @param badWords Array of bad words to highlight
 * @returns String with HTML for highlighted bad words
 */
const highlightBadWords = (text: string, badWords: string[] = []): string => {
  if (!badWords.length) return text;
  
  let processedText = text;
  badWords.forEach(word => {
    // Case-insensitive replace with HTML span
    const regex = new RegExp(`(${word})`, 'gi');
    processedText = processedText.replace(regex, '<span class="text-white font-bold">$1</span>');
  });
  
  return processedText;
};

/**
 * Validates that a specific quote has both English and Spanish versions
 * @param quoteIndex Index of the quote in the quotes array
 * @returns Boolean indicating whether the quote is valid
 */
export const validateQuote = (quoteIndex: number): boolean => {
  if (quoteIndex < 0 || quoteIndex >= quotes.length) {
    console.error(`❌ Quote validation failed: Index ${quoteIndex} out of bounds`);
    return false;
  }
  
  const quote = quotes[quoteIndex];
  const isValid = Boolean(quote.en && quote.es);
  
  console.group(`Quote #${quoteIndex} Validation`);
  console.log('English version:', quote.en ? '✅ Present' : '❌ Missing');
  console.log('Spanish version:', quote.es ? '✅ Present' : '❌ Missing');
  console.log('Overall validity:', isValid ? '✅ Valid' : '❌ Invalid');
  console.groupEnd();
  
  return isValid;
};

/**
 * Validates all quotes to ensure they have both English and Spanish versions
 * @returns Number of invalid quotes found
 */
export const validateAllQuotes = (): number => {
  console.group('🔍 Validating All Quotes');
  
  let invalidCount = 0;
  quotes.forEach((quote, index) => {
    if (!quote.en || !quote.es) {
      console.error(`❌ Quote #${index} is missing translation`);
      invalidCount++;
    }
  });
  
  console.log(`📊 Validation complete: ${quotes.length - invalidCount}/${quotes.length} quotes valid`);
  console.groupEnd();
  
  return invalidCount;
};

/**
 * Gets a specific quote by index in the appropriate language
 * Useful for testing specific quotes
 * @param index Index of the quote to get
 * @param forceLang Optional language override
 * @returns Promise<{text: string, language: string, html: string}>
 */
export const getQuoteByIndex = async (
  index: number, 
  forceLang?: 'en' | 'es'
): Promise<{text: string, language: string, html: string}> => {
  if (index < 0 || index >= quotes.length) {
    throw new Error(`Quote index ${index} out of bounds`);
  }
  
  const quote = quotes[index];
  const languageToUse = forceLang || await determineLanguageToUse();
  
  const text = quote[languageToUse as keyof Quote] as string;
  const badWordsToHighlight = quote.badWords?.[languageToUse as 'en' | 'es'] || [];
  const html = highlightBadWords(text, badWordsToHighlight);
  
  return {
    text,
    language: languageToUse,
    html
  };
};

/**
 * Gets a random quote in the appropriate language with highlighted words
 * @returns Promise<{text: string, language: string, html: string}>
 */
export const getRandomQuote = async (): Promise<{text: string, language: string, html: string}> => {
  // Select a random quote from the array
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  
  // Determine which language to use
  const languageToUse = await determineLanguageToUse();
  
  console.log('Language Detection Debug:', {
    browserLanguage: getBrowserLanguage(),
    isInLatinAmerica: await isInLatinAmerica(),
    selectedLanguage: languageToUse,
    quoteIndex: randomIndex
  });

  // Get the appropriate text for the language
  const text = quote[languageToUse as keyof Quote] as string;
  
  // Get any bad words if they exist
  const badWordsToHighlight = quote.badWords?.[languageToUse as 'en' | 'es'] || [];
  
  // Create HTML version with highlighted bad words
  const html = highlightBadWords(text, badWordsToHighlight);
  
  console.log('Quote Debug:', {
    originalQuote: quote,
    selectedText: text,
    highlightedHtml: html
  });

  return {
    text,
    language: languageToUse,
    html
  };
};
