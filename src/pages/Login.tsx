
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
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
    <div className="min-h-screen flex flex-col">
      <div className="absolute top-4 right-4">
        <LanguageToggle />
      </div>
      
      <div className="flex flex-col md:flex-row flex-1">
        {/* Left column with branding */}
        <div className="w-full md:w-1/2 bg-matrix-pattern flex flex-col justify-center items-center p-8 relative">
          <div className="relative z-10 text-center">
            <img 
              src="/gallo-logo.png" 
              alt="Gallo Avión" 
              className="w-40 mx-auto mb-6 animate-fade-in"
            />
            <h1 className="text-4xl font-bold text-gallopurple mb-2">Gallo Avión</h1>
            <p className="text-gray-300 text-xl mb-8">Prequalification Assistant</p>
            
            <div className="w-64 mx-auto">
              <img 
                src="/rooster-mascot.png" 
                alt="Rooster Mascot" 
                className="w-full hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
          
          <div className="absolute inset-0 opacity-30 overflow-hidden">
            {Array.from({ length: 10 }).map((_, i) => (
              <div 
                key={i} 
                className="matrix-code text-xs absolute animate-fade-in"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
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
        </div>
        
        {/* Right column with form */}
        <div className="w-full md:w-1/2 bg-background flex items-center justify-center p-8">
          <div className="w-full max-w-md space-y-8 animate-fade-in">
            <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight">{t('login.title')}</h2>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="username">{t('login.username')}</Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="admin"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">{t('login.password')}</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              
              {error && (
                <div className="text-sm text-red-500 text-center">
                  {error}
                </div>
              )}
              
              <Button 
                type="submit" 
                className="w-full bg-gallopurple hover:bg-gallopurple-dark transition-colors"
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
            
            <div className="text-center text-sm text-muted-foreground">
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
