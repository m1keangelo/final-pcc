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
  
  const getFeedbackMessage = () => {
    switch(value) {
      case 'immediately':
        return "Love the urgency. Let's lock in your pre-approval this week and line up properties so you're ready to move with confidence. Quick action = leverage. Let's make it count.";
      case '3months':
        return "Perfect window. We'll fine-tune your credit, docs, and buying power so when the time comes, you're bulletproof. If you're in a lease, keep in mind most apartments only require 60 days to break — and in some cases, we can help cover that.";
      case '3to6months':
        return "This is your prep season. We'll get strategic — clear old debts, boost savings, and tune your credit. If you're currently leasing, we can start working on exit strategies — most leases only ask for 2 months, and we may be able to assist.";
      case '6to12months':
        return "You're thinking ahead — and that's powerful. We'll craft a no-stress game plan that gets you lender-ready early so you can pounce on the right deal when it's time. Locked into a lease? Let's explore options now — some landlords accept buyouts, and we might help with that.";
      case 'exploring':
        return "No pressure here — just guidance. We'll give you the real numbers and facts so when you're ready, there's no guessing. Want us to build a 'what if' scenario just for you?";
      default:
        return "";
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
      
      {value && (
        <div className="mt-4 p-4 border border-yellow-500 rounded-md bg-black text-yellow-500">
          <p className="font-medium">{getFeedbackMessage()}</p>
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
        <Button onClick={onNext}>
          {t('form.next')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default TimelineQuestion;
