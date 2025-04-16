
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const CreditScoreQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['creditScore'];
  onChange: (value: FormState['creditScore']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  const [sliderValue, setSliderValue] = useState(value || 650);
  
  const getCreditCategory = (score: number) => {
    if (score >= 750) return t('q.creditScore.excellent');
    if (score >= 700) return t('q.creditScore.good');
    if (score >= 650) return t('q.creditScore.fair');
    if (score >= 600) return t('q.creditScore.needsWork');
    return t('q.creditScore.poor');
  };
  
  const handleSliderChange = (val: number[]) => {
    const numVal = val[0];
    setSliderValue(numVal);
    onChange(numVal);
  };
  
  return (
    <QuestionContainer
      title={t('q.creditScore.title')}
      questionText={t('q.creditScore.question')}
      questionId="creditscore"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="mt-4 mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center bg-muted/30 p-3 rounded-full h-16 w-40 border border-primary/20">
              <span className="text-2xl font-semibold">{sliderValue}</span>
            </div>
          </div>
          
          <div className="pt-4">
            <Slider
              value={[sliderValue]}
              min={300}
              max={850}
              step={1}
              onValueChange={handleSliderChange}
              className="my-6"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>300</span>
              <span>850</span>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground mt-4">
            {getCreditCategory(sliderValue)}
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === 'en' ? 'Back' : 'Atrás'}
        </Button>
        <Button onClick={onNext}>
          {language === 'en' ? 'Next' : 'Siguiente'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default CreditScoreQuestion;
