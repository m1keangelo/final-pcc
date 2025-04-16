
import { Button } from "@/components/ui/button";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const EmploymentQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['employmentType'];
  onChange: (value: FormState['employmentType']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title={t('q.employment.title')}
      questionText={t('q.employment.question')}
      questionId="employment"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Button
          variant={value === 'W-2' ? 'default' : 'outline'}
          onClick={() => onChange('W-2')}
        >
          {t('q.employment.w2')}
        </Button>
        <Button
          variant={value === '1099' ? 'default' : 'outline'}
          onClick={() => onChange('1099')}
        >
          {t('q.employment.1099')}
        </Button>
        <Button
          variant={value === 'retired' ? 'default' : 'outline'}
          onClick={() => onChange('retired')}
        >
          {t('q.employment.retired')}
        </Button>
        <Button
          variant={value === 'unemployed' ? 'default' : 'outline'}
          onClick={() => onChange('unemployed')}
        >
          {t('q.employment.unemployed')}
        </Button>
        <Button
          variant={value === 'other' ? 'default' : 'outline'}
          onClick={() => onChange('other')}
        >
          {t('q.employment.other')}
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

export default EmploymentQuestion;
