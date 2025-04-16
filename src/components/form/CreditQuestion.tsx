
import { Button } from "@/components/ui/button";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const CreditQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['creditCategory'];
  onChange: (value: FormState['creditCategory']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title={t('q.credit.title')}
      questionText={t('q.credit.question')}
      questionId="credit"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Button
          variant={value === 'excellent' ? 'default' : 'outline'}
          onClick={() => onChange('excellent')}
        >
          {t('q.credit.excellent')}
        </Button>
        <Button
          variant={value === 'good' ? 'default' : 'outline'}
          onClick={() => onChange('good')}
        >
          {t('q.credit.good')}
        </Button>
        <Button
          variant={value === 'fair' ? 'default' : 'outline'}
          onClick={() => onChange('fair')}
        >
          {t('q.credit.fair')}
        </Button>
        <Button
          variant={value === 'poor' ? 'default' : 'outline'}
          onClick={() => onChange('poor')}
        >
          {t('q.credit.poor')}
        </Button>
        <Button
          variant={value === 'unknown' ? 'default' : 'outline'}
          onClick={() => onChange('unknown')}
        >
          {t('q.credit.unknown')}
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
        <Button onClick={onNext} disabled={!value}>
          {t('form.next')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default CreditQuestion;
