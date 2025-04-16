
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight, DollarSign } from "lucide-react";

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
  const { language } = useLanguage();
  const [sliderValue, setSliderValue] = useState(value || 0);
  
  // Format currency with commas
  const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('en-US');
  };
  
  // Handle slider change in multiples of 20
  const handleSliderChange = (val: number[]) => {
    // Round to nearest multiple of 20
    const roundedVal = Math.round(val[0] / 20) * 20;
    setSliderValue(roundedVal);
    onChange(roundedVal);
  };
  
  return (
    <QuestionContainer
      title={language === 'en' ? 'Down Payment Amount' : 'Monto del Pago Inicial'}
      questionText={language === 'en' ? 'Approximately how much have you saved?' : '¿Aproximadamente cuánto has ahorrado?'}
      questionId="downpaymentamount"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="mt-4 mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center bg-muted/30 p-3 rounded-full h-16 w-40 border border-primary/20">
              <DollarSign className="h-5 w-5 text-muted-foreground mr-1" />
              <span className="text-2xl font-semibold">{formatCurrency(sliderValue)}</span>
            </div>
          </div>
          
          <div className="pt-4">
            <Slider
              value={[sliderValue]}
              min={0}
              max={1000000}
              step={20}
              onValueChange={handleSliderChange}
              className="my-6"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>$0</span>
              <span>$1,000,000</span>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground mt-4">
            {language === 'en' ? 'Slide to adjust your down payment amount' : 'Desliza para ajustar el monto de tu pago inicial'}
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
        <Button 
          onClick={onNext} 
          disabled={value === null}
        >
          {language === 'en' ? 'Next' : 'Siguiente'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default DownPaymentAmountQuestion;
