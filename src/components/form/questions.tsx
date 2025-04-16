
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";

// Shared Question Props
interface QuestionProps {
  onNext: () => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
}

// Timeline Question
interface TimelineQuestionProps extends QuestionProps {
  value: string;
  onChange: (value: string) => void;
}

export const TimelineQuestion = ({ 
  value, 
  onChange, 
  onNext, 
  currentStep, 
  totalSteps 
}: TimelineQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? 'Timeline - Homebuying Plans' : 'Planes de Compra de Vivienda'}
      questionText={language === 'en' 
        ? 'How soon are you looking to buy a home?' 
        : '¿Qué tan pronto busca comprar una casa?'}
      questionId="timeline"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="text-muted-foreground text-[16px] bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
          {language === 'en' 
            ? 'We start by understanding your urgency as a buyer.'
            : 'Comenzamos averiguando su urgencia como comprador.'}
        </div>
        
        <RadioGroup 
          value={value} 
          onValueChange={onChange}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="immediate" id="immediate" />
            <Label htmlFor="immediate" className="flex-1 cursor-pointer">
              {language === 'en' ? 'Immediately (found a home)' : 'Inmediatamente (ya encontré una casa)'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="3months" id="3months" />
            <Label htmlFor="3months" className="flex-1 cursor-pointer">
              {language === 'en' ? 'Within 3 months' : 'Dentro de 3 meses'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="3-6months" id="3-6months" />
            <Label htmlFor="3-6months" className="flex-1 cursor-pointer">
              {language === 'en' ? '3-6 months' : '3-6 meses'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="6-12months" id="6-12months" />
            <Label htmlFor="6-12months" className="flex-1 cursor-pointer">
              {language === 'en' ? '6-12 months' : '6-12 meses'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="exploring" id="exploring" />
            <Label htmlFor="exploring" className="flex-1 cursor-pointer">
              {language === 'en' ? 'Just exploring/Not sure' : 'Solo explorando/No estoy seguro'}
            </Label>
          </div>
        </RadioGroup>
        
        <div className="flex justify-end">
          <Button 
            onClick={onNext} 
            disabled={!value}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Next' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </QuestionContainer>
  );
};

// First Time Buyer Question
interface FirstTimeBuyerQuestionProps extends QuestionProps {
  value: boolean | null;
  onChange: (value: boolean) => void;
}

export const FirstTimeBuyerQuestion = ({ 
  value, 
  onChange, 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}: FirstTimeBuyerQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? 'First-Time Buyer' : 'Comprador de Primera Vez'}
      questionText={language === 'en' 
        ? 'Have you purchased a home before, or would this be your first time buying?' 
        : '¿Ha comprado una casa antes, o esta sería su primera vez comprando?'}
      questionId="first-time-buyer"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="text-muted-foreground text-[16px] bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
          {language === 'en' 
            ? 'Identifying if you\'re a first-time buyer might qualify you for special programs.'
            : 'Identificar si es comprador de primera vez podría calificarlo para programas especiales.'}
        </div>
        
        <RadioGroup 
          value={value === null ? undefined : value.toString()} 
          onValueChange={(val) => onChange(val === "true")}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="true" id="first-time" />
            <Label htmlFor="first-time" className="flex-1 cursor-pointer">
              {language === 'en' ? 'First-time buyer' : 'Comprador de primera vez'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="false" id="previous-owner" />
            <Label htmlFor="previous-owner" className="flex-1 cursor-pointer">
              {language === 'en' ? 'Owned a home before' : 'He sido propietario antes'}
            </Label>
          </div>
        </RadioGroup>

        {value === true && (
          <div className="bg-green-50 dark:bg-green-950 p-4 rounded-md border border-green-200 dark:border-green-800">
            {language === 'en' 
              ? 'Great! There are programs for first-time buyers that help with low down payments.'
              : '¡Genial! Hay programas para compradores primerizos que ayudan con un pago inicial bajo.'}
          </div>
        )}
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Back' : 'Atrás'}
          </Button>
          <Button 
            onClick={onNext} 
            disabled={value === null}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Next' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </QuestionContainer>
  );
};

// Employment Question
interface EmploymentQuestionProps extends QuestionProps {
  value: string | null;
  onChange: (value: string) => void;
}

export const EmploymentQuestion = ({ 
  value, 
  onChange, 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}: EmploymentQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? 'Employment Status' : 'Situación Laboral'}
      questionText={language === 'en' 
        ? 'What is your current employment situation?' 
        : '¿Cuál es su situación laboral actual?'}
      questionId="employment"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="text-muted-foreground text-[16px] bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
          {language === 'en' 
            ? 'This tells us if you have stable income for the loan.'
            : 'Esto nos dice si tiene ingresos estables para el préstamo.'}
        </div>
        
        <RadioGroup 
          value={value || undefined} 
          onValueChange={onChange}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="w2" id="w2" />
            <Label htmlFor="w2" className="flex-1 cursor-pointer">
              {language === 'en' ? 'Employed (W-2)' : 'Empleado (W-2)'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="1099" id="1099" />
            <Label htmlFor="1099" className="flex-1 cursor-pointer">
              {language === 'en' ? 'Self-employed (1099)' : 'Trabajador autónomo (1099)'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="retired" id="retired" />
            <Label htmlFor="retired" className="flex-1 cursor-pointer">
              {language === 'en' ? 'Retired' : 'Jubilado'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="unemployed" id="unemployed" />
            <Label htmlFor="unemployed" className="flex-1 cursor-pointer">
              {language === 'en' ? 'Unemployed/No income' : 'Desempleado/Sin ingresos'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="other" id="other" />
            <Label htmlFor="other" className="flex-1 cursor-pointer">
              {language === 'en' ? 'Other' : 'Otro'}
            </Label>
          </div>
        </RadioGroup>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Back' : 'Atrás'}
          </Button>
          <Button 
            onClick={onNext} 
            disabled={!value}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Next' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </QuestionContainer>
  );
};

// Self Employed Years Question
interface SelfEmployedYearsQuestionProps extends QuestionProps {
  value: number | null;
  onChange: (value: number) => void;
}

export const SelfEmployedYearsQuestion = ({ 
  value, 
  onChange, 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}: SelfEmployedYearsQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? 'Self-Employment History' : 'Historial de Trabajo Autónomo'}
      questionText={language === 'en' 
        ? 'How long have you been self-employed?' 
        : '¿Hace cuánto trabaja por cuenta propia?'}
      questionId="self-employed-years"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="text-muted-foreground text-[16px] bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
          {language === 'en' 
            ? 'Lenders typically prefer at least 2 years of business history.'
            : 'Los prestamistas prefieren al menos 2 años de historial de negocio.'}
        </div>
        
        <RadioGroup 
          value={value?.toString() || undefined} 
          onValueChange={(val) => onChange(Number(val))}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="0" id="less-than-1" />
            <Label htmlFor="less-than-1" className="flex-1 cursor-pointer">
              {language === 'en' ? 'Less than 1 year' : 'Menos de 1 año'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="1" id="1-year" />
            <Label htmlFor="1-year" className="flex-1 cursor-pointer">
              {language === 'en' ? '1 year' : '1 año'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="2" id="2-years" />
            <Label htmlFor="2-years" className="flex-1 cursor-pointer">
              {language === 'en' ? '2 years' : '2 años'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="3" id="3-years-plus" />
            <Label htmlFor="3-years-plus" className="flex-1 cursor-pointer">
              {language === 'en' ? '3+ years' : '3+ años'}
            </Label>
          </div>
        </RadioGroup>

        {(value === 0 || value === 1) && (
          <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
            {language === 'en' 
              ? 'It can be harder to get a loan with less than 2 years self-employment. We might need a co-signer or a special program in that case.'
              : 'Con menos de 2 años como autónomo es más difícil calificar. Podríamos necesitar un co-firmante o un programa especial.'}
          </div>
        )}
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Back' : 'Atrás'}
          </Button>
          <Button 
            onClick={onNext} 
            disabled={value === null}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Next' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </QuestionContainer>
  );
};

// Income Question
interface IncomeQuestionProps extends QuestionProps {
  incomeValue: number | null;
  incomeTypeValue: string;
  onChangeIncome: (value: number) => void;
  onChangeIncomeType: (value: string) => void;
}

export const IncomeQuestion = ({ 
  incomeValue, 
  incomeTypeValue,
  onChangeIncome,
  onChangeIncomeType,
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}: IncomeQuestionProps) => {
  const { language } = useLanguage();
  const [incomeInput, setIncomeInput] = useState(incomeValue?.toString() || '');
  
  const handleIncomeChange = (value: string) => {
    setIncomeInput(value);
    const numberValue = value ? Number(value.replace(/[^0-9.]/g, '')) : 0;
    if (!isNaN(numberValue)) {
      onChangeIncome(numberValue);
    }
  };
  
  return (
    <QuestionContainer
      title={language === 'en' ? 'Income Level' : 'Nivel de Ingresos'}
      questionText={language === 'en' 
        ? 'Approximately how much do you earn?' 
        : '¿Aproximadamente cuánto gana?'}
      questionId="income"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="text-muted-foreground text-[16px] bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
          {language === 'en' 
            ? 'Gross income = before taxes. This helps estimate if you qualify for your desired loan amount.'
            : 'Ingreso bruto = antes de impuestos. Permite estimar si califica para el monto deseado.'}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="income-amount">{language === 'en' ? 'Income amount' : 'Cantidad de ingresos'}</Label>
          <div className="flex items-center gap-4">
            <Input
              id="income-amount"
              type="text"
              placeholder={language === 'en' ? 'Enter amount' : 'Ingrese cantidad'}
              value={incomeInput}
              onChange={(e) => handleIncomeChange(e.target.value)}
              className="flex-1"
            />
            <Select 
              value={incomeTypeValue} 
              onValueChange={onChangeIncomeType}
            >
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder={language === 'en' ? 'Select period' : 'Seleccione período'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annual">{language === 'en' ? 'Annual' : 'Anual'}</SelectItem>
                <SelectItem value="monthly">{language === 'en' ? 'Monthly' : 'Mensual'}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Back' : 'Atrás'}
          </Button>
          <Button 
            onClick={onNext} 
            disabled={incomeValue === null || incomeValue <= 0}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Next' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </QuestionContainer>
  );
};

// Credit Question
interface CreditQuestionProps extends QuestionProps {
  value: string | null;
  onChange: (value: string) => void;
}

export const CreditQuestion = ({ 
  value, 
  onChange, 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}: CreditQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? 'Credit Score/History' : 'Puntaje/Historial de Crédito'}
      questionText={language === 'en' 
        ? 'Do you know your approximate credit score? If not, how would you describe your credit?' 
        : '¿Sabe aproximadamente cuál es su puntaje de crédito? Si no lo sabe: ¿cómo describiría su crédito?'}
      questionId="credit"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="text-muted-foreground text-[16px] bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
          {language === 'en' 
            ? 'Credit categories: Excellent ~740+, Good ~700-739, Fair ~660-699, Poor <660.'
            : 'Categorías de crédito: Excelente ~740+, Bueno ~700-739, Regular ~660-699, Bajo <660.'}
        </div>
        
        <RadioGroup 
          value={value || undefined} 
          onValueChange={onChange}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="excellent" id="excellent" />
            <Label htmlFor="excellent" className="flex-1 cursor-pointer">
              {language === 'en' ? 'Excellent (740+)' : 'Excelente (740+)'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="good" id="good" />
            <Label htmlFor="good" className="flex-1 cursor-pointer">
              {language === 'en' ? 'Good (700-739)' : 'Bueno (700-739)'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="fair" id="fair" />
            <Label htmlFor="fair" className="flex-1 cursor-pointer">
              {language === 'en' ? 'Fair (660-699)' : 'Regular (660-699)'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="poor" id="poor" />
            <Label htmlFor="poor" className="flex-1 cursor-pointer">
              {language === 'en' ? 'Poor (<660)' : 'Bajo (<660)'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="unknown" id="unknown" />
            <Label htmlFor="unknown" className="flex-1 cursor-pointer">
              {language === 'en' ? 'Not sure/No credit' : 'No estoy seguro/Sin crédito'}
            </Label>
          </div>
        </RadioGroup>

        {value === 'poor' && (
          <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
            {language === 'en' 
              ? 'There are ways to improve a low credit score. For example, being added as an authorized user on someone else\'s credit card can quickly boost your score. Paying down credit balances helps too.'
              : 'Hay formas de mejorar un puntaje bajo. Por ejemplo, ser añadido como usuario autorizado en la tarjeta de crédito de otra persona puede subir su puntaje rápidamente. También ayudaría bajar sus deudas de tarjeta.'}
          </div>
        )}
        
        {value === 'unknown' && (
          <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
            {language === 'en' 
              ? 'Would you say you\'ve generally paid bills on time and kept balances low?'
              : '¿Diría que generalmente paga sus cuentas a tiempo y mantiene bajas sus deudas?'}
          </div>
        )}
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Back' : 'Atrás'}
          </Button>
          <Button 
            onClick={onNext} 
            disabled={!value}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Next' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </QuestionContainer>
  );
};

// Credit Score Question
interface CreditScoreQuestionProps extends QuestionProps {
  value: number | null;
  onChange: (value: number) => void;
}

export const CreditScoreQuestion = ({ 
  value, 
  onChange, 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}: CreditScoreQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? 'Specific Credit Score' : 'Puntaje de Crédito Específico'}
      questionText={language === 'en' 
        ? 'If you know your credit score, what is the approximate range?' 
        : 'Si conoce su puntaje de crédito, ¿cuál es el rango aproximado?'}
      questionId="credit-score"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <RadioGroup 
          value={value?.toString() || undefined} 
          onValueChange={(val) => onChange(Number(val))}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="800" id="score-800" />
            <Label htmlFor="score-800" className="flex-1 cursor-pointer">
              800+
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="750" id="score-750" />
            <Label htmlFor="score-750" className="flex-1 cursor-pointer">
              750-799
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="700" id="score-700" />
            <Label htmlFor="score-700" className="flex-1 cursor-pointer">
              700-749
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="650" id="score-650" />
            <Label htmlFor="score-650" className="flex-1 cursor-pointer">
              650-699
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="600" id="score-600" />
            <Label htmlFor="score-600" className="flex-1 cursor-pointer">
              600-649
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="550" id="score-550" />
            <Label htmlFor="score-550" className="flex-1 cursor-pointer">
              550-599
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="500" id="score-500" />
            <Label htmlFor="score-500" className="flex-1 cursor-pointer">
              Below 550
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="0" id="score-unknown" />
            <Label htmlFor="score-unknown" className="flex-1 cursor-pointer">
              {language === 'en' ? 'Not sure' : 'No estoy seguro'}
            </Label>
          </div>
        </RadioGroup>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Back' : 'Atrás'}
          </Button>
          <Button 
            onClick={onNext} 
            disabled={value === null}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Next' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </QuestionContainer>
  );
};

// Down Payment Question
interface DownPaymentQuestionProps extends QuestionProps {
  value: boolean | null;
  onChange: (value: boolean) => void;
}

export const DownPaymentQuestion = ({ 
  value, 
  onChange, 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}: DownPaymentQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? 'Down Payment Availability' : 'Disponibilidad de Pago Inicial'}
      questionText={language === 'en' 
        ? 'Do you have savings for a down payment?' 
        : '¿Tiene ahorros para el pago inicial (enganche)?'}
      questionId="down-payment"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="text-muted-foreground text-[16px] bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
          {language === 'en' 
            ? 'Down payment = your own money for the purchase. Important for determining loan type.'
            : 'Pago inicial = dinero propio para la compra. Importante para el tipo de préstamo.'}
        </div>
        
        <RadioGroup 
          value={value === null ? undefined : value.toString()} 
          onValueChange={(val) => onChange(val === "true")}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="true" id="has-down-payment" />
            <Label htmlFor="has-down-payment" className="flex-1 cursor-pointer">
              {language === 'en' ? 'Yes, I have savings' : 'Sí, tengo ahorros'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="false" id="no-down-payment" />
            <Label htmlFor="no-down-payment" className="flex-1 cursor-pointer">
              {language === 'en' ? 'No, I don\'t have savings yet' : 'No, aún no tengo ahorros'}
            </Label>
          </div>
        </RadioGroup>

        {value === false && (
          <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
            {language === 'en' 
              ? 'No worries. Some loan programs allow very low or even no down payment (for example, VA loans for veterans) and there are down payment assistance programs that can help. You could also use a gift from a family member if available.'
              : 'No se preocupe. Algunos programas permiten un enganche muy bajo o incluso cero (por ejemplo, préstamos VA para veteranos), y existen programas de asistencia para el enganche que pueden ayudar. También podría usar ayuda/regalo de un familiar si es posible.'}
          </div>
        )}
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Back' : 'Atrás'}
          </Button>
          <Button 
            onClick={onNext} 
            disabled={value === null}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Next' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </QuestionContainer>
  );
};

// Down Payment Amount Question
interface DownPaymentAmountQuestionProps extends QuestionProps {
  value: number | null;
  onChange: (value: number) => void;
}

export const DownPaymentAmountQuestion = ({ 
  value, 
  onChange, 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}: DownPaymentAmountQuestionProps) => {
  const { language } = useLanguage();
  const [amountInput, setAmountInput] = useState(value?.toString() || '');
  
  const handleAmountChange = (value: string) => {
    setAmountInput(value);
    const numberValue = value ? Number(value.replace(/[^0-9.]/g, '')) : 0;
    if (!isNaN(numberValue)) {
      onChange(numberValue);
    }
  };
  
  return (
    <QuestionContainer
      title={language === 'en' ? 'Down Payment Amount' : 'Monto del Pago Inicial'}
      questionText={language === 'en' 
        ? 'How much do you have saved for a down payment?' 
        : '¿Cuánto tiene ahorrado para el pago inicial?'}
      questionId="down-payment-amount"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="down-payment-amount">
            {language === 'en' ? 'Amount saved' : 'Monto ahorrado'}
          </Label>
          <div className="flex items-center">
            <span className="p-2 bg-muted border-r-0 border rounded-l-md">$</span>
            <Input
              id="down-payment-amount"
              type="text"
              placeholder={language === 'en' ? 'Enter amount' : 'Ingrese cantidad'}
              value={amountInput}
              onChange={(e) => handleAmountChange(e.target.value)}
              className="rounded-l-none"
            />
          </div>
        </div>

        {value !== null && value < 10000 && (
          <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
            {language === 'en' 
              ? 'There are loans with minimum ~3%–3.5% down for first-time buyers. We might need to combine your funds with an assistance program to reach that minimum if necessary.'
              : 'Hay préstamos con mínimo ~3%–3.5% de enganche para compradores primerizos. Quizá necesitemos combinar sus fondos con algún programa de asistencia para llegar a ese mínimo si es necesario.'}
          </div>
        )}

        {value !== null && value >= 50000 && (
          <div className="bg-green-50 dark:bg-green-950 p-4 rounded-md border border-green-200 dark:border-green-800">
            {language === 'en' 
              ? 'Great! A larger down payment gives you more loan options and lower monthly payments (20% or more can eliminate mortgage insurance).'
              : '¡Excelente! Un enganche mayor le brinda más opciones de préstamo y pagos mensuales más bajos (20% o más evita el seguro hipotecario).'}
          </div>
        )}
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Back' : 'Atrás'}
          </Button>
          <Button 
            onClick={onNext} 
            disabled={value === null || value <= 0}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Next' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </QuestionContainer>
  );
};

// Down Payment Assistance Question
interface DownPaymentAssistanceQuestionProps extends QuestionProps {
  value: boolean | null;
  onChange: (value: boolean) => void;
}

export const DownPaymentAssistanceQuestion = ({ 
  value, 
  onChange, 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}: DownPaymentAssistanceQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? 'Down Payment Assistance' : 'Asistencia para Pago Inicial'}
      questionText={language === 'en' 
        ? 'Would you be open to using down payment assistance programs?' 
        : '¿Estaría dispuesto a usar programas de asistencia para el pago inicial?'}
      questionId="assistance"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="text-muted-foreground text-[16px] bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
          {language === 'en' 
            ? 'Down payment assistance programs can help first-time buyers with grants or low-interest loans to cover part of the down payment.'
            : 'Los programas de asistencia para el pago inicial pueden ayudar a compradores primerizos con subsidios o préstamos de bajo interés para cubrir parte del enganche.'}
        </div>
        
        <RadioGroup 
          value={value === null ? undefined : value.toString()} 
          onValueChange={(val) => onChange(val === "true")}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="true" id="open-to-assistance" />
            <Label htmlFor="open-to-assistance" className="flex-1 cursor-pointer">
              {language === 'en' ? 'Yes, I\'m open to assistance' : 'Sí, estoy dispuesto a recibir asistencia'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="false" id="no-assistance" />
            <Label htmlFor="no-assistance" className="flex-1 cursor-pointer">
              {language === 'en' ? 'No, I\'d rather save up first' : 'No, prefiero ahorrar primero'}
            </Label>
          </div>
        </RadioGroup>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Back' : 'Atrás'}
          </Button>
          <Button 
            onClick={onNext} 
            disabled={value === null}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Next' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </QuestionContainer>
  );
};

// Monthly Debts Question
interface MonthlyDebtsQuestionProps extends QuestionProps {
  value: string;
  onChange: (value: string) => void;
}

export const MonthlyDebtsQuestion = ({ 
  value, 
  onChange, 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}: MonthlyDebtsQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? 'Monthly Debts & Obligations' : 'Deudas y Obligaciones Mensuales'}
      questionText={language === 'en' 
        ? 'What other monthly debts or obligations do you have?' 
        : '¿Qué otras deudas u obligaciones mensuales tiene?'}
      questionId="monthly-debts"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="text-muted-foreground text-[16px] bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
          {language === 'en' 
            ? 'For example: car loans, student loans, credit card payments, child support, etc. This helps calculate your monthly debt burden.'
            : 'Por ejemplo: préstamos de auto, préstamos estudiantiles, pagos de tarjeta de crédito, manutención de niños, etc. Esto nos ayuda a calcular su carga mensual de deudas.'}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="debts-text">
            {language === 'en' ? 'List your monthly debts' : 'Enumere sus deudas mensuales'}
          </Label>
          <textarea
            id="debts-text"
            placeholder={language === 'en' 
              ? 'Example: Car $300, Student loan $200, Credit cards $150, etc. Or type "None" if you have no monthly debts.' 
              : 'Ejemplo: Auto $300, Préstamo estudiantil $200, Tarjetas $150, etc. O escriba "Ninguna" si no tiene deudas mensuales.'}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full min-h-[120px] p-3 border rounded-md"
          />
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Back' : 'Atrás'}
          </Button>
          <Button 
            onClick={onNext} 
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Next' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </QuestionContainer>
  );
};

// Credit Issues Question
interface CreditIssuesQuestionProps extends QuestionProps {
  value: boolean | null;
  onChange: (value: boolean) => void;
}

export const CreditIssuesQuestion = ({ 
  value, 
  onChange, 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}: CreditIssuesQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? 'Credit Issues (Derogatories)' : 'Problemas de Crédito'}
      questionText={language === 'en' 
        ? 'Have you had any serious credit issues in the past?' 
        : '¿Ha tenido algún problema serio de crédito en el pasado?'}
      questionId="credit-issues"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="text-muted-foreground text-[16px] bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
          {language === 'en' 
            ? 'For example: collections, bankruptcy, foreclosure. Serious issues might require resolving debts or waiting a certain period before getting a loan.'
            : 'Por ejemplo: cuentas en cobranza, bancarrota, ejecución hipotecaria. Problemas serios pueden requerir resolver deudas o esperar cierto tiempo antes de obtener un préstamo.'}
        </div>
        
        <RadioGroup 
          value={value === null ? undefined : value.toString()} 
          onValueChange={(val) => onChange(val === "true")}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="true" id="has-credit-issues" />
            <Label htmlFor="has-credit-issues" className="flex-1 cursor-pointer">
              {language === 'en' ? 'Yes, I\'ve had credit issues' : 'Sí, he tenido problemas de crédito'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="false" id="no-credit-issues" />
            <Label htmlFor="no-credit-issues" className="flex-1 cursor-pointer">
              {language === 'en' ? 'No, my credit history is clean' : 'No, mi historial de crédito está limpio'}
            </Label>
          </div>
        </RadioGroup>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Back' : 'Atrás'}
          </Button>
          <Button 
            onClick={onNext} 
            disabled={value === null}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Next' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </QuestionContainer>
  );
};

