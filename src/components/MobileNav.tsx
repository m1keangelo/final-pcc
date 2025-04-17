
import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Navigation from "./Navigation";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "./LanguageToggle";

const MobileNav = () => {
  const [open, setOpen] = useState(false);
  const { t } = useLanguage();
  
  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button 
            variant="outline" 
            size="icon" 
            className="md:hidden fixed top-4 left-4 z-40 h-10 w-10 bg-black/50 border-purple-400/30"
          >
            <Menu size={20} />
            <span className="sr-only">{t('nav.menu')}</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <Navigation />
        </SheetContent>
      </Sheet>
      
      {/* Show language toggle in header for mobile */}
      <div className="md:hidden fixed top-4 right-4 z-40">
        <LanguageToggle />
      </div>
    </>
  );
};

export default MobileNav;
