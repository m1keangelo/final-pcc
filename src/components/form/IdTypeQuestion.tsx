
import { Button } from "@/components/ui/button";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const IdTypeQuestion = ({
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
  const { t } = useLanguage();
  
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
      
      {value === 'ITIN' && (
        <div className="mt-4 text-sm text-amber-600 bg-amber-50 p-3 rounded-md border border-amber-200">
          {t('q.idType.itinInfo')}
        </div>
      )}
      
      {value === 'none' && (
        <div className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded-md border border-red-200">
          {t('q.idType.noneWarning')}
        </div>
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
