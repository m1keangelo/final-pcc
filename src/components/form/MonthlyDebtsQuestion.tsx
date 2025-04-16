
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const MonthlyDebtsQuestion = ({
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
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title={t('q.monthlyDebts.title')}
      questionText={t('q.monthlyDebts.question')}
      questionId="monthlydebts"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="monthlyDebts">{t('q.monthlyDebts.amountLabel')}</Label>
          <div className="relative mt-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <Input
              id="monthlyDebts"
              type="text"
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={t('q.monthlyDebts.placeholder')}
              className="pl-6"
            />
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            {t('q.monthlyDebts.helper')}
          </p>
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

export default MonthlyDebtsQuestion;
