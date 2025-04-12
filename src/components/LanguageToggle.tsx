
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
            <span>US</span>
            <Flag className="text-blue-600 fill-blue-100" />
          </>
        ) : (
          <>
            <span>CO</span>
            <Flag className="text-yellow-500 fill-yellow-100" />
          </>
        )}
      </Button>
    </div>
  );
};

export default LanguageToggle;

