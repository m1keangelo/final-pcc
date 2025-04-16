
import { useLanguage } from "@/contexts/LanguageContext";
import QuestionContainer from "@/components/form/QuestionContainer";
import { Button } from "@/components/ui/button";

interface CreditHelpQuestionProps {
  value: boolean | null;
  onChange: (value: boolean) => void;
  onNext: () => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
}

export const CreditHelpQuestion = ({ 
  value, 
  onChange, 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}: CreditHelpQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Credit Improvement" : "Mejora de Crédito"}
      questionText={language === 'en' 
        ? "Would you like help improving your credit?" 
        : "¿Le gustaría ayuda para mejorar su crédito?"}
      questionId="improveCreditHelp"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <Button
          type="button"
          variant={value === true ? "default" : "outline"}
          className="w-full justify-start text-left font-normal"
          onClick={() => onChange(true)}
        >
          {language === 'en' ? "Yes" : "Sí"}
        </Button>
        <Button
          type="button"
          variant={value === false ? "default" : "outline"}
          className="w-full justify-start text-left font-normal"
          onClick={() => onChange(false)}
        >
          {language === 'en' ? "No" : "No"}
        </Button>
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

export default CreditHelpQuestion;
