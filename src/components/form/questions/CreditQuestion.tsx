
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import QuestionContainer from "@/components/form/QuestionContainer";
import { Button } from "@/components/ui/button";
import { FormState, getCreditRatingScore, getCreditRatingTier } from "@/types/form";
import { Alert } from "@/components/ui/alert";

interface CreditQuestionProps {
  value: FormState['creditCategory'];
  onChange: (value: FormState['creditCategory']) => void;
  onUpdateScore: (score: number) => void;
  onUpdateTier: (tier: string) => void;
  onNext: () => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
}

export const CreditQuestion = ({ 
  value, 
  onChange, 
  onUpdateScore,
  onUpdateTier,
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}: CreditQuestionProps) => {
  const { language } = useLanguage();
  
  const handleCreditChange = (creditCategory: FormState['creditCategory']) => {
    onChange(creditCategory);
    
    // Update the credit rating score and tier
    if (creditCategory) {
      const score = getCreditRatingScore(creditCategory);
      const tier = getCreditRatingTier(creditCategory, language);
      onUpdateScore(score);
      onUpdateTier(tier);
    }
  };
  
  const showCreditAdvice = value === 'fair' || value === 'poor' || value === 'unknown';
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Credit Score" : "Puntaje de Crédito"}
      questionText={language === 'en' 
        ? "Do you know your approximate credit score or how you would describe your credit?" 
        : "¿Sabe aproximadamente cuál es su puntaje de crédito o cómo describiría su crédito?"}
      questionId="credit"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        {[
          { value: 'excellent', labelEn: 'Excellent (740+)', labelEs: 'Excelente (740+)' },
          { value: 'good', labelEn: 'Good (700-739)', labelEs: 'Bueno (700-739)' },
          { value: 'fair', labelEn: 'Fair (660-699)', labelEs: 'Regular (660-699)' },
          { value: 'poor', labelEn: 'Poor (Below 660)', labelEs: 'Bajo (Menos de 660)' },
          { value: 'unknown', labelEn: 'Not sure/No credit', labelEs: 'No estoy seguro/Sin crédito' },
        ].map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={value === option.value ? "default" : "outline"}
            className="w-full justify-start text-left font-normal"
            onClick={() => handleCreditChange(option.value as FormState['creditCategory'])}
          >
            {language === 'en' ? option.labelEn : option.labelEs}
          </Button>
        ))}
        
        {showCreditAdvice && (
          <Alert className="mt-2 p-4 bg-yellow-50 rounded-md text-yellow-800 text-base border-yellow-200">
            {language === 'en' 
              ? "No worries, many people qualify even with lower scores. Let's explore how to build your credit — like being added as an authorized user on a family member's card, using a secured card, or reporting rent payments. We've worked with credit repair partners in Puerto Rico and our community for over 15 years. We'll guide you step-by-step." 
              : "No se preocupe, muchas personas califican incluso con puntuaciones más bajas. Veamos cómo construir su crédito — como ser añadido como usuario autorizado en la tarjeta de un familiar, usar una tarjeta asegurada o reportar sus pagos de alquiler. Hemos trabajado con socios de reparación de crédito en Puerto Rico y nuestra comunidad por más de 15 años. Le guiaremos paso a paso."}
          </Alert>
        )}
      </div>
      <div className="mt-6 flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {language === 'en' ? "Back" : "Atrás"}
          </Button>
        )}
        <Button onClick={onNext}>
          {language === 'en' ? "Next" : "Siguiente"}
        </Button>
      </div>
    </QuestionContainer>
  );
};
