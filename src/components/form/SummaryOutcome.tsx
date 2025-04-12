
import { FormState } from '@/types/form';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, AlertTriangle, Clock, ArrowRight, Users, BriefcaseBusiness, CreditCard, Wallet, BadgeCheck } from 'lucide-react';
import { Recommendation, getRecommendations, getQualificationSummary, getPositiveFactors, getNextStepsPrompt } from '@/utils/qualificationUtils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface SummaryOutcomeProps {
  formData: FormState;
  onProceedToDocuments: () => void;
}

const SummaryOutcome = ({ formData, onProceedToDocuments }: SummaryOutcomeProps) => {
  const { language, t } = useLanguage();
  
  const qualificationSummary = getQualificationSummary(formData, language);
  const recommendations = getRecommendations(formData, language);
  const positiveFactors = getPositiveFactors(formData, language);
  const nextStepsPrompt = getNextStepsPrompt(language);
  
  // Helper function to get the icon based on recommendation type
  const getRecommendationIcon = (type: Recommendation['type']) => {
    switch (type) {
      case 'credit':
        return <CreditCard className="h-5 w-5 text-yellow-500" />;
      case 'downPayment':
        return <Wallet className="h-5 w-5 text-green-500" />;
      case 'employment':
        return <BriefcaseBusiness className="h-5 w-5 text-blue-500" />;
      case 'identity':
        return <BadgeCheck className="h-5 w-5 text-purple-500" />;
      case 'documentation':
        return <CheckCircle2 className="h-5 w-5 text-teal-500" />;
      case 'timeline':
        return <Clock className="h-5 w-5 text-cyan-500" />;
      default:
        return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Qualification Summary Banner */}
      <Alert className={`border-l-4 ${qualificationSummary.includes('✅') ? 'border-l-green-500 bg-green-50' : 'border-l-orange-500 bg-orange-50'} dark:bg-opacity-10`}>
        <AlertTitle className="text-xl font-semibold">
          {qualificationSummary}
        </AlertTitle>
      </Alert>

      {/* Positive Factors Section */}
      {positiveFactors.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <CheckCircle2 className="mr-2 h-5 w-5 text-green-500" />
              {language === 'en' ? 'Positive Factors' : 'Factores Positivos'}
            </h3>
            <ul className="space-y-2">
              {positiveFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-2">
                  <div className="min-w-[20px] pt-1">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  </div>
                  <span>{factor}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Recommendations Section */}
      {recommendations.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <AlertTriangle className="mr-2 h-5 w-5 text-yellow-500" />
              {language === 'en' ? 'Recommendations' : 'Recomendaciones'}
            </h3>
            <div className="space-y-4">
              {recommendations.map((rec, index) => (
                <div key={index} className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5">{getRecommendationIcon(rec.type)}</div>
                    <div>
                      <h4 className="font-medium">{rec.title}</h4>
                      <p className="text-muted-foreground mt-1">{rec.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Next Steps Section */}
      <Card className="border-2 border-accent">
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4 flex items-center">
            <ArrowRight className="mr-2 h-5 w-5 text-primary" />
            {language === 'en' ? 'Next Steps' : 'Próximos Pasos'}
          </h3>
          <p className="mb-6">{nextStepsPrompt}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={onProceedToDocuments} 
              className="flex-1 bg-primary hover:bg-primary/90"
            >
              {language === 'en' ? 'Yes, Proceed to Documents' : 'Sí, Proceder a Documentos'}
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
            >
              {language === 'en' ? 'Send Summary via Email/WhatsApp' : 'Enviar Resumen por Email/WhatsApp'}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryOutcome;
