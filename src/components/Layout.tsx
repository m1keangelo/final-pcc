
import { ReactNode } from "react";
import Navigation from "./Navigation";
import MobileNav from "./MobileNav";
import { useAuth } from "@/contexts/AuthContext";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { user } = useAuth();

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen bg-background">
      <div className="w-60 hidden md:block border-r border-border">
        <Navigation />
      </div>
      <div className="flex-1 overflow-auto">
        <MobileNav />
        <div className="container py-6 md:py-10">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
