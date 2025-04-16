
import { Button } from "@/components/ui/button";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const TimelineQuestion = ({
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
  const { t } = useLanguage();
  
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
          {t('q.timeline.3months')}
        </Button>
        <Button
          variant={value === '3to6months' ? 'default' : 'outline'}
          onClick={() => onChange('3to6months')}
        >
          {t('q.timeline.3to6months')}
        </Button>
        <Button
          variant={value === '6to12months' ? 'default' : 'outline'}
          onClick={() => onChange('6to12months')}
        >
          {t('q.timeline.6to12months')}
        </Button>
        <Button
          variant={value === 'exploring' ? 'default' : 'outline'}
          onClick={() => onChange('exploring')}
        >
          {t('q.timeline.exploring')}
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
        <Button onClick={onNext}>
          {t('form.next')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default TimelineQuestion;
