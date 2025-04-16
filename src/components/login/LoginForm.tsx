
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff, User, Lock } from "lucide-react";

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
    
    console.log("Login attempt with:", { username, password });
    
    if (!username || !password) {
      setError(t('login.error'));
      return;
    }
    
    setIsSubmitting(true);
    try {
      console.log("Calling login function...");
      const success = await login(username, password);
      console.log("Login result:", success);
      if (success) {
        console.log("Login successful, navigating to /");
        navigate("/");
      } else {
        console.log("Login failed");
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
      return language === 'en' ? 'Login...' : 'Iniciando...';
    }
    return language === 'en' ? 'Login' : 'Iniciar';
  };

  return (
    <div className="w-full max-w-md bg-[#2a2a3a]/95 rounded-lg p-8 shadow-xl border border-[#9b87f5]/30 backdrop-blur-sm">
      <h2 className="text-3xl font-bold text-center text-white mb-6">
        {t('login.title')}
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Username Input */}
        <div className="space-y-2">
          <Label htmlFor="username" className="text-gray-300">
            {t('login.username')}
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="username"
              type="text"
              placeholder="admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-[#3a3a4a] border-[#4a4a5a] text-gray-200 pl-10 hover:border-[#9b87f5]/70 focus:border-[#9b87f5] transition-colors"
            />
          </div>
        </div>
        
        {/* Password Input */}
        <div className="space-y-2">
          <Label htmlFor="password" className="text-gray-300">
            {t('login.password')}
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-[#3a3a4a] border-[#4a4a5a] text-gray-200 pl-10 hover:border-[#9b87f5]/70 focus:border-[#9b87f5] transition-colors"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-200"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        
        {/* Error Message */}
        {error && (
          <div className="text-sm text-red-400 text-center bg-red-400/10 py-2 px-3 rounded-md border border-red-400/20">
            {error}
          </div>
        )}
        
        {/* Forgot Password Link */}
        <div className="flex justify-end">
          <a href="#" className="text-sm text-[#9b87f5] hover:text-[#b29df9] transition-colors">
            {t('login.forgotPassword')}
          </a>
        </div>
        
        {/* Login Button */}
        <Button 
          type="submit" 
          className="w-full bg-[#690dac] hover:bg-[#7a2dac] text-white transition-colors shadow-lg shadow-[#690dac]/20 hover:shadow-[#690dac]/40 transform hover:scale-[1.02] active:scale-[0.98]"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="mr-2 animate-spin" />
              {getLoginButtonText()}
            </>
          ) : getLoginButtonText()}
        </Button>
      </form>
      
      {/* Demo Credentials */}
      <div className="text-center text-xs text-gray-400 mt-6 border-t border-gray-700 pt-4">
        <p className="mb-1">Demo Credentials:</p>
        <p>Username: admin, maria, or juan</p>
        <p>Password: password123</p>
      </div>
    </div>
  );
};

export default LoginForm;
