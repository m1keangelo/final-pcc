
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageToggle from "@/components/LanguageToggle";
import LoginForm from "@/components/login/LoginForm";
import BrandImagery from "@/components/login/BrandImagery";
import MatrixBackground from "@/components/login/MatrixBackground";

const Login = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen flex flex-col bg-black relative w-full overflow-hidden">
      {/* Animated Background */}
      <MatrixBackground />
      
      {/* Language Toggle */}
      <div className="absolute top-4 right-4 z-20">
        <LanguageToggle />
      </div>
      
      {/* Main Content Container */}
      <div className="flex w-full h-screen z-10">
        {/* Left Column - Login Form */}
        <div className="w-full md:w-2/5 flex items-center justify-center p-4 order-2 md:order-1">
          <LoginForm />
        </div>
        
        {/* Right Column - Brand Imagery */}
        <div className="w-full md:w-3/5 bg-[#1a1f2c]/60 flex items-center justify-center order-1 md:order-2 overflow-hidden relative">
          <BrandImagery />
        </div>
      </div>
    </div>
  );
};

export default Login;
