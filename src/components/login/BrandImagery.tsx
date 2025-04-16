
import { useLanguage } from "@/contexts/LanguageContext";

const BrandImagery = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full h-full flex items-center justify-center p-6 relative">
      {/* Main Brand Image - Reduced by 30% */}
      <img 
        src="/lovable-uploads/b9619f78-7281-46a1-93d2-c7c8123e5e56.png" 
        alt="Gallo Avión Cyberpunk" 
        className="w-3/5 lg:w-[52.5%] object-contain rounded-xl shadow-2xl transform hover:scale-[1.02] transition-all duration-500 border-2 border-solid border-[#690dac]/70"
        style={{
          filter: "drop-shadow(0 0 20px rgba(105, 13, 172, 0.4))"
        }}
      />
    </div>
  );
};

export default BrandImagery;
