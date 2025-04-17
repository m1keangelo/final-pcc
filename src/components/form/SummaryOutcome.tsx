
import { useState, useEffect } from 'react';
import { FormState } from '@/types/form';
import { useLanguage } from '@/contexts/LanguageContext';
import { Alert, AlertTitle } from '@/components/ui/alert';
import { 
  calculateClientRating,
  getRecommendations, 
  getQualificationSummary, 
  getPositiveFactors, 
  getNextStepsPrompt
} from '@/utils/qualificationUtils';
import { toast } from 'sonner';
import ClientRatingCard from './summary/ClientRatingCard';
import PositiveFactorsCard from './summary/PositiveFactorsCard';
import RecommendationsCard from './summary/RecommendationsCard';
import NextStepsCard from './summary/NextStepsCard';
import PrequalificationResultsCard from './summary/PrequalificationResultsCard';
import QualificationAnalysisCard from './summary/QualificationAnalysisCard';

interface SummaryOutcomeProps {
  formData: FormState;
  onProceedToDocuments: () => void;
}

const SummaryOutcome = ({ formData, onProceedToDocuments }: SummaryOutcomeProps) => {
  const { language } = useLanguage();
  const [showAnimation, setShowAnimation] = useState(true);
  
  useEffect(() => {
    console.log("SummaryOutcome mounted with formData:", formData);
  }, []);
  
  // Calculate all needed data for the summary
  const clientRating = calculateClientRating(formData);
  const qualificationSummary = getQualificationSummary(formData, language === 'en' ? 'en' : 'es');
  const recommendations = getRecommendations(formData, language === 'en' ? 'en' : 'es');
  const positiveFactors = getPositiveFactors(formData, language === 'en' ? 'en' : 'es');
  const nextStepsPrompt = getNextStepsPrompt(language === 'en' ? 'en' : 'es');
  
  const handleSendSummary = () => {
    toast.success(
      language === 'en' 
        ? 'Summary has been sent successfully to your email and WhatsApp' 
        : 'El resumen ha sido enviado con éxito a su correo electrónico y WhatsApp'
    );
  };

  const getSummaryTextColorClass = (summary: string): string => {
    if (summary.includes('✅')) return 'text-green-700 dark:text-green-500';
    return 'text-amber-700 dark:text-amber-500';
  };

  const isQualified = qualificationSummary.includes('✅');

  console.log("SummaryOutcome rendering with data:", { 
    formData, 
    clientRating, 
    isQualified,
    qualificationSummary 
  });

  if (!formData.name) {
    console.warn("SummaryOutcome received incomplete form data");
    return (
      <div className="p-6 text-center">
        <Alert variant="destructive">
          <AlertTitle>Error: Incomplete form data</AlertTitle>
          <p>Please go back and complete the form properly.</p>
        </Alert>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in" data-testid="summary-outcome">
      <h2 className="text-2xl font-bold mb-4 text-center text-gallomodern-50">
        {language === 'en' ? 'Loan Prequalification Results' : 'Resultados de Precalificación de Préstamo'}
      </h2>

      {/* Animation Area */}
      {showAnimation && (
        <div className="flex justify-center mb-6">
          <div className="relative w-64 h-64 rounded-lg overflow-hidden border-2 border-gallopurple">
            <img 
              src={isQualified ? '/animations/qualified.gif' : '/animations/fixes-needed.gif'}
              alt="Qualification Status"
              className="w-full h-full object-cover"
              onError={() => setShowAnimation(false)}
            />
            <button 
              className="absolute top-2 right-2 bg-black bg-opacity-50 rounded-full p-1 text-white"
              onClick={() => setShowAnimation(false)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Qualification Summary Banner */}
      <Alert className={`border-l-4 ${isQualified ? 'border-l-green-500 bg-green-50' : 'border-l-orange-500 bg-orange-50'} dark:bg-opacity-10`}>
        <AlertTitle className={`text-xl font-semibold ${getSummaryTextColorClass(qualificationSummary)}`}>
          {qualificationSummary}
        </AlertTitle>
      </Alert>

      {/* Prequalification Results */}
      <PrequalificationResultsCard 
        formData={formData} 
        clientRating={clientRating} 
      />

      {/* Qualification Analysis */}
      <QualificationAnalysisCard 
        formData={formData} 
        clientRating={clientRating}
        isQualified={isQualified}
      />

      {/* Client Rating */}
      <ClientRatingCard clientRating={clientRating} />

      {/* Positive Factors */}
      <PositiveFactorsCard positiveFactors={positiveFactors} />

      {/* Recommendations */}
      <RecommendationsCard recommendations={recommendations} />

      {/* Next Steps */}
      <NextStepsCard 
        onProceedToDocuments={onProceedToDocuments}
        onSendSummary={handleSendSummary}
        nextStepsPrompt={nextStepsPrompt}
      />
    </div>
  );
};

export default SummaryOutcome;
