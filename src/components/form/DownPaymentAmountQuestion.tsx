
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const DownPaymentAmountQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['downPaymentAmount'];
  onChange: (value: FormState['downPaymentAmount']) => void;
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
      title={t('q.downPaymentAmount.title')}
      questionText={t('q.downPaymentAmount.question')}
      questionId="downpaymentamount"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <div>
          <Label htmlFor="downPaymentAmount">{t('q.downPaymentAmount.amountLabel')}</Label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <Input
              id="downPaymentAmount"
              type="number"
              min="0"
              step="1000"
              value={inputValue}
              onChange={handleChange}
              placeholder={t('q.downPaymentAmount.placeholder')}
              className="pl-6"
            />
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

export default DownPaymentAmountQuestion;
