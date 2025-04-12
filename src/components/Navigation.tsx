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
  Settings,
  ChevronRight
} from "lucide-react";

const Navigation = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();

  // Check if user is a super admin
  const isSuperAdmin = user?.username === "admin" || user?.email === "m1keangelo@icloud.com";
  
  return (
    <nav className="flex flex-col justify-between h-full py-6 sidebar-menu" role="navigation" aria-label="Main Navigation">
      <div className="space-y-1">
        <NavItem href="/" icon={<Home size={20} />} label={t('nav.home')} aria-label={t('nav.home')} />
        <NavItem href="/form" icon={<FileText size={20} />} label={t('nav.form')} aria-label={t('nav.form')} />
        <NavItem href="/clients" icon={<Users size={20} />} label={t('nav.clients')} aria-label={t('nav.clients')} />
        <NavItem href="/analytics" icon={<BarChart size={20} />} label={t('nav.analytics')} aria-label={t('nav.analytics')} />
        
        {isSuperAdmin && (
          <NavItem href="/admin" icon={<Settings size={20} />} label="Admin" aria-label="Admin" />
        )}
      </div>
      
      <div className="space-y-4 px-4">
        <LanguageToggle />
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-[#4A4E69] hover:text-[#9AEDFE] transition-all duration-300"
                onClick={logout}
                aria-label={t('nav.logout')}
              >
                <LogOut className="mr-3 h-5 w-5 text-[#6272A4]" />
                <span className="text-[15px]">{t('nav.logout')}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t('nav.logout')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex items-center gap-3 px-3 py-2 mt-2 border-t border-[#44475A] text-sm text-white/80">
          <User size={16} className="text-[#6272A4]" />
          <span className="font-medium text-[15px]">{user?.name}</span>
        </div>
      </div>
    </nav>
  );
};

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  'aria-label'?: string;
}

const NavItem = ({ href, icon, label, ...props }: NavItemProps) => (
  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <NavLink
          to={href}
          className={({ isActive }) =>
            `flex items-center gap-3 px-4 py-3 transition-all duration-300 rounded-sm ${
              isActive
                ? "active"
                : ""
            }`
          }
          {...props}
        >
          <span className="text-[#6272A4] group-hover:text-[#9AEDFE]">{icon}</span>
          <span className="text-[15px] font-medium">{label}</span>
          <ChevronRight size={16} className="ml-auto opacity-0 group-hover:opacity-100 text-[#6272A4] transition-opacity" />
        </NavLink>
      </TooltipTrigger>
      <TooltipContent side="right">
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
);

export default Navigation;
