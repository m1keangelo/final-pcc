
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Flag } from "lucide-react";
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
            <Flag fill="#FFD700" stroke="none" className="text-yellow-900" />
          </>
        ) : (
          <>
            <span>English</span>
            <Flag fill="#3C3B6E" stroke="none" className="text-white" />
          </>
        )}
      </Button>
    </div>
  );
};

export default LanguageToggle;
