import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

type IdType = 'SSN' | 'ITIN' | 'none';

export const IdTypeQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['idType'];
  onChange: (value: FormState['idType']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  
  const getFeedbackMessage = () => {
    if (language === 'es') {
      switch (value) {
        case "SSN":
          return "Todo en orden. Estás listo para comenzar. Vamos al paso siguiente.";
        case "ITIN":
          return "¿No tienes SSN? No pasa nada. Trabajamos con bancos que aceptan ITIN. Vamos a abrir esa puerta contigo.";
        case "none":
          return "Podemos ayudarte a sacar un ITIN o a conseguir un codeudor. Todos comienzan en algún punto. Te guiamos en cada paso.";
        default:
          return "";
      }
    } else {
      switch (value) {
        case "SSN":
          return "You're fully set. No roadblocks ahead — let's get started.";
        case "ITIN":
          return "No SSN? No problem. We've got ITIN-approved lenders. You're not locked out — let's open the door.";
        case "none":
          return "Let's work on getting you an ITIN or pair you with a co-borrower. Everyone starts somewhere. We'll walk you through it.";
        default:
          return "";
      }
    }
  };
  
  const handleValueChange = (newValue: string) => {
    // Ensure the value matches one of our allowed IdType values
    const typedValue = newValue as IdType;
    onChange(typedValue);
  };
  
  return (
    <QuestionContainer
      title={t('q.idType.title')}
      questionText={t('q.idType.question')}
      questionId="idtype"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <RadioGroup
          value={value || ""}
          onValueChange={handleValueChange}
        >
          <div className="flex items-center space-x-2 mb-4">
            <RadioGroupItem value="SSN" id="idType-ssn" />
            <Label htmlFor="idType-ssn">{t('q.idType.ssn')}</Label>
          </div>
          <div className="flex items-center space-x-2 mb-4">
            <RadioGroupItem value="ITIN" id="idType-itin" />
            <Label htmlFor="idType-itin">{t('q.idType.itin')}</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="none" id="idType-none" />
            <Label htmlFor="idType-none">{t('q.idType.none')}</Label>
          </div>
        </RadioGroup>
        
        {value && (
          <div className="mt-4 p-4 border border-[#fcf8c4] rounded-md bg-black text-[#fcf8c4]">
            <p className="font-medium">{getFeedbackMessage()}</p>
          </div>
        )}
        
        {value === "ITIN" && (
          <div className="text-sm p-3 rounded-md glass-card border border-blue-500/30 shadow-inner bg-blue-950/40">
            {t('q.idType.itinInfo')}
          </div>
        )}
        
        {value === "none" && (
          <div className="text-sm p-3 rounded-md glass-card border border-red-500/30 shadow-inner bg-red-950/40">
            {t('q.idType.noneWarning')}
          </div>
        )}
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('form.previous')}
        </Button>
        <Button onClick={onNext} disabled={value === null}>
          {t('form.next')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default IdTypeQuestion;
