
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const SelfEmployedYearsQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['selfEmployedYears'];
  onChange: (value: FormState['selfEmployedYears']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  const [sliderValue, setSliderValue] = useState(value || 1);
  
  // Handle slider change
  const handleSliderChange = (val: number[]) => {
    const years = val[0];
    setSliderValue(years);
    onChange(years);
  };
  
  // Define feedback message based on number of years
  const getFeedbackMessage = () => {
    if (language === 'es') {
      if (sliderValue >= 2) {
        return "Perfecto. Ya estás establecido. Usamos tus impuestos y formas aceptadas por los bancos para ayudarte a calificar. Estás en muy buena posición.";
      } else if (sliderValue === 1) {
        return "Si trabajabas en lo mismo antes, puede que solo necesitemos un año de impuestos. Podemos preparar un buen caso para mostrar tu avance.";
      } else {
        return "Puede que sea muy pronto para ciertos préstamos, pero hay bancos que aceptan tus movimientos bancarios o tus ahorros. Podemos hacerte un plan de 90 días o buscar caminos diferentes.";
      }
    } else {
      if (sliderValue >= 2) {
        return "Beautiful. You're established — we'll grab your tax returns and use lender-approved methods to qualify you properly. You're in a strong position.";
      } else if (sliderValue === 1) {
        return "If you're in the same field as before, we may only need 1 tax year. We'll write a strong case to underwriting. Let's line everything up to prove your momentum.";
      } else {
        return "Might be early for conventional, but there are lenders who will use bank statements or assets. We'll prep you with a 90-day success plan or explore outside-the-box options.";
      }
    }
  };
  
  return (
    <QuestionContainer
      title={t('q.selfyears.title')}
      questionText={t('q.selfyears.question')}
      questionId="selfemployedyears"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <div className="mt-4 mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center bg-muted/30 p-3 rounded-full h-16 w-40 border border-primary/20">
              <span className="text-2xl font-semibold">
                {sliderValue} {sliderValue === 1 ? t('q.selfyears.year') : t('q.selfyears.years')}
              </span>
            </div>
          </div>
          
          <div className="pt-4">
            <Slider
              value={[sliderValue]}
              min={1}
              max={100}
              step={1}
              onValueChange={handleSliderChange}
              className="my-6"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>1 {t('q.selfyears.year')}</span>
              <span>100 {t('q.selfyears.years')}</span>
            </div>
          </div>
        </div>
        
        {/* Display feedback message */}
        <div className="mt-4 p-4 border border-[#fef9be] rounded-md bg-black text-[#fef9be]">
          <p className="font-medium">{getFeedbackMessage()}</p>
        </div>
        
        {sliderValue < 2 && (
          <div className="text-sm text-amber-500 bg-amber-50 p-3 rounded-md border border-amber-200">
            {t('q.selfyears.warning')}
          </div>
        )}
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('form.previous')}
        </Button>
        <Button onClick={onNext}>
          {t('form.next')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default SelfEmployedYearsQuestion;
