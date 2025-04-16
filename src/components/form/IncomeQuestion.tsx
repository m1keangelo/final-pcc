
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const IncomeQuestion = ({
  incomeValue,
  incomeTypeValue,
  onChangeIncome,
  onChangeIncomeType,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  incomeValue: FormState['income'];
  incomeTypeValue: FormState['incomeType'];
  onChangeIncome: (value: FormState['income']) => void;
  onChangeIncomeType: (value: FormState['incomeType']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t } = useLanguage();
  const [inputValue, setInputValue] = useState(incomeValue?.toString() || "");
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    
    const numVal = parseFloat(val);
    if (!isNaN(numVal)) {
      onChangeIncome(numVal);
    } else {
      onChangeIncome(null);
    }
  };
  
  return (
    <QuestionContainer
      title={t('q.income.title')}
      questionText={t('q.income.question')}
      questionId="income"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="incomeType" className="mb-2 block">{t('q.income.typeLabel')}</Label>
          <RadioGroup 
            id="incomeType" 
            value={incomeTypeValue} 
            onValueChange={(val) => onChangeIncomeType(val as 'annual' | 'monthly')}
            className="flex space-x-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="annual" id="annual" />
              <Label htmlFor="annual">{t('q.income.annual')}</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="monthly" id="monthly" />
              <Label htmlFor="monthly">{t('q.income.monthly')}</Label>
            </div>
          </RadioGroup>
        </div>
        
        <div>
          <Label htmlFor="income">{t('q.income.amountLabel')}</Label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <Input
              id="income"
              type="number"
              min="0"
              step="1000"
              value={inputValue}
              onChange={handleChange}
              placeholder={t('q.income.placeholder')}
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
        <Button onClick={onNext} disabled={incomeValue === null}>
          {t('form.next')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default IncomeQuestion;
