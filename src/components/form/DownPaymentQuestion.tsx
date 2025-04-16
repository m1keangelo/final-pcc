
import { Button } from "@/components/ui/button";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  const { t } = useLanguage();
  
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