// Credit Issue Details Question
interface CreditIssueDetailsQuestionProps extends QuestionProps {
  type: string | null;
  year: number | null;
  amount: number | null;
  onChangeType: (value: string) => void;
  onChangeYear: (value: number) => void;
  onChangeAmount: (value: number) => void;
}

export const CreditIssueDetailsQuestion = ({ 
  type, 
  year, 
  amount,
  onChangeType,
  onChangeYear,
  onChangeAmount,
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}: CreditIssueDetailsQuestionProps) => {
  const { language } = useLanguage();
  const [amountInput, setAmountInput] = useState(amount?.toString() || '');
  
  const handleAmountChange = (value: string) => {
    setAmountInput(value);
    const numberValue = value ? Number(value.replace(/[^0-9.]/g, '')) : 0;
    if (!isNaN(numberValue)) {
      onChangeAmount(numberValue);
    }
  };
  
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);
  
  return (
    <QuestionContainer
      title={language === 'en' ? 'Credit Issue Details' : 'Detalles del Problema de Crédito'}
      questionText={language === 'en' 
        ? 'Please share more details about your credit issues' 
        : 'Por favor comparta más detalles sobre sus problemas de crédito'}
      questionId="credit-issue-details"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="issue-type">
              {language === 'en' ? 'Type of issue' : 'Tipo de problema'}
            </Label>
            <Select 
              value={type || ''} 
              onValueChange={onChangeType}
            >
              <SelectTrigger id="issue-type">
                <SelectValue placeholder={language === 'en' ? 'Select issue type' : 'Seleccione tipo de problema'} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="bankruptcy">{language === 'en' ? 'Bankruptcy' : 'Bancarrota'}</SelectItem>
                <SelectItem value="foreclosure">{language === 'en' ? 'Foreclosure' : 'Ejecución hipotecaria'}</SelectItem>
                <SelectItem value="collections">{language === 'en' ? 'Collections' : 'Cuentas en cobranza'}</SelectItem>
                <SelectItem value="chargeoffs">{language === 'en' ? 'Charge-offs' : 'Deudas canceladas'}</SelectItem>
                <SelectItem value="latePayments">{language === 'en' ? 'Late payments' : 'Pagos atrasados'}</SelectItem>
                <SelectItem value="other">{language === 'en' ? 'Other' : 'Otro'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="issue-year">
              {language === 'en' ? 'When did this occur?' : '¿Cuándo ocurrió?'}
            </Label>
            <Select 
              value={year?.toString() || ''} 
              onValueChange={(val) => onChangeYear(Number(val))}
            >
              <SelectTrigger id="issue-year">
                <SelectValue placeholder={language === 'en' ? 'Select year' : 'Seleccione año'} />
              </SelectTrigger>
              <SelectContent>
                {years.map((y) => (
                  <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                ))}
                <SelectItem value="0">{language === 'en' ? 'Earlier' : 'Anterior'}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="issue-amount">
              {language === 'en' ? 'Approximate amount involved' : 'Monto aproximado involucrado'}
            </Label>
            <div className="flex items-center">
              <span className="p-2 bg-muted border-r-0 border rounded-l-md">$</span>
              <Input
                id="issue-amount"
                type="text"
                placeholder={language === 'en' ? 'Enter amount' : 'Ingrese cantidad'}
                value={amountInput}
                onChange={(e) => handleAmountChange(e.target.value)}
                className="rounded-l-none"
              />
            </div>
          </div>
        </div>

        {type === 'bankruptcy' && year && (currentYear - year) < 4 && (
          <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
            {language === 'en' 
              ? 'Most loan programs require a waiting period after bankruptcy. Typically it\'s at least 2 years for FHA/VA loans and up to 4 years for conventional loans.'
              : 'La mayoría de los programas exigen un tiempo de espera después de una bancarrota. Típicamente es al menos 2 años para préstamos FHA/VA y hasta 4 años para préstamos convencionales.'}
          </div>
        )}
        
        {type === 'foreclosure' && year && (currentYear - year) < 7 && (
          <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
            {language === 'en' 
              ? 'After a foreclosure, conventional loans usually require a 7-year waiting period, while FHA loans might require 3 years.'
              : 'Después de una ejecución hipotecaria, los préstamos convencionales generalmente requieren un período de espera de 7 años, mientras que los préstamos FHA podrían requerir 3 años.'}
          </div>
        )}
        
        {type === 'collections' && (
          <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
            {language === 'en' 
              ? 'Collections may need to be paid off or settled before loan approval. Medical collections under $500 might not impact your application as much.'
              : 'Las cuentas en cobranza podrían necesitar ser pagadas o resueltas antes de la aprobación del préstamo. Las deudas médicas menores a $500 podrían no impactar tanto su solicitud.'}
          </div>
        )}
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Back' : 'Atrás'}
          </Button>
          <Button 
            onClick={onNext} 
            disabled={!type || !year || !amount}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Next' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </QuestionContainer>
  );
};

