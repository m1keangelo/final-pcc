
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type LanguageToggleProps = {
  className?: string;
  children?: ReactNode;
};

const LanguageToggle = ({ className, children }: LanguageToggleProps) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {children}
      <Button
        onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
        variant="outline"
        size="sm"
        className="flex items-center gap-1"
      >
        {language === 'en' ? (
          <>
            <span>Español</span>
            <span className="text-lg">🇪🇸</span>
          </>
        ) : (
          <>
            <span>English</span>
            <span className="text-lg">🇺🇸</span>
          </>
        )}
      </Button>
    </div>
  );
};

export default LanguageToggle;
