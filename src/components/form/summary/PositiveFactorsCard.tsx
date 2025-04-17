
import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface PositiveFactorsCardProps {
  positiveFactors: string[];
}

const PositiveFactorsCard = ({ positiveFactors }: PositiveFactorsCardProps) => {
  const { language } = useLanguage();

  if (positiveFactors.length === 0) return null;

  return (
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
                <ShieldCheck className="h-4 w-4 text-green-500" />
              </div>
              <span>{factor}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default PositiveFactorsCard;