// ID Type Question
interface IdTypeQuestionProps extends QuestionProps {
  value: string | null;
  onChange: (value: string) => void;
}

export const IdTypeQuestion = ({ 
  value, 
  onChange, 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}: IdTypeQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? 'ID Verification' : 'Verificación de ID'}
      questionText={language === 'en' 
        ? 'Do you have a Social Security Number (SSN) or ITIN (Individual Taxpayer Identification Number)?' 
        : '¿Tiene un Número de Seguro Social (SSN) o un ITIN (Número de Identificación Personal de Contribuyente)?'}
      questionId="id-type"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="text-muted-foreground text-[16px] bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
          {language === 'en' 
            ? 'A valid SSN or ITIN is needed to apply for a mortgage in the U.S.'
            : 'Se necesita un SSN o ITIN válido para solicitar una hipoteca en EE.UU.'}
        </div>
        
        <RadioGroup 
          value={value || undefined} 
          onValueChange={onChange}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="ssn" id="has-ssn" />
            <Label htmlFor="has-ssn" className="flex-1 cursor-pointer">
              {language === 'en' ? 'I have a SSN' : 'Tengo un SSN'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="itin" id="has-itin" />
            <Label htmlFor="has-itin" className="flex-1 cursor-pointer">
              {language === 'en' ? 'I have an ITIN' : 'Tengo un ITIN'}
            </Label>
          </div>
          
          <div className="flex items-center space-x-2 p-4 border rounded-md hover:bg-muted/50">
            <RadioGroupItem value="none" id="no-id" />
            <Label htmlFor="no-id" className="flex-1 cursor-pointer">
              {language === 'en' ? 'I don\'t have either' : 'No tengo ninguno'}
            </Label>
          </div>
        </RadioGroup>

        {value === 'itin' && (
          <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-md border border-yellow-200 dark:border-yellow-800">
            {language === 'en' 
              ? 'We can work with an ITIN. There are special loan programs for ITIN holders, though they often require a larger down payment (sometimes 15-20% minimum).'
              : 'Podemos proceder con un ITIN. Hay programas de préstamo especiales para quienes tienen ITIN, aunque a menudo requieren un enganche más grande (a veces mínimo 15-20%).'}
          </div>
        )}

        {value === 'none' && (
          <div className="bg-red-50 dark:bg-red-950 p-4 rounded-md border border-red-200 dark:border-red-800">
            {language === 'en' 
              ? 'Since you don\'t have an SSN or ITIN, we won\'t be able to get a mortgage at this time. We recommend obtaining an ITIN or adding a co-borrower who has an SSN before moving forward.'
              : 'Como no tiene SSN ni ITIN, no podremos conseguir una hipoteca en este momento. Le recomendamos obtener un ITIN o añadir un co-prestatario con SSN antes de avanzar.'}
          </div>
        )}
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Back' : 'Atrás'}
          </Button>
          <Button 
            onClick={onNext} 
            disabled={!value}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Next' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </QuestionContainer>
  );
};

