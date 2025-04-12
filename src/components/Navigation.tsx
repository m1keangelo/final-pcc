
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { NavLink, useNavigate } from "react-router-dom";
import { Home, FileText, Users, BarChart, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

const Navigation = () => {
  const { t } = useLanguage();
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) return null;

  return (
    <nav className="bg-secondary p-4 flex flex-col h-full">
      <div className="flex items-center justify-center mb-10">
        <img 
          src="/gallo-logo.png" 
          alt="Gallo Avión" 
          className="h-12"
        />
      </div>

      <div className="space-y-2 flex-1">
        <NavLink 
          to="/" 
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
            isActive 
              ? "bg-gallopurple text-white font-medium" 
              : "text-gray-300 hover:bg-secondary-foreground/10"
          )}
        >
          <Home size={20} />
          <span>{t('nav.home')}</span>
        </NavLink>
        
        <NavLink 
          to="/form" 
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
            isActive 
              ? "bg-gallopurple text-white font-medium" 
              : "text-gray-300 hover:bg-secondary-foreground/10"
          )}
        >
          <FileText size={20} />
          <span>{t('nav.form')}</span>
        </NavLink>
        
        <NavLink 
          to="/clients" 
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
            isActive 
              ? "bg-gallopurple text-white font-medium" 
              : "text-gray-300 hover:bg-secondary-foreground/10"
          )}
        >
          <Users size={20} />
          <span>{t('nav.clients')}</span>
        </NavLink>
        
        <NavLink 
          to="/analytics" 
          className={({ isActive }) => cn(
            "flex items-center gap-3 px-4 py-3 rounded-md transition-colors",
            isActive 
              ? "bg-gallopurple text-white font-medium" 
              : "text-gray-300 hover:bg-secondary-foreground/10"
          )}
        >
          <BarChart size={20} />
          <span>{t('nav.analytics')}</span>
        </NavLink>
      </div>

      <button 
        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-secondary-foreground/10 rounded-md transition-colors mt-auto"
        onClick={handleLogout}
      >
        <LogOut size={20} />
        <span>{t('nav.logout')}</span>
      </button>
    </nav>
  );
};

export default Navigation;
