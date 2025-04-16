import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from "@/contexts/LanguageContext";

type Quote = {
  en: string;
  es: string;
};

const quotes: Quote[] = [
  {
    en: "Don't chase money. Chase control — money follows.",
    es: "No persigas el dinero. Persigue el control — el dinero llega solo."
  },
  {
    en: "Revenge is emotion. Strategy is power.",
    es: "La venganza es emoción. La estrategia es poder."
  },
  {
    en: "Not everything needs to be said. Power grows in silence.",
    es: "No todo se dice. El poder crece en silencio."
  },
  {
    en: "Never let your next move be predictable.",
    es: "Nunca dejes que tu próximo paso sea predecible."
  },
  {
    en: "Your value increases when you stop being available to everyone.",
    es: "Tu valor sube cuando dejas de estar disponible para todos."
  },
  {
    en: "In the real world, the calmest man in the room wins.",
    es: "En el mundo real, gana el más tranquilo del cuarto."
  },
  {
    en: "Don't explain. Results are louder than words.",
    es: "No expliques. Los resultados hablan más fuerte que las palabras."
  },
  {
    en: "Move like a ghost, but think like a king.",
    es: "Muévete como un fantasma, pero piensa como un rey."
  },
  {
    en: "The game rewards those who play long-term.",
    es: "El juego premia a quien juega a largo plazo."
  },
  {
    en: "Fear kills ambition. Train your mind to stay cold.",
    es: "El miedo mata la ambición. Entrena tu mente para mantenerse fría."
  },
  {
    en: "Weak emotions cost strong positions.",
    es: "Las emociones débiles cuestan posiciones fuertes."
  },
  {
    en: "Reputation builds empires faster than money.",
    es: "La reputación construye imperios más rápido que el dinero."
  },
  {
    en: "Protect your energy like it's your last bullet.",
    es: "Protege tu energía como si fuera tu última bala."
  },
  {
    en: "Most losses in life come from overreacting.",
    es: "La mayoría de las pérdidas en la vida vienen por reaccionar de más."
  },
  {
    en: "If you want loyalty, build it. Don't beg for it.",
    es: "Si quieres lealtad, constrúyela. No la mendigues."
  },
  {
    en: "You don't need more time. You need more focus.",
    es: "No necesitas más tiempo. Necesitas más enfoque."
  },
  {
    en: "Let them talk. You're building what they can't understand.",
    es: "Que hablen. Tú estás construyendo lo que ellos no entienden."
  },
  {
    en: "Discipline eats motivation for breakfast.",
    es: "La disciplina se desayuna la motivación."
  },
  {
    en: "Never argue with a fool. It confuses the audience.",
    es: "Nunca discutas con un tonto. Confunde a la audiencia."
  },
  {
    en: "Power isn't loud. It's presence, precision, and patience.",
    es: "El poder no hace ruido. Es presencia, precisión y paciencia."
  }
];

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  const { language } = useLanguage();
  const [randomQuote] = useState(() => quotes[Math.floor(Math.random() * quotes.length)]);

  useEffect(() => {
    const timer = setTimeout(onComplete, 9000); // 9 seconds
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black gap-8"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#9b87f5] px-4 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        Fuck Mediocrity,<br />
        Unleashing Bold Real Estate<br />
        Marketing Power!
      </motion.h1>

      <motion.p 
        className="text-xl md:text-2xl lg:text-3xl font-medium text-[#FEF7CD] px-4 text-center mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        {language === 'es' ? randomQuote.es : randomQuote.en}
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;
