import { Button } from "@/components/ui/button";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FeedbackBox from "./FeedbackBox";

export const DownPaymentQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['downPaymentSaved'];
  onChange: (value: FormState['downPaymentSaved']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  
  const getFeedbackMessage = () => {
    if (value === true) {
      return language === 'es' 
        ? "Excelente. Eso muestra compromiso al banco. Podemos combinarlo con ayudas para que te rinda más."
        : "Beautiful — let's show the lender you've got skin in the game. We'll pair it with assistance to multiply your power.";
    } else if (value === false) {
      return language === 'es'
        ? "Tranquilo. Hay ayudas, fondos regalo y hasta opciones sin cuota inicial. Busquemos la que te sirva mejor."
        : "No stress. We've got grant programs, gift funds, and even zero-down options in some cases. Let's find what fits.";
    }
    return "";
  };
  
  return (
    <QuestionContainer
      title={t('q.downPayment.title')}
      questionText={t('q.downPayment.question')}
      questionId="downpayment"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Button
          variant={value === true ? 'default' : 'outline'}
          onClick={() => onChange(true)}
        >
          {t('q.downPayment.yes')}
        </Button>
        <Button
          variant={value === false ? 'default' : 'outline'}
          onClick={() => onChange(false)}
        >
          {t('q.downPayment.no')}
        </Button>
      </div>
      
      {value !== null && (
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
        <Button onClick={onNext} disabled={value === null}>
          {t('form.next')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default DownPaymentQuestion;
