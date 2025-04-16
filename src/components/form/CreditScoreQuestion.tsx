
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const CreditScoreQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['creditScore'];
  onChange: (value: FormState['creditScore']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  const [sliderValue, setSliderValue] = useState(value || 650);
  
  const getCreditCategory = (score: number) => {
    if (score >= 750) return t('q.creditScore.excellent');
    if (score >= 700) return t('q.creditScore.good');
    if (score >= 650) return t('q.creditScore.fair');
    if (score >= 600) return t('q.creditScore.needsWork');
    return t('q.creditScore.poor');
  };
  
  const handleSliderChange = (val: number[]) => {
    const numVal = val[0];
    setSliderValue(numVal);
    onChange(numVal);
  };
  
  // Define feedback message based on credit score range
  const getFeedbackMessage = (score: number) => {
    if (score >= 760) {
      return "You're in VIP territory. Top-tier rates, premium approvals, and choice. We'll make sure the process moves just as smooth.";
    } else if (score >= 700) {
      return "Excellent standing. You qualify for most programs with favorable terms. Let's lock the best one before rates move.";
    } else if (score >= 640) {
      return "You're mortgage-ready. With a bit of strategy, you could hit even better pricing. Want us to simulate what would push you higher?";
    } else if (score >= 580) {
      return "You're in FHA's sweet spot. We'll pull every lever — grants, lender credits, rapid rescore. Let's get you in now, refinance later.";
    } else if (score >= 500) {
      return "We've got options — just need a bigger down or co-signer. We'll coach you. This isn't a dead-end — it's a detour. Let's map it.";
    } else {
      return "Not now, but not never. Give us 60–90 days and we'll build a step-by-step comeback plan. Real talk, real results.";
    }
  };
  
  return (
    <QuestionContainer
      title={t('q.creditScore.title')}
      questionText={t('q.creditScore.question')}
      questionId="creditscore"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="mt-4 mb-8">
          <div className="flex items-center justify-center mb-6">
            <div className="flex items-center justify-center bg-muted/30 p-3 rounded-full h-16 w-40 border border-primary/20">
              <span className="text-2xl font-semibold">{sliderValue}</span>
            </div>
          </div>
          
          <div className="pt-4">
            <Slider
              value={[sliderValue]}
              min={300}
              max={850}
              step={1}
              onValueChange={handleSliderChange}
              className="my-6"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>300</span>
              <span>850</span>
            </div>
          </div>
          
          <div className="text-center text-sm text-muted-foreground mt-4">
            {getCreditCategory(sliderValue)}
          </div>
          
          {/* Display feedback message based on credit score */}
          <div className="mt-4 p-4 border border-amber-200 rounded-md bg-amber-50">
            <p className="text-[#FFD700] font-medium">{getFeedbackMessage(sliderValue)}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {language === 'en' ? 'Back' : 'Atrás'}
        </Button>
        <Button onClick={onNext}>
          {language === 'en' ? 'Next' : 'Siguiente'}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default CreditScoreQuestion;
