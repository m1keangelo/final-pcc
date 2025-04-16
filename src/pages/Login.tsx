
import SplashScreen from "@/components/login/SplashScreen";
import LoginForm from "@/components/login/LoginForm";
import BrandImagery from "@/components/login/BrandImagery";
import MatrixBackground from "@/components/login/MatrixBackground";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const { isLoading } = useAuth();
  
  if (isLoading) {
    return <SplashScreen onComplete={() => {}} />;
  }
  
  return (
    <LanguageProvider>
      <div className="relative flex h-screen w-full overflow-hidden">
        <MatrixBackground />
        <div className="z-10 flex w-full flex-col md:flex-row">
          <BrandImagery />
          <LoginForm />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Login;
