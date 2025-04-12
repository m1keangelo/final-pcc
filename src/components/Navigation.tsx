
import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import LanguageToggle from "./LanguageToggle";
import { 
  User, 
  LogOut, 
  Home, 
  FileText, 
  Users, 
  BarChart, 
  Settings 
} from "lucide-react";

const Navigation = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  // Check if user is a super admin
  const isSuperAdmin = user?.username === "admin" || user?.email === "m1keangelo@icloud.com";
  
  return (
    <nav className="flex flex-col justify-between h-full py-6 bg-[#333] text-white sidebar-menu">
      <div className="space-y-1">
        <NavItem href="/" icon={<Home size={20} />} label={t('nav.home')} />
        <NavItem href="/form" icon={<FileText size={20} />} label={t('nav.form')} />
        <NavItem href="/clients" icon={<Users size={20} />} label={t('nav.clients')} />
        <NavItem href="/analytics" icon={<BarChart size={20} />} label={t('nav.analytics')} />
        
        {isSuperAdmin && (
          <NavItem href="/admin" icon={<Settings size={20} />} label="Admin" />
        )}
      </div>
      
      <div className="space-y-4 px-2">
        <LanguageToggle />
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-[#444] hover:text-white"
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
        
        <div className="flex items-center gap-3 px-2 py-1.5 text-sm text-white/80">
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
            `flex items-center gap-3 px-4 py-2.5 transition-colors ${
              isActive
                ? "bg-[#666] text-white font-semibold border-l-3 border-[#00BFFF] active"
                : "text-white hover:bg-[#444]"
            }`
          }
        >
          <span className="opacity-90">{icon}</span>
          <span className="text-[15px]">{label}</span>
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default Navigation;
