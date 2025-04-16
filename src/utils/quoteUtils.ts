interface Quote {
  en: string;
  es: string;
}

// Array of quote pairs (English and Spanish versions)
const quotes: Quote[] = [
  {
    en: "Don't chase money. Control the fuckin' board — the money's just a side effect.",
    es: "No corras detrás del billete. Controlá el puto juego — la plata llega sola."
  },
  {
    en: "Revenge is for hotheads. Strategy is how real killers move.",
    es: "La venganza es pa' calentones. La estrategia es de los que saben matar en frío."
  },
  {
    en: "Shut your mouth. Power don't brag, it builds.",
    es: "Cerrá la boca. El poder no presume, construye."
  },
  {
    en: "Your value goes up the second you stop being everyone's bitch.",
    es: "Tu valor sube en cuanto dejas de ser el que todos usan."
  },
  {
    en: "The calmest motherfucker in the room is usually the one who buries bodies.",
    es: "El más tranquilo del cuarto es el que termina enterrando a todos."
  },
  {
    en: "Don't explain shit. Let your results slap 'em in the face.",
    es: "No expliques ni mierda. Que los resultados les revienten la cara."
  },
  {
    en: "Fear is for the broke. Stay ice cold or stay behind.",
    es: "El miedo es pa' los quebrados. Mente fría o te quedás atrás."
  },
  {
    en: "Feelings? Fuck feelings. They'll cost you everything.",
    es: "¿Sentimientos? Que se jodan. Te cuestan todo."
  },
  {
    en: "Protect your energy like it's your last damn bullet.",
    es: "Cuidá tu energía como si fuera tu última bala."
  },
  {
    en: "Loyalty ain't begged for — you earn it or get the fuck out.",
    es: "La lealtad no se mendiga. Se gana, o te largas."
  },
  {
    en: "Let 'em talk. They're too stupid to see what you're building.",
    es: "Que hablen. No les da la cabeza pa' entender lo que estás montando."
  },
  {
    en: "The elephant doesn't talk. It just walks — and the earth shakes.",
    es: "El elefante no habla. Camina — y el suelo tiembla."
  },
  {
    en: "The man who fears nothing has already burned it all down once.",
    es: "El que no teme perder… ya lo perdió todo y volvió más cabrón."
  },
  {
    en: "Control your mind or it'll make you its bitch.",
    es: "Controla tu mente o vas a ser su esclavo."
  },
  {
    en: "Detach from this weak-ass world. Real power don't cling to shit.",
    es: "Desapégate de este mundo de flojos. El poder real no se aferra a nada."
  },
  {
    en: "You can't kill what already embraced darkness.",
    es: "No podés matar a quien ya abrazó su oscuridad."
  },
  {
    en: "Pain ain't punishment. It's tuition, motherfucker.",
    es: "El dolor no es castigo. Es el precio, y vos sos el alumno."
  },
  {
    en: "Break a man. Watch him rebuild stronger than you'll ever be.",
    es: "Rompe a un verdadero hombre y vuelve hecho una bestia."
  },
  {
    en: "Stillness isn't weakness. It's the calm before you snap a neck.",
    es: "La quietud no es debilidad. Es la calma antes de romperle el cuello a alguien."
  },
  {
    en: "The quiet guy already figured out how to end you.",
    es: "El callado ya decidió cómo borrarte del mapa."
  },
  {
    en: "The strongest ain't loud. They're busy building empires in the dark.",
    es: "El más duro no grita. Está levantando imperios en silencio."
  },
  {
    en: "Discomfort's not your enemy. It's your f*ckin' trainer.",
    es: "La incomodidad no es tu enemiga. Es tu entrenador, gonorrea."
  },
  {
    en: "Power moves in silence. Not in arguments.",
    es: "El poder se mueve en silencio, no en peleítas de barrio."
  },
  {
    en: "They start respecting you the moment you stop giving a fuck.",
    es: "Empiezan a respetarte cuando te vale verga."
  },
  {
    en: "No feelings. Just get the job done.",
    es: "Sin sentimientos. Solo haz lo que toca."
  },
  {
    en: "Discipline means telling your wants to shut the fuck up.",
    es: "La disciplina es mandarle a callar la jeta a tus caprichos."
  },
  {
    en: "You were born a wolf. They trained you to act like a poodle.",
    es: "Naciste lobo. Te entrenaron pa' portarte como perrito faldero."
  },
  {
    en: "The cage door's open. You stay in 'cause you're soft.",
    es: "La jaula está abierta. Si no salís es porque sos blando."
  },
  {
    en: "You don't meet your real self 'til life kicks your ass.",
    es: "No conocés quién sos hasta que la vida te mete una patada en la jeta."
  },
  {
    en: "Nobody's coming, bro. Get the fuck up and move.",
    es: "Nadie viene, marica. Parate y movete ya."
  },
  {
    en: "Hitting rock bottom? Good. Now you got something solid to push off.",
    es: "¿Tocaste fondo? Bien. Ya tenés piso pa' impulsarte."
  },
  {
    en: "Get obsessed or stay broke and forgotten.",
    es: "Obsesionate o seguí pobre y olvidado."
  },
  {
    en: "'Someday' is for suckers. It's day one or never.",
    es: "Algún día es pa' los pendejos. Es hoy… o nunca."
  },
  {
    en: "Lions don't argue with sheep. They eat 'em.",
    es: "Los leones no discuten con ovejas. Se las comen."
  },
  {
    en: "Dreams don't work unless you do. So stop dreaming, start swinging.",
    es: "Los sueños no sirven si no currás. Así que dejá de soñar y metele duro."
  },
  {
    en: "Tough times build monsters. Soft times build bitches.",
    es: "Los tiempos duros hacen monstruos. Los blandos, solo llorones."
  },
  {
    en: "If you had any clue how dangerous you could be, you'd stop doubting real quick.",
    es: "Si supieras lo letal que podés llegar a ser, dejás de dudar en seco."
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
const getBrowserLanguage = (): string => {
  const language = navigator.language || (navigator as any).userLanguage;
  return language.split('-')[0].toLowerCase();
};

/**
 * Determines which language to use based on location and browser settings
 * @returns Promise<string> - 'en' or 'es'
 */
const determineLanguageToUse = async (): Promise<string> => {
  const browserLanguage = getBrowserLanguage();
  const inLatinAmerica = await isInLatinAmerica();
  
  // If browser is set to English, use English regardless of location
  if (browserLanguage === 'en') {
    return 'en';
  }
  
  // If in Latin America or browser is set to Spanish, use Spanish
  if (inLatinAmerica || browserLanguage === 'es') {
    return 'es';
  }
  
  // Default to English
  return 'en';
};

/**
 * Gets a random quote in the appropriate language
 * @returns Promise<{text: string, language: string}>
 */
export const getRandomQuote = async (): Promise<{text: string, language: string}> => {
  // Select a random quote from the array
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  
  // Determine which language to use
  const languageToUse = await determineLanguageToUse();
  
  return {
    text: quote[languageToUse as keyof Quote],
    language: languageToUse
  };
};
