
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const FormHeader: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-5xl font-bold mb-4 text-balance text-gradient">
        {t('form.title')}
      </h1>
      <p className="text-xl text-muted-foreground leading-relaxed tracking-wide">
        {t('form.subtitle')}
      </p>
    </div>
  );
};

export default FormHeader;
