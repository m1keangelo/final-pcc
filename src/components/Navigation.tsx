
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import LanguageToggle from "./LanguageToggle";
import { User, LogOut, Home, FileText, Users, BarChart, Settings } from "lucide-react";

const Navigation = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  // Check if user is a super admin
  const isSuperAdmin = user?.username === "admin" || user?.email === "m1keangelo@icloud.com";
  
  return (
    <nav className="flex flex-col justify-between h-full py-6">
      <div className="space-y-1">
        <NavItem href="/" icon={<Home size={18} />} label={t('nav.home')} />
        <NavItem href="/form" icon={<FileText size={18} />} label={t('nav.form')} />
        <NavItem href="/clients" icon={<Users size={18} />} label={t('nav.clients')} />
        <NavItem href="/analytics" icon={<BarChart size={18} />} label={t('nav.analytics')} />
        
        {isSuperAdmin && (
          <NavItem href="/admin" icon={<Settings size={18} />} label="Admin" />
        )}
      </div>
      
      <div className="space-y-4 px-2">
        <LanguageToggle />
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-muted-foreground hover:text-foreground"
                onClick={logout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('nav.logout')}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t('nav.logout')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex items-center gap-3 px-2 py-1.5 text-sm text-muted-foreground">
          <User size={16} />
          <span className="font-medium">{user?.name}</span>
        </div>
      </div>
    </nav>
  );
};

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
}

const NavItem = ({ href, icon, label }: NavItemProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <NavLink
          to={href}
          className={({ isActive }) =>
            `flex items-center py-2 px-3 rounded-md transition-colors ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            }`
          }
        >
          <span className="mr-2">{icon}</span>
          <span>{label}</span>
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default Navigation;
