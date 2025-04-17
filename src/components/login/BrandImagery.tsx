
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";

const BrandImagery = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full h-full hidden md:flex flex-col items-center justify-center p-6 relative">
      <div className="text-center mb-8 animate-fade-in">
        <h1 className="text-5xl font-bold mb-3 text-white font-display tracking-tight">
          Gallo <span className="text-gradient-gallo">Avión</span>
        </h1>
        <p className="text-xl text-white/70 max-w-lg">
          {t('language') === 'en' 
            ? 'Advanced platform for financial solutions and client management' 
            : 'Plataforma avanzada para soluciones financieras y gestión de clientes'}
        </p>
      </div>
      
      {/* Main Brand Image with enhanced effects */}
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-gallomodern-400 to-gallomodern-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
        <img 
          src="/lovable-uploads/b9619f78-7281-46a1-93d2-c7c8123e5e56.png" 
          alt="Gallo Avión Cyberpunk" 
          className="relative w-4/5 mx-auto object-contain rounded-xl shadow-2xl transform hover:scale-[1.02] transition-all duration-500 border border-gallomodern-500/30"
          style={{
            filter: "drop-shadow(0 0 25px rgba(105, 13, 172, 0.5))"
          }}
        />
      </div>
      
      <div className="absolute bottom-10 left-10 text-white/50 text-sm animate-fade-in">
        <p>© 2025 Gallo Avión. {t('language') === 'en' ? 'All rights reserved.' : 'Todos los derechos reservados.'}</p>
      </div>
    </div>
  );
};

export default BrandImagery;
