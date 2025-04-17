
import { ReactNode } from "react";
import Navigation from "./Navigation";
import MobileNav from "./MobileNav";
import { useAuth } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <LanguageProvider>
      <div className="flex h-screen bg-background">
        <div className="w-72 hidden md:block shadow-xl transition-all duration-300">
          <Navigation />
        </div>
        <div className="flex-1 overflow-auto">
          <MobileNav />
          <div className="container max-w-[1200px] mx-auto pt-16 md:pt-8 pb-6 md:py-10 px-4 md:px-6">
            {children}
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Layout;
