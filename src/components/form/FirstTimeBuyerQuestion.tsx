import { Button } from "@/components/ui/button";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import FeedbackBox from "./FeedbackBox";

export const FirstTimeBuyerQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['firstTimeBuyer'];
  onChange: (value: FormState['firstTimeBuyer']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  
  const getFeedbackMessage = () => {
    if (language === 'es') {
      // Spanish feedback messages
      if (value === true) {
        return "Ser primerizo no es malo. De hecho, hay beneficios especiales, ayudas y programas solo para ti. Nosotros te ayudamos a aprovechar todo eso. Lo hacemos juntos, paso a paso.";
      } else if (value === false) {
        return "La experiencia vale oro. Aprendemos de lo que ya viviste, mejoramos lo que falló y usamos lo que funcionó. Ya sabes cómo se mueve esto. Vamos a llevarlo al siguiente nivel.";
      }
    } else {
      // English feedback messages
      if (value === true) {
        return "First-time doesn't mean clueless — it means full access to exclusive perks, grants, and programs. We'll make sure you use every tool on the board. Let's unlock them together.";
      } else if (value === false) {
        return "Experience is gold. We'll respect your past, fix what didn't work, and sharpen what did. You already know the ropes — let's elevate your next move.";
      }
    }
    return "";
  };
  
  return (
    <QuestionContainer
      title={t('q.firsttime.title')}
      questionText={t('q.firsttime.question')}
      questionId="firsttime"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Button
          variant={value === true ? 'default' : 'outline'}
          onClick={() => onChange(true)}
          className={value === true ? "bg-gradient-to-r from-neon-purple to-neon-blue text-white" : ""}
        >
          {t('q.firsttime.yes')}
        </Button>
        <Button
          variant={value === false ? 'default' : 'outline'}
          onClick={() => onChange(false)}
          className={value === false ? "bg-gradient-to-r from-neon-purple to-neon-blue text-white" : ""}
        >
          {t('q.firsttime.no')}
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
        <Button 
          onClick={onNext}
          className="bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90"
        >
          {t('form.next')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default FirstTimeBuyerQuestion;
