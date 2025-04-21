
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import FeedbackBox from "./FeedbackBox";

export const EmploymentQuestion = ({
  value,
  otherEmploymentDetails,
  onChange,
  onChangeOtherDetails,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['employmentType'];
  otherEmploymentDetails?: string;
  onChange: (value: FormState['employmentType']) => void;
  onChangeOtherDetails?: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  const [showOtherInput, setShowOtherInput] = useState(value === 'other');
  
  // Handle the visibility of the "other" text field
  useEffect(() => {
    setShowOtherInput(value === 'other');
  }, [value]);
  
  // Function to check if the form can proceed
  const isFormValid = () => {
    // If "other" is selected, require the details field
    if (value === 'other') {
      return !!otherEmploymentDetails?.trim();
    }
    // For other options, just require a selection
    return !!value;
  };
  
  // Define feedback messages based on employment type selection
  const getFeedbackMessage = () => {
    if (language === 'es') {
      // Spanish feedback messages
      switch(value) {
        case 'W-2':
          return "Fácil de manejar. Tu ingreso estable ayuda bastante. Solo mándanos tu colilla de pago más reciente y empezamos el proceso.";
        case '1099':
          return "Tú manejas tu negocio. Usamos tus impuestos, tus depósitos bancarios y formas legales para mostrar todo lo que ganas.";
        case 'selfEmployed':
          return "Trabajar para ti mismo es genial. Necesitaremos tus declaraciones de impuestos de los últimos dos años y estados bancarios para demostrar ingresos estables.";
        case 'retired':
          return "Usamos tus ingresos fijos como pensión, seguro social o inversiones. Estos ingresos estables son perfectos para un préstamo.";
        case 'unemployed':
          return "Podríamos usar otros ingresos como manutención, asistencia o pensiones. También podemos explorar un co-firmante para ayudarte.";
        case 'other':
          return "Hay muchas formas de verificar tus ingresos. Cuéntanos más sobre tu situación y encontraremos el camino adecuado.";
        default:
          return "";
      }
    } else {
      // English feedback messages
      switch(value) {
        case 'W-2':
          return "Straightforward to handle. Your stable income is a plus. Just send over your most recent paystubs and we'll get started.";
        case '1099':
          return "You run your business. We'll use your tax returns, bank deposits, and legal forms to showcase all your income.";
        case 'selfEmployed':
          return "Being your own boss is great. We'll need your tax returns for the past two years and bank statements to prove stable income.";
        case 'retired':
          return "We'll use your fixed income sources like pensions, social security, or investments. These stable incomes work well for a loan.";
        case 'unemployed':
          return "We could use other income like alimony, assistance, or pensions. We can also explore a co-signer to help you qualify.";
        case 'other':
          return "There are many ways to verify income. Tell us more about your situation and we'll find the right path forward.";
        default:
          return "";
      }
    }
  };
  
  return (
    <QuestionContainer
      title={t('q.employment.title')}
      questionText={t('q.employment.question')}
      questionId="employment"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Button
          variant={value === 'W-2' ? 'default' : 'outline'}
          onClick={() => onChange('W-2')}
        >
          {t('q.employment.w2')}
        </Button>
        <Button
          variant={value === '1099' ? 'default' : 'outline'}
          onClick={() => onChange('1099')}
        >
          {t('q.employment.1099')}
        </Button>
        <Button
          variant={value === 'selfEmployed' ? 'default' : 'outline'}
          onClick={() => onChange('selfEmployed')}
        >
          {t('q.employment.selfEmployed')}
        </Button>
        <Button
          variant={value === 'retired' ? 'default' : 'outline'}
          onClick={() => onChange('retired')}
        >
          {t('q.employment.retired')}
        </Button>
        <Button
          variant={value === 'unemployed' ? 'default' : 'outline'}
          onClick={() => onChange('unemployed')}
        >
          {t('q.employment.unemployed')}
        </Button>
        <Button
          variant={value === 'other' ? 'default' : 'outline'}
          onClick={() => onChange('other')}
        >
          {t('q.employment.other')}
        </Button>
      </div>
      
      {showOtherInput && (
        <div className="mt-4">
          <Input
            value={otherEmploymentDetails || ''}
            onChange={(e) => onChangeOtherDetails && onChangeOtherDetails(e.target.value)}
            placeholder={t('q.employment.otherPlaceholder')}
            className="text-foreground"
          />
        </div>
      )}
      
      {value && (
        <FeedbackBox message={getFeedbackMessage()} />
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
        <Button onClick={onNext} disabled={!isFormValid()}>
          {t('form.next')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default EmploymentQuestion;
