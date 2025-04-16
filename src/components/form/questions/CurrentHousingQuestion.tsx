
import { useLanguage } from "@/contexts/LanguageContext";
import QuestionContainer from "@/components/form/QuestionContainer";
import { Button } from "@/components/ui/button";
import { FormState } from "@/types/form";

interface CurrentHousingQuestionProps {
  value: FormState['currentHousing'];
  onChange: (value: FormState['currentHousing']) => void;
  onNext: () => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
}

export const CurrentHousingQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: CurrentHousingQuestionProps) => {
  const { language } = useLanguage();

  return (
    <QuestionContainer
      title={language === 'en' ? "Current Housing" : "Vivienda Actual"}
      questionText={language === 'en'
        ? "What is your current housing situation?"
        : "¿Cuál es su situación de vivienda actual?"}
      questionId="currentHousing"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <Button
          type="button"
          variant={value === 'own' ? "default" : "outline"}
          className="w-full justify-start text-left font-normal"
          onClick={() => onChange('own')}
        >
          {language === 'en' ? "Own" : "Propietario"}
        </Button>
        <Button
          type="button"
          variant={value === 'rent' ? "default" : "outline"}
          className="w-full justify-start text-left font-normal"
          onClick={() => onChange('rent')}
        >
          {language === 'en' ? "Rent" : "Alquiler"}
        </Button>
        <Button
          type="button"
          variant={value === 'other' ? "default" : "outline"}
          className="w-full justify-start text-left font-normal"
          onClick={() => onChange('other')}
        >
          {language === 'en' ? "Other (living with family, etc.)" : "Otro (viviendo con familia, etc.)"}
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
