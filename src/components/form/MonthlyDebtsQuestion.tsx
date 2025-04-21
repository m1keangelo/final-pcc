import React, { useState, useRef, useEffect, useCallback, memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight, DollarSign } from "lucide-react";

const MonthlyDebtsQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['monthlyDebts'];
  onChange: (value: FormState['monthlyDebts']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  const [localValue, setLocalValue] = useState(value || "");
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const cleanVal = val.replace(/[^0-9$,.]/g, '');
    setLocalValue(cleanVal);
    onChange(cleanVal);
  }, [onChange]);
  
  const getDebtLevel = useCallback((): 'low' | 'moderate' | 'high' => {
    const numericValue = parseFloat(localValue.replace(/[$,]/g, '')) || 0;
    if (numericValue < 500) return 'low';
    if (numericValue < 2000) return 'moderate';
    return 'high';
  }, [localValue]);
  
  const getFeedbackMessage = useCallback(() => {
    const debtLevel = getDebtLevel();
    
    if (language === 'es') {
      switch(debtLevel) {
        case 'low':
          return "Eso es muy bueno. Tienes más capacidad para préstamo. Podemos buscarte una casa más grande sin pagar más al mes.";
        case 'moderate':
          return "Todo bien. Hacemos el cálculo para que igual puedas calificar. ¿Quieres que revisemos cuánto podrías obtener?";
        case 'high':
          return "Lo hemos visto antes — y lo hemos solucionado. Hay planes para pagar, unir deudas o usar un codeudor. Miremos opciones.";
      }
    } else {
      switch(debtLevel) {
        case 'low':
          return "That's strong. You've got borrowing power. Let's translate that into more house for the same payment.";
        case 'moderate':
          return "All good. We'll balance the numbers and could still qualify you comfortably. Want us to check where you land now?";
        case 'high':
          return "Seen it before — and fixed it before. Payoff plans, consolidation, or co-signers can flip your DTI. Let's talk strategy.";
      }
    }
  }, [getDebtLevel, language]);
  
  return (
    <QuestionContainer
      title={t('q.monthlyDebts.title')}
      questionText={t('q.monthlyDebts.question')}
      questionId="monthlyDebts"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="monthlyDebts" className="text-base text-gallomodern-100">
            {t('q.monthlyDebts.amountLabel')}
          </Label>
          <div className="relative mt-2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <DollarSign className="h-5 w-5 text-gallomodern-300" />
            </div>
            <Input
              id="monthlyDebts"
              type="text"
              value={localValue}
              onChange={handleInputChange}
              className="pl-10 text-foreground"
              placeholder={t('q.monthlyDebts.placeholder')}
              ref={inputRef}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {t('q.monthlyDebts.helper')}
          </p>
        </div>
        
        {localValue && (
          <div className="mt-4 p-4 feedback-box rounded-md">
            <p className="font-medium">{getFeedbackMessage()}</p>
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

export default memo(MonthlyDebtsQuestion);
