import { FormState, ClientRating, calculateClientRating } from '@/types/form';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, AlertTriangle, Clock, ArrowRight, Users, BriefcaseBusiness, CreditCard, Wallet, BadgeCheck } from 'lucide-react';
import { Recommendation, getRecommendations, getQualificationSummary, getPositiveFactors, getNextStepsPrompt } from '@/utils/qualificationUtils';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useState, useEffect } from 'react';

interface SummaryOutcomeProps {
  formData: FormState;
  onProceedToDocuments: () => void;
}

const SummaryOutcome = ({ formData, onProceedToDocuments }: SummaryOutcomeProps) => {
  const { language, t } = useLanguage();
  const [animations, setAnimations] = useState<{[key: string]: string}>({
    ready: "/animations/qualified.gif",
    fixesNeeded: "/animations/fixes-needed.gif",
    notReady: "/animations/not-ready.gif"
  });
  const [showAnimation, setShowAnimation] = useState(true);
  
  const qualificationSummary = getQualificationSummary(formData, language);
  const recommendations = getRecommendations(formData, language);
  const positiveFactors = getPositiveFactors(formData, language);
  const nextStepsPrompt = getNextStepsPrompt(language);
  const clientRating = calculateClientRating(formData);
  
  // Get the qualification category to determine which animation to show
  const qualificationCategory = formData.creditCategory === 'poor' && !formData.downPaymentSaved 
    ? 'notReady' 
    : (formData.creditCategory === 'fair' || !formData.downPaymentSaved) 
      ? 'fixesNeeded' 
      : 'ready';
  
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

  // Get color for rating
  const getRatingColor = (rating: number): string => {
    if (rating >= 8) return "bg-green-500";
    if (rating >= 6) return "bg-blue-500";
    if (rating >= 4) return "bg-yellow-500";
    return "bg-red-500";
  };

  // Get label for rating
  const getRatingLabel = (rating: number): string => {
    if (rating >= 8) return language === 'en' ? "Excellent" : "Excelente";
    if (rating >= 6) return language === 'en' ? "Good" : "Bueno";
    if (rating >= 4) return language === 'en' ? "Fair" : "Regular";
    return language === 'en' ? "Poor" : "Malo";
  };

  // Get text color class based on qualification category
  const getSummaryTextColorClass = (): string => {
    if (qualificationCategory === 'ready') return 'text-green-700 dark:text-green-500';
    if (qualificationCategory === 'fixesNeeded') return 'text-amber-700 dark:text-amber-500';
    return 'text-red-700 dark:text-red-500';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Animation Area */}
      {showAnimation && (
        <div className="flex justify-center mb-6">
          <div className="relative w-64 h-64 rounded-lg overflow-hidden border-2 border-gallopurple">
            <img 
              src={animations[qualificationCategory]} 
              alt={qualificationCategory}
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
      <Alert className={`border-l-4 ${qualificationSummary.includes('✅') ? 'border-l-green-500 bg-green-50' : 'border-l-orange-500 bg-orange-50'} dark:bg-opacity-10`}>
        <AlertTitle className={`text-xl font-semibold ${getSummaryTextColorClass()}`}>
          {qualificationSummary}
        </AlertTitle>
      </Alert>

      {/* Client Rating Card */}
      <Card>
        <CardContent className="pt-6">
          <h3 className="text-lg font-medium mb-4">
            {language === 'en' ? 'Client Rating' : 'Calificación del Cliente'}
          </h3>
          
          <div className="mb-4 text-center">
            <div className="relative inline-block">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold text-white ${getRatingColor(clientRating.overall)}`}>
                {clientRating.overall}/10
              </div>
              <div className="mt-2 text-sm font-medium">
                {getRatingLabel(clientRating.overall)}
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">
                  {language === 'en' ? 'Credit' : 'Crédito'}: {clientRating.creditRating}/10
                </span>
                <span className="text-sm font-medium">
                  {getRatingLabel(clientRating.creditRating)}
                </span>
              </div>
              <Progress value={clientRating.creditRating * 10} className={`h-2 ${getRatingColor(clientRating.creditRating)}`} />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">
                  {language === 'en' ? 'Income' : 'Ingresos'}: {clientRating.incomeRating}/10
                </span>
                <span className="text-sm font-medium">
                  {getRatingLabel(clientRating.incomeRating)}
                </span>
              </div>
              <Progress value={clientRating.incomeRating * 10} className={`h-2 ${getRatingColor(clientRating.incomeRating)}`} />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">
                  {language === 'en' ? 'Down Payment' : 'Enganche'}: {clientRating.downPaymentRating}/10
                </span>
                <span className="text-sm font-medium">
                  {getRatingLabel(clientRating.downPaymentRating)}
                </span>
              </div>
              <Progress value={clientRating.downPaymentRating * 10} className={`h-2 ${getRatingColor(clientRating.downPaymentRating)}`} />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">
                  {language === 'en' ? 'Documentation' : 'Documentación'}: {clientRating.documentationRating}/10
                </span>
                <span className="text-sm font-medium">
                  {getRatingLabel(clientRating.documentationRating)}
                </span>
              </div>
              <Progress value={clientRating.documentationRating * 10} className={`h-2 ${getRatingColor(clientRating.documentationRating)}`} />
            </div>
            
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">
                  {language === 'en' ? 'Readiness' : 'Preparación'}: {clientRating.readinessRating}/10
                </span>
                <span className="text-sm font-medium">
                  {getRatingLabel(clientRating.readinessRating)}
                </span>
              </div>
              <Progress value={clientRating.readinessRating * 10} className={`h-2 ${getRatingColor(clientRating.readinessRating)}`} />
            </div>
          </div>
        </CardContent>
      </Card>

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
                      {rec.priority && (
                        <Badge 
                          className="mt-2"
                          variant={
                            rec.priority === 'high' ? 'destructive' : 
                            rec.priority === 'medium' ? 'warning' : 
                            'default'
                          }
                        >
                          {language === 'en' ? 
                            (rec.priority === 'high' ? 'High Priority' : 
                             rec.priority === 'medium' ? 'Medium Priority' : 
                             'Low Priority') : 
                            (rec.priority === 'high' ? 'Prioridad Alta' : 
                             rec.priority === 'medium' ? 'Prioridad Media' : 
                             'Prioridad Baja')
                          }
                        </Badge>
                      )}
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
