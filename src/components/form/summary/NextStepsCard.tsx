
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

interface NextStepsCardProps {
  onProceedToDocuments: () => void;
  onSendSummary: () => void;
  nextStepsPrompt: string;
}

const NextStepsCard = ({ onProceedToDocuments, onSendSummary, nextStepsPrompt }: NextStepsCardProps) => {
  const { language } = useLanguage();

  return (
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
            onClick={onSendSummary}
          >
            {language === 'en' ? 'Send Summary via Email/WhatsApp' : 'Enviar Resumen por Email/WhatsApp'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextStepsCard;
