
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  const [inputValue, setInputValue] = useState(value?.toString() || "");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    
    const numVal = parseFloat(val);
    if (!isNaN(numVal)) {
      onChange(numVal);
    } else {
      onChange(null);
    }
  };
  
  return (
    <QuestionContainer
      title={t('q.selfEmployed.title')}
      questionText={t('q.selfEmployed.question')}
      questionId="selfemployedyears"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="selfEmployedYears">{t('q.selfEmployed.yearsLabel')}</Label>
          <Input
            id="selfEmployedYears"
            type="number"
            step="0.5"
            min="0"
            value={inputValue}
            onChange={handleChange}
            className="mt-1"
            placeholder={t('q.selfEmployed.placeholder')}
          />
        </div>
        
        {value !== null && value < 2 && (
          <div className="text-sm text-amber-500 bg-amber-50 p-3 rounded-md border border-amber-200">
            {t('q.selfEmployed.warning')}
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
        <Button onClick={onNext} disabled={value === null}>
          {t('form.next')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default SelfEmployedYearsQuestion;
