
import { Button } from "@/components/ui/button";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const DownPaymentAssistanceQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['assistanceOpen'];
  onChange: (value: FormState['assistanceOpen']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? 'Down Payment Assistance' : 'Asistencia para el Enganche'}
      questionText={language === 'en' ? 'Would you be open to down payment assistance programs?' : '¿Estarías interesado en programas de asistencia para el enganche?'}
      questionId="downpaymentassistance"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Button
          variant={value === true ? 'default' : 'outline'}
          onClick={() => onChange(true)}
        >
          {language === 'en' ? 'Yes, I\'m interested' : 'Sí, estoy interesado'}
        </Button>
        <Button
          variant={value === false ? 'default' : 'outline'}
          onClick={() => onChange(false)}
        >
          {language === 'en' ? 'No, I prefer to use my own funds' : 'No, prefiero usar mis propios fondos'}
        </Button>
      </div>
      
      {value === true && (
        <div className="mt-4 text-sm text-muted-foreground bg-secondary/50 p-3 rounded-md">
          {language === 'en' 
            ? 'There are many programs available that can help with down payment costs, especially for first-time homebuyers.'
            : 'Hay muchos programas disponibles que pueden ayudar con los costos del enganche, especialmente para compradores de primera vivienda.'
          }
        </div>
      )}
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === 'en' ? 'Back' : 'Atrás'}
        </Button>
        <Button onClick={onNext} disabled={value === null}>
          {language === 'en' ? 'Next' : 'Siguiente'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default DownPaymentAssistanceQuestion;
