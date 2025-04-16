
import { Button } from "@/components/ui/button";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState, calculateClientRating } from "@/types/form";
import { getPositiveFactors, getQualificationSummary } from "@/utils/qualificationUtils";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";

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
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-2xl font-bold mb-2">{t('q.summary.score')}</h3>
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary text-primary-foreground text-3xl font-bold">
            {rating.overall}
          </div>
        </div>
        
        <div className="p-4 border rounded-md bg-background">
          <p className="font-medium text-lg mb-4">{qualificationSummary}</p>
          
          {positiveFactors.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">{t('q.summary.positiveFactors')}</h4>
              <ul className="space-y-1">
                {positiveFactors.map((factor, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>{factor}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        <div className="grid gap-4">
          <Button variant="default" size="lg" onClick={() => window.location.href = '/dashboard'}>
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
