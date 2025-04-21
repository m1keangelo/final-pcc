
import React from "react";
import { Button } from "@/components/ui/button";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FeedbackBox from "./FeedbackBox";

const TimelineQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['timeline'];
  onChange: (value: FormState['timeline']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  
  const getFeedbackMessage = () => {
    if (language === 'es') {
      switch(value) {
        case 'immediately':
          return "¡Genial! Podemos ayudarte a obtener una pre-aprobación en 24 horas para comenzar a hacer ofertas. El proceso completo toma entre 30-45 días.";
        case '3months':
          return "Perfecto para planificar. Tenemos tiempo para mejorar tu crédito y elegir el programa ideal. ¿Quieres una estrategia detallada?";
        case '3to6months':
          return "Excelente momento para prepararse. Podemos revisar tu crédito, ahorros y ayudarte a mejorar tu perfil para calificar para mejores tasas.";
        case '6to12months':
          return "Tiempo perfecto para una planificación completa. Podemos trabajar en crédito, ahorros, deudas, y encontrar opciones de asistencia para tu cuota inicial.";
        case 'exploring':
          return "Sin problema. Podemos revisar tus opciones sin compromiso y ayudarte a entender el proceso. Puedes decidir cuando estés listo.";
        default:
          return "";
      }
    } else {
      switch(value) {
        case 'immediately':
          return "Great! We can help you get pre-approved within 24 hours to start making offers. The full process takes about 30-45 days.";
        case '3months':
          return "Perfect timing for planning. We have time to boost your credit and select the right program. Want a full roadmap?";
        case '3to6months':
          return "Great spot to get prepared. We can review your credit, savings, and help you improve your profile to qualify for better rates.";
        case '6to12months':
          return "Perfect timing for a full plan. We can work on credit, savings, debts, and find down payment assistance options.";
        case 'exploring':
          return "No problem. We can review your options with no pressure and help you understand the process. You can decide when you're ready.";
        default:
          return "";
      }
    }
  };
  
  return (
    <QuestionContainer
      title={t('q.timeline.title')}
      questionText={t('q.timeline.question')}
      questionId="timeline"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Button
          variant={value === 'immediately' ? 'default' : 'outline'}
          onClick={() => onChange('immediately')}
        >
          {t('q.timeline.immediately')}
        </Button>
        <Button
          variant={value === '3months' ? 'default' : 'outline'}
          onClick={() => onChange('3months')}
        >
          {t('q.timeline.lessThan3Months')}
        </Button>
        <Button
          variant={value === '3to6months' ? 'default' : 'outline'}
          onClick={() => onChange('3to6months')}
        >
          {t('q.timeline.3to6Months')}
        </Button>
        <Button
          variant={value === '6to12months' ? 'default' : 'outline'}
          onClick={() => onChange('6to12months')}
        >
          {t('q.timeline.6to12Months')}
        </Button>
        <Button
          variant={value === 'exploring' ? 'default' : 'outline'}
          onClick={() => onChange('exploring')}
        >
          {t('q.timeline.justExploring')}
        </Button>
      </div>
      
      {value && (
        <FeedbackBox message={getFeedbackMessage()} />
      )}
      
      <div className="mt-8 flex justify-between">
        {onBack && (
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('form.previous')}
          </Button>
        )}
        <div className={onBack ? "" : "ml-auto"}>
          <Button onClick={onNext} disabled={!value}>
            {t('form.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </QuestionContainer>
  );
};

export default TimelineQuestion;
