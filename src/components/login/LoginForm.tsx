
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

const LoginForm = () => {
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

  // Dynamic login button text based on language
  const getLoginButtonText = () => {
    if (isSubmitting) {
      return language === 'en' ? 'Logging in...' : 'Iniciando...';
    }
    return language === 'en' ? 'Login' : 'Iniciar Sesión';
  };

  return (
    <div className="flex flex-col items-center justify-center w-full py-8 px-6 md:w-1/2">
      <div className="w-full max-w-md glass-morphism rounded-xl p-8 shadow-2xl border border-white/10 backdrop-blur-lg transition-all duration-300 hover:shadow-gallomodern-500/10 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-white mb-8 font-display">
          {t('login.title')}
        </h2>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username Input */}
          <div className="space-y-2">
            <Label htmlFor="username" className="text-white/90 font-medium text-base">
              {t('login.username')}
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gallomodern-300">
                <User size={18} />
              </div>
              <Input
                id="username"
                type="text"
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/5 border-white/10 text-white pl-10 h-12 focus:border-gallomodern-300 focus:ring-1 focus:ring-gallomodern-300 transition-all rounded-lg"
              />
            </div>
          </div>
          
          {/* Password Input */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-white/90 font-medium text-base">
              {t('login.password')}
            </Label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gallomodern-300">
                <Lock size={18} />
              </div>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white pl-10 h-12 focus:border-gallomodern-300 focus:ring-1 focus:ring-gallomodern-300 transition-all rounded-lg"
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
          
          {/* Error Message */}
          {error && (
            <div className="text-sm text-red-300 text-center bg-red-500/10 py-2 px-3 rounded-lg border border-red-500/20 animate-fade-in">
              {error}
            </div>
          )}
          
          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <a href="#" className="text-sm text-gallomodern-300 hover:text-gallomodern-200 transition-colors flex items-center gap-1">
              <HelpCircle size={14} />
              {t('login.forgotPassword')}
            </a>
          </div>
          
          {/* Login Button */}
          <Button 
            type="submit" 
            className="w-full h-12 bg-gradient-to-r from-gallomodern-600 to-gallomodern-500 hover:from-gallomodern-500 hover:to-gallomodern-400 text-white text-base font-medium transition-all shadow-lg shadow-gallomodern-700/20 hover:shadow-gallomodern-700/40 rounded-lg"
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
        
        {/* Demo Credentials */}
        <div className="text-center text-xs text-white/70 mt-8 border-t border-white/10 pt-4">
          <p className="mb-1 font-medium text-gallomodern-300">Demo Credentials:</p>
          <p>Username: admin, maria, or juan</p>
          <p>Password: password123</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
