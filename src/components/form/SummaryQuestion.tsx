
import { Button } from "@/components/ui/button";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState, calculateClientRating } from "@/types/form";
import { getPositiveFactors, getQualificationSummary } from "@/utils/qualificationUtils";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, CheckCircle, ShieldCheck, Home } from "lucide-react";
import FeedbackBox from "./FeedbackBox";

export const SummaryQuestion = ({
  formData,
  onBack,
  currentStep,
  totalSteps
}: {
  formData: FormState;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  const rating = calculateClientRating(formData);
  const qualificationSummary = getQualificationSummary(formData, language === 'en' ? 'en' : 'es');
  const positiveFactors = getPositiveFactors(formData, language === 'en' ? 'en' : 'es');
  
  return (
    <QuestionContainer
      title={t('q.summary.title')}
      questionText={t('q.summary.question')}
      questionId="summary"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-8">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-3 text-gradient">{t('q.summary.score')}</h3>
          <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-br from-gallomodern-400 to-gallomodern-600 text-white text-3xl font-bold shadow-glow-sm animate-pulse-subtle">
            {rating.overall}
          </div>
        </div>
        
        <FeedbackBox message={qualificationSummary} variant={
          qualificationSummary.includes('✅') ? 'success' :
          qualificationSummary.includes('⚡') ? 'warning' : 'info'
        } />
        
        {positiveFactors.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-medium text-gallomodern-200 flex items-center gap-2">
              <ShieldCheck className="h-5 w-5" />
              {t('q.summary.positiveFactors')}
            </h4>
            <ul className="space-y-2.5 pl-2">
              {positiveFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-2.5 bg-gallomodern-900/20 p-2.5 rounded-md border-l-2 border-gallomodern-300/50">
                  <CheckCircle className="h-5 w-5 text-gallomodern-300 mt-0.5 flex-shrink-0" />
                  <span className="text-gallomodern-50">{factor}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        <div className="grid gap-4">
          <Button 
            variant="glow" 
            size="lg" 
            onClick={() => window.location.href = '/dashboard'}
            className="mt-4 py-6"
          >
            <Home className="mr-2 h-5 w-5" />
            {t('q.summary.complete')}
          </Button>
        </div>
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
      </div>
    </QuestionContainer>
  );
};

export default SummaryQuestion;
