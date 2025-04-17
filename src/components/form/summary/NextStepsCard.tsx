
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Share, FileText } from 'lucide-react';
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
      <CardHeader className="pb-2 bg-accent/5">
        <CardTitle className="flex items-center gap-2">
          <ArrowRight className="h-5 w-5 text-accent" />
          {language === 'en' ? 'Next Steps' : 'Próximos Pasos'}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <p className="mb-6 text-base">{nextStepsPrompt}</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <Button 
            onClick={onProceedToDocuments} 
            className="flex-1 bg-primary hover:bg-primary/90"
            size="lg"
          >
            <FileText className="mr-2 h-5 w-5" />
            {language === 'en' ? 'Proceed to Documents' : 'Proceder a Documentos'}
          </Button>
          <Button 
            variant="outline" 
            className="flex-1"
            size="lg"
            onClick={onSendSummary}
          >
            <Share className="mr-2 h-5 w-5" />
            {language === 'en' ? 'Send Summary' : 'Enviar Resumen'}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default NextStepsCard;
