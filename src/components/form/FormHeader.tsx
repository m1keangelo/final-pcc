
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const FormHeader: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold mb-3 text-foreground bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-purple-500 dark:from-purple-400 dark:to-purple-600">
        {t('form.title')}
      </h1>
      <p className="text-xl text-muted-foreground">
        {t('form.subtitle')}
      </p>
    </div>
  );
};

export default FormHeader;
