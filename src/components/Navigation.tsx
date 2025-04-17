
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import LanguageToggle from "./LanguageToggle";
import BugReportDialog from "./BugReportDialog";
import SuggestionDialog from "./SuggestionDialog";
import { 
  User, 
  LogOut, 
  Home, 
  FileText, 
  Users, 
  BarChart, 
  Settings,
  ChevronRight,
  BugOff,
  MessageSquarePlus
} from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator } from "@/components/ui/sidebar";
import { useIsMobile } from "@/hooks/use-mobile";

const Navigation = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [isBugReportOpen, setIsBugReportOpen] = useState(false);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const isMobile = useIsMobile();
  
  // Check if user is a super admin
  const isSuperAdmin = user?.username === "admin" || user?.email === "m1keangelo@icloud.com";
  
  return (
    <nav 
      className="flex flex-col justify-between h-full py-6 bg-[#490c7c]/30 transition-all duration-300 sidebar-menu" 
      role="navigation" 
      aria-label="Main Navigation"
    >
      <div className="space-y-2">
        <div className="px-3 py-2 mb-4 text-center">
          <h2 className="text-xl font-bold text-white">GalloAvión Hub</h2>
        </div>
        
        <SidebarMenu>
          <NavItem href="/" icon={<Home size={20} />} label={t('nav.home')} aria-label={t('nav.home')} />
          <NavItem href="/form" icon={<FileText size={20} />} label={t('nav.form')} aria-label={t('nav.form')} />
          <NavItem href="/clients" icon={<Users size={20} />} label={t('nav.clients')} aria-label={t('nav.clients')} />
          <NavItem href="/analytics" icon={<BarChart size={20} />} label={t('nav.analytics')} aria-label={t('nav.analytics')} />
          
          {isSuperAdmin && (
            <NavItem href="/admin" icon={<Settings size={20} />} label="Admin" aria-label="Admin" />
          )}
        </SidebarMenu>
      </div>
      
      <div className="mt-auto space-y-3">
        {/* Feedback section */}
        <div className="px-4 pt-4 border-t border-[#7a2dac]">
          <div className="flex flex-wrap items-center justify-center text-xs sm:text-sm space-x-2 mb-4">
            <button 
              className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 active:opacity-90"
              onClick={() => setIsBugReportOpen(true)}
              aria-label={t('nav.reportBug')}
            >
              {t('nav.reportBug')}
            </button>
            <div className="text-gray-500">|</div>
            <button 
              className="text-gray-400 hover:text-white hover:scale-110 transition-all duration-300 active:opacity-90"
              onClick={() => setIsSuggestionOpen(true)}
              aria-label={t('nav.suggestions')}
            >
              {t('nav.suggestions')}
            </button>
          </div>
          
          {/* Centered language toggle */}
          <div className="flex justify-center">
            <LanguageToggle />
          </div>
        </div>
        
        {/* User info and logout */}
        <div className="space-y-3 px-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className="w-full justify-start text-white hover:bg-[#7a2dac] hover:text-[#E0E0E0] transition-all duration-300 hover:shadow-md active:bg-[#5e0f99] active:scale-98 h-10"
                  onClick={logout}
                  aria-label={t('nav.logout')}
                >
                  <LogOut className="mr-2 h-5 w-5 text-[#9b87f5]" />
                  <span className="text-[14px] font-medium">{t('nav.logout')}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{t('nav.logout')}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <div className="flex items-center gap-2 px-3 py-2 border-t border-[#7a2dac] text-sm text-white/80">
            <User size={16} className="text-[#9b87f5]" />
            <span className="font-medium text-[14px] truncate">{user?.name}</span>
          </div>
        </div>
      </div>
      
      {/* Dialog components */}
      <BugReportDialog 
        isOpen={isBugReportOpen} 
        onClose={() => setIsBugReportOpen(false)} 
      />
      
      <SuggestionDialog 
        isOpen={isSuggestionOpen} 
        onClose={() => setIsSuggestionOpen(false)} 
      />
    </nav>
  );
};

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  secondary?: boolean;
  'aria-label'?: string;
}

const NavItem = ({ href, icon, label, secondary = false, ...props }: NavItemProps) => {
  const isMobile = useIsMobile();
  
  return (
    <SidebarMenuItem>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <SidebarMenuButton asChild tooltip={label}>
              <NavLink
                to={href}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-3 transition-all duration-300 rounded-sm group
                  ${isActive
                    ? "active bg-[#8c42dc] text-white border-l-3 border-white font-medium shadow-md"
                    : "text-white hover:bg-[#7a2dac] hover:text-[#E0E0E0] hover:shadow-md active:bg-[#5e0f99] active:scale-98"
                  } ${secondary ? "opacity-70 text-sm py-2" : ""}`
                }
                {...props}
              >
                <span className={`text-[#9b87f5] group-hover:text-white transition-colors duration-300 ${secondary ? "opacity-80" : ""}`}>{icon}</span>
                <span className={`${secondary ? "text-[13px]" : "text-[14px]"} font-medium truncate`}>{label}</span>
                <ChevronRight size={secondary ? 14 : 16} className="ml-auto opacity-0 group-hover:opacity-100 text-white/70 transition-all duration-300 transform group-hover:translate-x-1" />
                <span className="absolute left-0 top-0 bottom-0 w-1 bg-white scale-y-0 origin-bottom transition-transform duration-300 group-hover:scale-y-100"></span>
              </NavLink>
            </SidebarMenuButton>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </SidebarMenuItem>
  );
};

export default Navigation;
