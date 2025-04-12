
import { useLanguage } from "@/contexts/LanguageContext";

const BrandImagery = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full h-full flex items-center justify-center p-6 relative">
      {/* Brand Logo/Tagline Overlay */}
      <div className="absolute top-10 left-10 md:top-16 md:left-16 z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 text-shadow">
          Gallo <span className="text-[#9b87f5]">Avión</span>
        </h1>
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
          Fuck Mediocrity, Unleashing Bold Marketing Power!
        </p>
      </div>
    </div>
  );
};

export default BrandImagery;
