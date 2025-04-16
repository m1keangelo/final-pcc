
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  const [inputValue, setInputValue] = useState(value?.toString() || "");
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    
    const numVal = parseInt(val);
    if (!isNaN(numVal) && numVal >= 300 && numVal <= 850) {
      onChange(numVal);
    } else {
      onChange(null);
    }
  };
  
  const handleSliderChange = (val: number[]) => {
    const numVal = val[0];
    setInputValue(numVal.toString());
    onChange(numVal);
  };
  
  const getCreditCategory = (score: number | null) => {
    if (score === null) return '';
    if (score >= 750) return t('q.creditScore.excellent');
    if (score >= 700) return t('q.creditScore.good');
    if (score >= 650) return t('q.creditScore.fair');
    if (score >= 600) return t('q.creditScore.needsWork');
    return t('q.creditScore.poor');
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
        <div>
          <Label htmlFor="creditScore">{t('q.creditScore.scoreLabel')}</Label>
          <Input
            id="creditScore"
            type="number"
            min="300"
            max="850"
            value={inputValue}
            onChange={handleInputChange}
            className="mt-1"
            placeholder={t('q.creditScore.placeholder')}
          />
        </div>
        
        <div className="pt-4">
          <Slider
            value={value ? [value] : [650]}
            min={300}
            max={850}
            step={1}
            onValueChange={handleSliderChange}
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>300</span>
            <span>850</span>
          </div>
        </div>
        
        {value !== null && (
          <div className="text-center">
            <div className="text-lg font-medium">{getCreditCategory(value)}</div>
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

export default CreditScoreQuestion;
