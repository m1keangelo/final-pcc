
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
  const { t } = useLanguage();
  const [sliderValue, setSliderValue] = useState(value || 1);
  
  // Handle slider change
  const handleSliderChange = (val: number[]) => {
    const years = val[0];
    setSliderValue(years);
    onChange(years);
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