// Contact Info Question
interface ContactInfoQuestionProps extends QuestionProps {
  name: string;
  phone: string;
  email: string;
  comments: string;
  onChangeName: (value: string) => void;
  onChangePhone: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangeComments: (value: string) => void;
}

export const ContactInfoQuestion = ({ 
  name, 
  phone, 
  email,
  comments,
  onChangeName,
  onChangePhone,
  onChangeEmail,
  onChangeComments,
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}: ContactInfoQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? 'Contact Information' : 'Información de Contacto'}
      questionText={language === 'en' 
        ? 'Please provide your contact information' 
        : 'Por favor proporcione su información de contacto'}
      questionId="contact-info"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              {language === 'en' ? 'Full Name' : 'Nombre Completo'}
            </Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => onChangeName(e.target.value)}
              placeholder={language === 'en' ? 'Enter your full name' : 'Ingrese su nombre completo'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">
              {language === 'en' ? 'Phone Number' : 'Número de Teléfono'}
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => onChangePhone(e.target.value)}
              placeholder={language === 'en' ? 'Enter your phone number' : 'Ingrese su número de teléfono'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              {language === 'en' ? 'Email' : 'Correo Electrónico'}
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => onChangeEmail(e.target.value)}
              placeholder={language === 'en' ? 'Enter your email' : 'Ingrese su correo electrónico'}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="comments">
              {language === 'en' ? 'Additional Comments (Optional)' : 'Comentarios Adicionales (Opcional)'}
            </Label>
            <textarea
              id="comments"
              placeholder={language === 'en' 
                ? 'Any other information you\'d like to share' 
                : 'Cualquier otra información que le gustaría compartir'}
              value={comments}
              onChange={(e) => onChangeComments(e.target.value)}
              className="w-full min-h-[100px] p-3 border rounded-md"
            />
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Back' : 'Atrás'}
          </Button>
          <Button 
            onClick={onNext} 
            disabled={!name || !phone || !email}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Complete' : 'Completar'}
          </Button>
        </div>
      </div>
    </QuestionContainer>
  );
};

