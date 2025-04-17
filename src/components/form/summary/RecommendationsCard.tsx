
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Recommendation, RecommendationType } from '@/utils/qualificationUtils';
import { CreditCard, Wallet, BriefcaseBusiness, BadgeCheck, CheckCircle2, Clock } from 'lucide-react';

interface RecommendationsCardProps {
  recommendations: Recommendation[];
}

const RecommendationsCard = ({ recommendations }: RecommendationsCardProps) => {
  const { language } = useLanguage();

  const getRecommendationIcon = (type: RecommendationType) => {
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

  if (recommendations.length === 0) return null;

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-yellow-500" />
          {language === 'en' ? 'Recommendations' : 'Recomendaciones'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <div key={index} className="bg-muted/50 p-4 rounded-lg border border-muted">
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{getRecommendationIcon(rec.type)}</div>
                <div>
                  <h4 className="font-medium">{rec.title}</h4>
                  <p className="text-muted-foreground mt-1 text-sm">{rec.description}</p>
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
  );
};

export default RecommendationsCard;
