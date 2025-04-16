
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
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
  const [sliderValue, setSliderValue] = useState(incomeValue || 10);
  
  // Format currency
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value);
  };
  
  // Handle slider change
  const handleSliderChange = (val: number[]) => {
    const income = val[0];
    setSliderValue(income);
    onChangeIncome(income);
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
          <div className="mt-4 mb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center bg-muted/30 p-3 rounded-full h-16 w-56 border border-primary/20">
                <span className="text-2xl font-semibold">
                  {formatCurrency(sliderValue)}
                </span>
              </div>
            </div>
            
            <div className="pt-4">
              <Slider
                id="income"
                value={[sliderValue]}
                min={10}
                max={1000000}
                step={10}
                onValueChange={handleSliderChange}
                className="my-6"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-2">
                <span>{formatCurrency(10)}</span>
                <span>{formatCurrency(1000000)}</span>
              </div>
            </div>
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
        <Button onClick={onNext}>
          {t('form.next')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default IncomeQuestion;
