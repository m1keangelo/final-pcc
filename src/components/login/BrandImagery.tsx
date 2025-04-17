
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import RotatingMascot from './RotatingMascot';

const BrandImagery = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full h-full flex items-center justify-center p-6 relative">
      <RotatingMascot />
    </div>
  );
};

export default BrandImagery;
