
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

const SelfEmployedYearsQuestion = ({
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
  const [sliderValue, setSliderValue] = useState<number>(value || 0);
  
  const handleSliderChange = (val: number[]) => {
    const numVal = val[0];
    setSliderValue(numVal);
    onChange(numVal);
  };
  
  const getFeedbackMessage = () => {
    if (language === 'es') {
      if (sliderValue >= 3) {
        return "Excelente. Tienes suficiente historial para calificar para préstamos convencionales. Necesitaremos ver tus declaraciones de impuestos de los últimos 2 años.";
      } else if (sliderValue >= 1) {
        return "Estamos cerca. Con 2+ años, tienes más opciones. Por ahora, podríamos usar un préstamo no tradicional o considerar otras fuentes de ingresos. Hablemos de estrategias.";
      } else {
        return "Entendido. Para trabajadores independientes, los prestamistas normalmente buscan 2+ años. Pero tenemos opciones alternativas y podemos usar otros ingresos si los tienes. Vamos a explorar opciones.";
      }
    } else {
      if (sliderValue >= 3) {
        return "Excellent. You have sufficient history to qualify for conventional loans. We'll need to see your tax returns for the past 2 years.";
      } else if (sliderValue >= 1) {
        return "We're close. With 2+ years, you have more options. For now, we could use non-QM loans or consider other income sources. Let's talk strategy.";
      } else {
        return "Got it. For self-employed borrowers, lenders typically look for 2+ years. But we have alternative options and can use other income if you have it. Let's explore options.";
      }
    }
  };
  
  return (
    <QuestionContainer
      title={t('q.selfEmployedYears.title')}
      questionText={t('q.selfEmployedYears.question')}
      questionId="selfEmployedYears"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="mt-4 mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center bg-muted/30 p-3 rounded-full h-16 w-40 border border-primary/20">
              <span className="text-2xl font-semibold">{sliderValue} {sliderValue === 1 ? t('q.selfEmployedYears.year') : t('q.selfEmployedYears.years')}</span>
            </div>
          </div>
          
          <div className="pt-4">
            <Slider
              value={[sliderValue]}
              min={0}
              max={15}
              step={1}
              onValueChange={handleSliderChange}
              className="my-6"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>0 {t('q.selfEmployedYears.years')}</span>
              <span>15+ {t('q.selfEmployedYears.years')}</span>
            </div>
          </div>
          
          {sliderValue > 0 && (
            <div className="mt-4 feedback-box">
              <p className="font-medium">{getFeedbackMessage()}</p>
            </div>
          )}
        </div>
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
