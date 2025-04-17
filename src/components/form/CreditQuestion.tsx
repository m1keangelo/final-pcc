import { Button } from "@/components/ui/button";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

export const CreditQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['creditCategory'];
  onChange: (value: FormState['creditCategory']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  
  // Define feedback messages based on credit category
  const getFeedbackMessage = () => {
    if (language === 'es') {
      switch(value) {
        case 'excellent':
          return "Lo ganaste — ahora haremos que los prestamistas compitan por ti. Usaremos ese impulso para reducir costos y maximizar beneficios.";
        case 'good':
          return "Muy sólido. Estás en rango para tasas y flexibilidad excelentes. Con algunos ajustes, pasas a estatus premium. Vamos a impulsarlo.";
        case 'fair':
          return "Estás en el borde — y eso es bueno. Hemos ayudado a cientos a superar los límites. Uno o dos movimientos inteligentes podrían ahorrarte miles.";
        case 'poor':
          return "No estás solo — y no estás atascado. FHA todavía funciona. Tenemos trucos de crédito, estrategias de fianza y aumentos legales para subir rápido tu puntaje. Construyamos la escalera.";
        case 'unknown':
          return "Sin preocupaciones. Una consulta suave nos da una imagen real — sin impacto. Veamos dónde estás y construyamos el plan desde cero.";
        default:
          return "";
      }
    } else {
      switch(value) {
        case 'excellent':
          return "You earned it — now we'll make sure lenders compete for you. Let's use that leverage to reduce costs and maximize perks.";
        case 'good':
          return "Very solid. You're in range for great rates and flexibility. A few tweaks and you're premium status. Let's push it.";
        case 'fair':
          return "You're on the edge — and that's a good place. We've helped hundreds tip over into better brackets. One or two smart moves could save you thousands.";
        case 'poor':
          return "You're not alone — and you're not stuck. FHA still works. We've got credit hacks, piggyback tricks, and legal boosts to raise your score fast. Let's build the ladder out.";
        case 'unknown':
          return "No worries. A soft pull gives us a real snapshot — zero impact. Let's check where you stand and build the playbook from there.";
        default:
          return "";
      }
    }
  };
  
  return (
    <QuestionContainer
      title={t('q.credit.title')}
      questionText={t('q.credit.question')}
      questionId="credit"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Button
          variant={value === 'excellent' ? 'default' : 'outline'}
          onClick={() => onChange('excellent')}
        >
          {t('q.credit.excellent')}
        </Button>
        <Button
          variant={value === 'good' ? 'default' : 'outline'}
          onClick={() => onChange('good')}
        >
          {t('q.credit.good')}
        </Button>
        <Button
          variant={value === 'fair' ? 'default' : 'outline'}
          onClick={() => onChange('fair')}
        >
          {t('q.credit.fair')}
        </Button>
        <Button
          variant={value === 'poor' ? 'default' : 'outline'}
          onClick={() => onChange('poor')}
        >
          {t('q.credit.poor')}
        </Button>
        <Button
          variant={value === 'unknown' ? 'default' : 'outline'}
          onClick={() => onChange('unknown')}
        >
          {t('q.credit.unknown')}
        </Button>
      </div>
      
      {/* Display feedback message if an option is selected */}
      {value && (
        <div className="mt-4 p-4 border border-[#fef9be] rounded-md bg-black text-[#fef9be]">
          <p className="font-medium">{getFeedbackMessage()}</p>
        </div>
      )}
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('form.previous')}
        </Button>
        <Button onClick={onNext} disabled={!value}>
          {t('form.next')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default CreditQuestion;
