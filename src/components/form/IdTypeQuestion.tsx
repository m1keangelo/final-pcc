
import React from "react";
import { Button } from "@/components/ui/button";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FeedbackBox from "./FeedbackBox";

const IdTypeQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['idType'];
  onChange: (value: FormState['idType']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();

  const getFeedbackMessage = () => {
    if (language === 'es') {
      switch(value) {
        case 'SSN':
          return "Excelente. Tienes acceso a programas convencionales con las mejores tasas y costos de cierre más bajos. Esta es la ruta tradicional para préstamos hipotecarios.";
        case 'ITIN':
          return "Hay más opciones de las que piensas. Tenemos prestamistas especiales para ITIN con tasas competitivas y requisitos flexibles. Podemos encontrar algo que funcione para ti.";
        case 'none':
          return "Es posible comprar casa sin SSN o ITIN. Hay programas privados disponibles con requisitos diferentes. Podemos revisar opciones individuales para tu situación.";
        default:
          return "";
      }
    } else {
      switch(value) {
        case 'SSN':
          return "Excellent. You have access to conventional programs with the best rates and lower closing costs. This is the traditional path for mortgage loans.";
        case 'ITIN':
          return "You have more options than you think. We have special ITIN lenders with competitive rates and flexible requirements. We can find something that works for you.";
        case 'none':
          return "It's still possible to buy a home without SSN or ITIN. Private programs are available with different requirements. We can review individual options for your situation.";
        default:
          return "";
      }
    }
  };

  return (
    <QuestionContainer
      title={t('q.idType.title')}
      questionText={t('q.idType.question')}
      questionId="idtype"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Button
          variant={value === 'SSN' ? 'default' : 'outline'}
          onClick={() => onChange('SSN')}
        >
          {t('q.idType.ssn')}
        </Button>
        <Button
          variant={value === 'ITIN' ? 'default' : 'outline'}
          onClick={() => onChange('ITIN')}
        >
          {t('q.idType.itin')}
        </Button>
        <Button
          variant={value === 'none' ? 'default' : 'outline'}
          onClick={() => onChange('none')}
        >
          {t('q.idType.none')}
        </Button>
      </div>

      {value && (
        <FeedbackBox message={getFeedbackMessage()} />
      )}

      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('form.previous')}
        </Button>
        <Button onClick={onNext} disabled={!value}>
          {t('form.next')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default IdTypeQuestion;
