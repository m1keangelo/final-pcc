
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { login } = useAuth();
  const { t } = useLanguage();
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
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-black relative overflow-hidden">
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
      
      <div className="flex flex-1 z-10">
        <div className="w-1/2 flex items-center justify-center p-6">
          <div className="text-center">
            <div className="relative mb-6">
              <img 
                src="/lovable-uploads/b9619f78-7281-46a1-93d2-c7c8123e5e56.png" 
                alt="Gallo Avión Cyberpunk" 
                className="w-full max-w-[170%] mx-auto rounded-xl shadow-2xl transform hover:scale-105 transition-transform duration-300 border-2 border-solid border-[#690dac]"
              />
            </div>
          </div>
        </div>
        
        <div className="w-1/2 flex items-center justify-center">
          <div className="w-80 bg-[#2a2a3a] rounded-lg p-8 shadow-xl border border-[#9b87f5]/20">
            <h2 className="text-2xl font-bold text-center text-white mb-8">
              {t('login.title')}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username" className="text-gray-300">{t('login.username')}</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="bg-[#3a3a4a] border-[#4a4a5a] text-gray-200"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-gray-300">{t('login.password')}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-[#3a3a4a] border-[#4a4a5a] text-gray-200"
                  />
                </div>
              </div>
              
              {error && (
                <div className="text-sm text-red-400 text-center">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-[#690dac] hover:bg-[#5A079A] text-white transition-colors"
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
            
            <div className="text-center text-xs text-gray-400 mt-6">
              <p>Username: admin, maria, or juan</p>
              <p>Password: password123</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
