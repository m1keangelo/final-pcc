
import { ClientRating } from '@/types/clientRating';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useLanguage } from '@/contexts/LanguageContext';

interface ClientRatingCardProps {
  clientRating: ClientRating;
}

const ClientRatingCard = ({ clientRating }: ClientRatingCardProps) => {
  const { language } = useLanguage();

  const getRatingColor = (rating: number): string => {
    if (rating >= 8) return "bg-green-500";
    if (rating >= 6) return "bg-blue-500";
    if (rating >= 4) return "bg-yellow-500";
    return "bg-red-500";
  };

  const getRatingLabel = (rating: number): string => {
    if (rating >= 8) return language === 'en' ? "Excellent" : "Excelente";
    if (rating >= 6) return language === 'en' ? "Good" : "Bueno";
    if (rating >= 4) return language === 'en' ? "Fair" : "Regular";
    return language === 'en' ? "Poor" : "Malo";
  };

  return (
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
          {[
            { key: 'creditRating', labelEn: 'Credit', labelEs: 'Crédito' },
            { key: 'incomeRating', labelEn: 'Income', labelEs: 'Ingresos' },
            { key: 'downPaymentRating', labelEn: 'Down Payment', labelEs: 'Enganche' },
            { key: 'documentationRating', labelEn: 'Documentation', labelEs: 'Documentación' },
            { key: 'readinessRating', labelEn: 'Readiness', labelEs: 'Preparación' }
          ].map(({ key, labelEn, labelEs }) => (
            <div key={key}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium">
                  {language === 'en' ? labelEn : labelEs}: {clientRating[key as keyof ClientRating]}/10
                </span>
                <span className="text-sm font-medium">
                  {getRatingLabel(clientRating[key as keyof ClientRating])}
                </span>
              </div>
              <Progress 
                value={clientRating[key as keyof ClientRating] * 10} 
                className={`h-2 ${getRatingColor(clientRating[key as keyof ClientRating])}`} 
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientRatingCard;
