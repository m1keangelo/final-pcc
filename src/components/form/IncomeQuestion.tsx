
import React, { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight, DollarSign } from "lucide-react";
import FeedbackBox from "./FeedbackBox";

const IncomeQuestion = ({
  value,
  incomeType,
  onChange,
  onChangeIncomeType,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['income'];
  incomeType: FormState['incomeType'];
  onChange: (value: string) => void;
  onChangeIncomeType: (value: FormState['incomeType']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  const [inputValue, setInputValue] = useState(value ? value.toString() : "");
  const inputRef = useRef<HTMLInputElement>(null);
  
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const cleanVal = val.replace(/[^0-9.]/g, '');
    setInputValue(cleanVal);
    onChange(cleanVal);
  }, [onChange]);
  
  const handleIncomeTypeChange = useCallback((value: string) => {
    if (value === 'annual' || value === 'monthly') {
      onChangeIncomeType(value);
    }
  }, [onChangeIncomeType]);
  
  const getIncomeCategory = useCallback((): 'low' | 'moderate' | 'high' => {
    const numericValue = parseFloat(inputValue) || 0;
    const annualIncome = incomeType === 'monthly' ? numericValue * 12 : numericValue;
    
    if (annualIncome < 40000) return 'low';
    if (annualIncome < 100000) return 'moderate';
    return 'high';
  }, [inputValue, incomeType]);
  
  const getFeedbackMessage = useCallback(() => {
    const incomeCategory = getIncomeCategory();
    
    if (language === 'es') {
      switch(incomeCategory) {
        case 'low':
          return "Hay opciones. Podemos revisar programas para compradores por primera vez, asistencia para el pago inicial y préstamos con límites de ingresos. No necesitas ingresos altos para comprar casa.";
        case 'moderate':
          return "Tienes ingresos fuertes para comprar. Podemos estimar un rango de compra de $150,000 a $350,000 dependiendo de tus deudas y crédito. ¿Quieres ver más detalles?";
        case 'high':
          return "Excelente posición. Puedes acceder a viviendas de mayor valor y préstamos jumbo si los necesitas. Tu poder adquisitivo te da flexibilidad para elegir ubicaciones premium.";
      }
    } else {
      switch(incomeCategory) {
        case 'low':
          return "You have options. We can look at first-time homebuyer programs, down payment assistance, and income-restricted loans. You don't need high income to buy a home.";
        case 'moderate':
          return "You've got solid buying power. We can estimate a purchase range of $150,000 to $350,000 depending on your debts and credit. Want to see more details?";
        case 'high':
          return "You're in an excellent position. You can access higher-value properties and jumbo loans if needed. Your buying power gives you flexibility for premium locations.";
      }
    }
  }, [getIncomeCategory, language]);
  
  const getIncomeTypeFeedbackMessage = useCallback(() => {
    if (language === 'es') {
      switch(incomeType) {
        case 'annual':
          return "Perfecto. Usaremos tu ingreso anual para calcular tu poder adquisitivo y opciones de préstamo.";
        case 'monthly':
          return "Entendido. Convertiremos tu ingreso mensual para estimar tu rango de compra y calificaciones.";
        default:
          return "";
      }
    } else {
      switch(incomeType) {
        case 'annual':
          return "Perfect. We'll use your annual income to calculate your buying power and loan options.";
        case 'monthly':
          return "Got it. We'll convert your monthly income to estimate your purchase range and qualifications.";
        default:
          return "";
      }
    }
  }, [incomeType, language]);
  
  return (
    <QuestionContainer
      title={t('q.income.title')}
      questionText={t('q.income.question')}
      questionId="income"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <RadioGroup 
          defaultValue={incomeType} 
          className="flex space-x-4"
          onValueChange={handleIncomeTypeChange}
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
        
        <div>
          <Label htmlFor="income" className="text-base text-gallomodern-100">
            {incomeType === 'monthly' ? t('q.income.monthlyLabel') : t('q.income.annualLabel')}
          </Label>
          <div className="relative mt-2">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <DollarSign className="h-5 w-5 text-gallomodern-300" />
            </div>
            <Input
              id="income"
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className="pl-10 text-foreground"
              placeholder={incomeType === 'monthly' ? t('q.income.monthlyPlaceholder') : t('q.income.annualPlaceholder')}
              ref={inputRef}
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {incomeType === 'monthly' ? t('q.income.monthlyHelper') : t('q.income.annualHelper')}
          </p>
        </div>
        
        {inputValue && (
          <FeedbackBox message={getFeedbackMessage()} />
        )}
        
        {incomeType && (
          <FeedbackBox message={getIncomeTypeFeedbackMessage()} />
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

export default IncomeQuestion;
