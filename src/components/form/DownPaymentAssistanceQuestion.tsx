import { Button } from "@/components/ui/button";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const DownPaymentAssistanceQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['assistanceOpen'];
  onChange: (value: FormState['assistanceOpen']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  
  const getFeedbackMessage = () => {
    if (value === true) {
      return language === 'es' 
        ? "Excelente. Hay cientos de programas locales y nacionales. Vamos a ver cuáles aplican para ti y combinarlos."
        : "Love that. There are hundreds of programs — local, state, and federal — that you could tap into. Let's stack the ones you qualify for.";
    } else if (value === false) {
      return language === 'es'
        ? "Está perfecto. Usar tu propio dinero te da más control. ¿Quieres que te mostremos cómo sería ese tipo de préstamo?"
        : "Totally fine. Using your own funds gives you more flexibility. Want us to show what full-control financing would look like?";
    }
    return "";
  };
  
  return (
    <QuestionContainer
      title={t('q.assistance.title')}
      questionText={t('q.assistance.question')}
      questionId="assistance"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Button
          variant={value === true ? 'default' : 'outline'}
          onClick={() => onChange(true)}
        >
          {t('q.assistance.yes')}
        </Button>
        <Button
          variant={value === false ? 'default' : 'outline'}
          onClick={() => onChange(false)}
        >
          {t('q.assistance.no')}
        </Button>
        
        {value !== null && (
          <div className="mt-4 p-4 border border-[#fcf8c4] rounded-md bg-black text-[#fcf8c4]">
            <p className="font-medium">{getFeedbackMessage()}</p>
          </div>
        )}
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

export default DownPaymentAssistanceQuestion;
