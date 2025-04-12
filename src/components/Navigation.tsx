
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
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
  ChevronRight,
  BugOff,
  MessageSquarePlus
} from "lucide-react";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarSeparator } from "@/components/ui/sidebar";

const Navigation = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  // Check if user is a super admin
  const isSuperAdmin = user?.username === "admin" || user?.email === "m1keangelo@icloud.com";
  
  return (
    <nav 
      className="flex flex-col justify-between h-full py-8 bg-[#490c7c]/30 transition-all duration-300 sidebar-menu" 
      role="navigation" 
      aria-label="Main Navigation"
    >
      <div className="space-y-2">
        <SidebarMenu>
          <NavItem href="/" icon={<Home size={22} />} label={t('nav.home')} aria-label={t('nav.home')} />
          <NavItem href="/form" icon={<FileText size={22} />} label={t('nav.form')} aria-label={t('nav.form')} />
          <NavItem href="/clients" icon={<Users size={22} />} label={t('nav.clients')} aria-label={t('nav.clients')} />
          <NavItem href="/analytics" icon={<BarChart size={22} />} label={t('nav.analytics')} aria-label={t('nav.analytics')} />
          
          {(user?.role === 'admin' || user?.role === 'superadmin') && (
            <NavItem href="/admin" icon={<Settings size={22} />} label="Admin" aria-label="Admin" />
          )}
        </SidebarMenu>
        
        {/* Secondary navigation items with separator */}
        <div className="mt-8">
          <SidebarSeparator className="mb-4 opacity-50" />
          <SidebarMenu>
            <NavItem 
              href="/report-bug" 
              icon={<BugOff size={20} />} 
              label={t('nav.reportBug')} 
              aria-label={t('nav.reportBug')} 
              secondary={true} 
            />
            <NavItem 
              href="/suggestions" 
              icon={<MessageSquarePlus size={20} />} 
              label={t('nav.suggestions')} 
              aria-label={t('nav.suggestions')}
              secondary={true} 
            />
          </SidebarMenu>
        </div>
      </div>
      
      <div className="space-y-5 px-5">
        <LanguageToggle />
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-start text-white hover:bg-[#7a2dac] hover:text-[#E0E0E0] transition-all duration-300 hover:shadow-md active:bg-[#5e0f99] active:scale-98 h-12"
                onClick={logout}
                aria-label={t('nav.logout')}
              >
                <LogOut className="mr-3 h-6 w-6 text-[#9b87f5]" />
                <span className="text-[16px] font-medium">{t('nav.logout')}</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">
              <p>{t('nav.logout')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <div className="flex items-center gap-3 px-3 py-3 mt-2 border-t border-[#7a2dac] text-sm text-white/80">
          <User size={18} className="text-[#9b87f5]" />
          <span className="font-medium text-[16px]">{user?.name}</span>
        </div>
      </div>
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

const NavItem = ({ href, icon, label, secondary = false, ...props }: NavItemProps) => (
  <SidebarMenuItem>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarMenuButton asChild tooltip={label}>
            <NavLink
              to={href}
              className={({ isActive }) =>
                `flex items-center gap-3 px-5 py-4 transition-all duration-300 rounded-sm group
                ${isActive
                  ? "active bg-[#8c42dc] text-white border-l-3 border-white font-medium shadow-md"
                  : "text-white hover:bg-[#7a2dac] hover:text-[#E0E0E0] hover:shadow-md active:bg-[#5e0f99] active:scale-98"
                } ${secondary ? "opacity-70 text-sm py-3" : ""}`
              }
              {...props}
            >
              <span className={`text-[#9b87f5] group-hover:text-white transition-colors duration-300 ${secondary ? "opacity-80" : ""}`}>{icon}</span>
              <span className={`${secondary ? "text-[14px]" : "text-[16px]"} font-medium`}>{label}</span>
              <ChevronRight size={secondary ? 16 : 18} className="ml-auto opacity-0 group-hover:opacity-100 text-white/70 transition-all duration-300 transform group-hover:translate-x-1" />
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

export default Navigation;
