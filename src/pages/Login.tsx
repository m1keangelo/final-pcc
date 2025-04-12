
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2, Eye, EyeOff, User, Lock } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const { t } = useLanguage();
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

  return (
    <div className="min-h-screen flex flex-col bg-black relative w-full overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden opacity-100">
        {Array.from({ length: 20 }).map((_, i) => (
          <div 
            key={i} 
            className="matrix-code text-xs absolute animate-fade-in"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              color: '#690dac',
              textShadow: '0 0 5px #690dac',
              opacity: 1
            }}
          >
            {Array.from({ length: 20 }).map((_, j) => (
              <div key={j}>
                {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageToggle />
      </div>
      
      {/* Main Content Container */}
      <div className="flex w-full h-screen z-10">
        {/* Left Column - Login Form */}
        <div className="w-full md:w-2/5 flex items-center justify-center p-4 order-2 md:order-1">
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
                  {t('login.forgotPassword') || 'Forgot password?'}
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
                    {t('login.button')}...
                  </>
                ) : t('login.button')}
              </Button>
            </form>
            
            {/* Demo Credentials */}
            <div className="text-center text-xs text-gray-400 mt-6 border-t border-gray-700 pt-4">
              <p className="mb-1">Demo Credentials:</p>
              <p>Username: admin, maria, or juan</p>
              <p>Password: password123</p>
            </div>
          </div>
        </div>
        
        {/* Right Column - Brand Imagery */}
        <div className="w-full md:w-3/5 bg-[#1a1f2c]/60 flex items-center justify-center order-1 md:order-2 overflow-hidden relative">
          <div className="relative w-full h-full flex items-center justify-center p-6">
            {/* Brand Logo/Tagline Overlay */}
            <div className="absolute top-10 left-10 md:top-16 md:left-16 z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 text-shadow">
                Gallo <span className="text-[#9b87f5]">Avión</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300">
                Secure Admin Dashboard
              </p>
            </div>
            
            {/* Main Brand Image */}
            <img 
              src="/lovable-uploads/b9619f78-7281-46a1-93d2-c7c8123e5e56.png" 
              alt="Gallo Avión Cyberpunk" 
              className="w-4/5 lg:w-3/4 object-contain rounded-xl shadow-2xl transform hover:scale-[1.02] transition-all duration-500 border-2 border-solid border-[#690dac]/70"
              style={{
                filter: "drop-shadow(0 0 20px rgba(105, 13, 172, 0.4))"
              }}
            />
            
            {/* Decorative Elements */}
            <div className="absolute bottom-10 right-10 md:bottom-16 md:right-16 text-right">
              <p className="text-sm md:text-base text-[#9b87f5] font-medium">
                Powered by next-generation technology
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
