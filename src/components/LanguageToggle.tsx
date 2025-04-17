
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { ReactNode } from "react";
import { useToast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";

type LanguageToggleProps = {
  className?: string;
  children?: ReactNode;
};

const LanguageToggle = ({ className, children }: LanguageToggleProps) => {
  const { language, setLanguage } = useLanguage();
  const { toast } = useToast();
  const isMobile = useIsMobile();

  const handleLanguageToggle = () => {
    const newLanguage = language === 'en' ? 'es' : 'en';
    setLanguage(newLanguage);
    
    // Show a toast notification when language changes
    toast({
      title: newLanguage === 'en' ? 'Language Changed' : 'Idioma Cambiado',
      description: newLanguage === 'en' ? 'Application language set to English' : 'Idioma de la aplicación establecido a Español',
      duration: 2000,
    });
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {children}
      <Button
        onClick={handleLanguageToggle}
        variant="outline"
        size="sm"
        className="flex items-center gap-1 bg-[#2a2a3a] border-[#4a4a5a] hover:bg-[#3a3a4a] text-gray-200 h-8 px-2"
        title={language === 'en' ? "Cambiar a español" : "Switch to English"}
      >
        <Globe size={14} className="mr-1" />
        {isMobile ? (
          <span>{language === 'en' ? "ES" : "EN"}</span>
        ) : (
          <span>{language === 'en' ? "Español" : "English"}</span>
        )}
      </Button>
    </div>
  );
};

export default LanguageToggle;
