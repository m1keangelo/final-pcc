
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500); // 2.5 seconds total
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ 
          scale: [0.8, 1.2, 1],
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 2,
          times: [0, 0.3, 0.5, 1],
          ease: "easeInOut"
        }}
        className="text-center"
      >
        <motion.h1 
          className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#9b87f5] px-4"
          animate={{
            textShadow: [
              "0 0 7px #9b87f5",
              "0 0 10px #9b87f5",
              "0 0 15px #9b87f5",
              "0 0 7px #9b87f5"
            ]
          }}
          transition={{
            duration: 2,
            repeat: 0
          }}
        >
          Fuck Mediocrity,<br />
          Unleashing Bold Real Estate<br />
          Marketing Power!
        </motion.h1>
      </motion.div>
    </motion.div>
  );
};

export default SplashScreen;
