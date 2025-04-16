
import { useLanguage } from "@/contexts/LanguageContext";
import QuestionContainer from "@/components/form/QuestionContainer";
import { Button } from "@/components/ui/button";
import { FormState } from "@/types/form";

interface CreditQuestionProps {
  value: FormState['creditCategory'];
  onChange: (value: FormState['creditCategory']) => void;
  onNext: () => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
  onUpdateScore?: (value: number) => void;
  onUpdateTier?: (value: string) => void;
}

export const CreditQuestion = ({ 
  value, 
  onChange, 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps,
  onUpdateScore,
  onUpdateTier
}: CreditQuestionProps) => {
  const { language } = useLanguage();
  
  const handleCreditChange = (selectedValue: FormState['creditCategory']) => {
    onChange(selectedValue);
    
    // Update score and tier if handlers are provided
    if (onUpdateScore) {
      if (selectedValue === 'excellent') onUpdateScore(10);
      else if (selectedValue === 'good') onUpdateScore(8);
      else if (selectedValue === 'fair') onUpdateScore(6);
      else if (selectedValue === 'poor') onUpdateScore(3);
      else if (selectedValue === 'unknown') onUpdateScore(2);
    }
    
    if (onUpdateTier) {
      if (selectedValue === 'excellent') onUpdateTier('Excellent');
      else if (selectedValue === 'good') onUpdateTier('Good');
      else if (selectedValue === 'fair') onUpdateTier('Fair');
      else if (selectedValue === 'poor') onUpdateTier('Poor');
      else if (selectedValue === 'unknown') onUpdateTier('Unknown');
    }
  };
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Credit Score" : "Puntaje de Crédito"}
      questionText={language === 'en' 
        ? "Do you know your approximate credit score or how you would describe your credit?" 
        : "¿Sabe aproximadamente cuál es su puntaje de crédito o cómo describiría su crédito?"}
      questionId="credit"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        {[
          { value: 'excellent', labelEn: 'Excellent (740+)', labelEs: 'Excelente (740+)' },
          { value: 'good', labelEn: 'Good (700-739)', labelEs: 'Bueno (700-739)' },
          { value: 'fair', labelEn: 'Fair (660-699)', labelEs: 'Regular (660-699)' },
          { value: 'poor', labelEn: 'Poor (Below 660)', labelEs: 'Bajo (Menos de 660)' },
          { value: 'unknown', labelEn: 'Not sure/No credit', labelEs: 'No estoy seguro/Sin crédito' },
        ].map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={value === option.value ? "default" : "outline"}
            className="w-full justify-start text-left font-normal"
            onClick={() => handleCreditChange(option.value as FormState['creditCategory'])}
          >
            {language === 'en' ? option.labelEn : option.labelEs}
          </Button>
        ))}
        
        {(value === 'poor' || value === 'fair') && (
          <div className="mt-2 p-4 bg-yellow-50 rounded-md text-yellow-800 text-base">
            {language === 'en' 
              ? "There are ways to improve a low credit score. For example, being added as an authorized user on someone else's credit card can quickly boost your score. Paying down credit balances helps too." 
              : "Hay formas de mejorar un puntaje bajo. Por ejemplo, ser añadido como usuario autorizado en la tarjeta de crédito de otra persona puede subir su puntaje rápidamente. También ayudaría bajar sus deudas de tarjeta."}
          </div>
        )}
        
        {value === 'unknown' && (
          <div className="mt-2 p-4 bg-yellow-50 rounded-md text-yellow-800 text-base">
            {language === 'en' 
              ? "We might need to build some credit for you first, for instance by using a secured credit card or reporting your rent payments." 
              : "Quizá necesitemos que usted genere historial de crédito primero, por ejemplo con una tarjeta asegurada o reportando sus pagos de renta."}
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {language === 'en' ? "Back" : "Atrás"}
          </Button>
        )}
        <Button onClick={onNext}>
          {language === 'en' ? "Next" : "Siguiente"}
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default CreditQuestion;
