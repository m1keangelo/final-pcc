import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  Loader2,
  Eye, 
  EyeOff, 
  User, 
  Lock, 
  LogIn,
  HelpCircle
} from "lucide-react";
import { cn } from "@/lib/utils";

const LoginForm = ({ className }: { className?: string }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const { t, language } = useLanguage();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!username || !password) {
      setError(t('login.error'));
      return;
    }
    
    setIsSubmitting(true);
    try {
      const success = await login(username, password);
      if (success) {
        navigate("/");
      } else {
        setError(t('login.error'));
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(t('login.error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getLoginButtonText = () => {
    if (isSubmitting) {
      return language === 'en' ? 'Logging in...' : 'Iniciando...';
    }
    return language === 'en' ? 'Login' : 'Iniciar Sesión';
  };

  return (
    <div className={cn("flex flex-col items-center justify-center w-full py-8 px-6 md:w-1/2", className)}>
      <div className="w-full max-w-md glass-morphism rounded-xl p-8 shadow-2xl border border-white/10 backdrop-blur-lg transition-all duration-300 hover:shadow-glow-purple animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-white mb-8 font-display text-shadow-sm">
          {t('login.title')}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="username" className="text-white/90 font-medium text-base">
              {t('login.username')}
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-purple">
                <User size={18} />
              </div>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/5 border-white/10 text-white pl-10 h-12 focus:border-neon-purple focus:ring-1 focus:ring-neon-purple/70 transition-all rounded-lg"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/90 font-medium text-base">
              {t('login.password')}
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neon-blue">
                <Lock size={18} />
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white pl-10 h-12 focus:border-neon-blue focus:ring-1 focus:ring-neon-blue/70 transition-all rounded-lg"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white transition-colors"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          {error && (
            <div className="text-sm text-red-300 text-center bg-red-500/10 py-2 px-3 rounded-lg border border-red-500/20 animate-fade-in">
              {error}
            </div>
          )}
          
          <div className="flex justify-end">
            <a href="#" className="text-sm text-neon-blue hover:text-neon-purple transition-colors flex items-center gap-1">
              <HelpCircle size={14} />
              {t('login.forgotPassword')}
            </a>
          </div>
          
          <Button 
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-neon-purple to-neon-blue hover:from-neon-blue hover:to-neon-purple text-white text-base font-medium transition-all shadow-lg shadow-neon-purple/20 hover:shadow-neon-blue/30 rounded-lg"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 size={18} className="mr-2 animate-spin" />
                {getLoginButtonText()}
              </>
            ) : (
              <>
                <LogIn size={18} className="mr-2" />
                {getLoginButtonText()}
              </>
            )}
          </Button>
        </form>
        
        <div className="text-center text-xs text-white/80 mt-8 border-t border-white/10 pt-4">
          <p className="mb-1 font-medium text-neon-blue">Demo Credentials:</p>
          <p>Username: admin, maria, or juan</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