// Summary Question
interface SummaryQuestionProps extends Omit<QuestionProps, 'onNext'> {
  formData: FormState;
}

export const SummaryQuestion = ({ 
  formData, 
  onBack, 
  currentStep, 
  totalSteps 
}: SummaryQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? 'Application Summary' : 'Resumen de Solicitud'}
      questionText={language === 'en' 
        ? 'Review your application information' 
        : 'Revise la información de su solicitud'}
      questionId="summary"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <h4 className="font-medium">{language === 'en' ? 'Timeline' : 'Cronograma'}</h4>
            <p>{formData.timeline}</p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">{language === 'en' ? 'First Time Buyer' : 'Comprador de Primera Vez'}</h4>
            <p>{formData.firstTimeBuyer ? 'Yes' : 'No'}</p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">{language === 'en' ? 'Employment' : 'Empleo'}</h4>
            <p>{formData.employmentType}</p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">{language === 'en' ? 'Income' : 'Ingresos'}</h4>
            <p>${formData.income} ({formData.incomeType})</p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">{language === 'en' ? 'Credit Category' : 'Categoría de Crédito'}</h4>
            <p>{formData.creditCategory}</p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">{language === 'en' ? 'Down Payment Saved' : 'Pago Inicial Ahorrado'}</h4>
            <p>{formData.downPaymentSaved ? `$${formData.downPaymentAmount}` : 'No'}</p>
          </div>
          
          {!formData.downPaymentSaved && (
            <div className="space-y-2">
              <h4 className="font-medium">{language === 'en' ? 'Open to Assistance' : 'Abierto a Asistencia'}</h4>
              <p>{formData.assistanceOpen ? 'Yes' : 'No'}</p>
            </div>
          )}
          
          <div className="space-y-2">
            <h4 className="font-medium">{language === 'en' ? 'Monthly Debts' : 'Deudas Mensuales'}</h4>
            <p>{formData.monthlyDebts || 'None'}</p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">{language === 'en' ? 'Credit Issues' : 'Problemas de Crédito'}</h4>
            <p>{formData.hasCreditIssues ? 'Yes' : 'No'}</p>
          </div>
          
          {formData.hasCreditIssues && (
            <div className="space-y-2">
              <h4 className="font-medium">{language === 'en' ? 'Credit Issue Details' : 'Detalles del Problema de Crédito'}</h4>
              <p>{formData.creditIssueType} - {formData.creditIssueYear} - ${formData.creditIssueAmount}</p>
            </div>
          )}
          
          <div className="space-y-2">
            <h4 className="font-medium">{language === 'en' ? 'ID Type' : 'Tipo de ID'}</h4>
            <p>{formData.idType}</p>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium">{language === 'en' ? 'Contact Information' : 'Información de Contacto'}</h4>
            <p>
              {formData.name}<br />
              {formData.phone}<br />
              {formData.email}
            </p>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="min-w-[100px]"
          >
            {language === 'en' ? 'Back' : 'Atrás'}
          </Button>
        </div>
      </div>
    </QuestionContainer>
  );
};
