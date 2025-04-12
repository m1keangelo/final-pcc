
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, CheckCircle, XCircle, AlertTriangle } from "lucide-react";
import QuestionContainer from "@/components/form/QuestionContainer";
import { useLanguage } from "@/contexts/LanguageContext";
import { FormState, getQualificationCategory } from "@/types/form";
import { useData } from "@/contexts/DataContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/lib/toast";

// Timeline Question
export const TimelineQuestion = ({
  value,
  onChange,
  onNext,
  currentStep,
  totalSteps
}: {
  value: FormState['timeline'];
  onChange: (value: FormState['timeline']) => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Homebuying Timeline" : "Plazo para Comprar Casa"}
      questionText={language === 'en' ? "How soon are you looking to buy a home?" : "¿Qué tan pronto busca comprar una casa?"}
      questionId="timeline"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <RadioGroup
        value={value ?? undefined}
        onValueChange={(val) => onChange(val as FormState['timeline'])}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="immediately" id="immediately" />
          <Label htmlFor="immediately" className="flex-1 cursor-pointer">
            {language === 'en' ? "Immediately (I've found a home)" : "Inmediatamente (ya encontré una casa)"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="3months" id="3months" />
          <Label htmlFor="3months" className="flex-1 cursor-pointer">
            {language === 'en' ? "Within 3 months" : "Dentro de 3 meses"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="3to6months" id="3to6months" />
          <Label htmlFor="3to6months" className="flex-1 cursor-pointer">
            {language === 'en' ? "3-6 months" : "3-6 meses"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="6to12months" id="6to12months" />
          <Label htmlFor="6to12months" className="flex-1 cursor-pointer">
            {language === 'en' ? "6-12 months" : "6-12 meses"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="exploring" id="exploring" />
          <Label htmlFor="exploring" className="flex-1 cursor-pointer">
            {language === 'en' ? "Just exploring/Not sure" : "Solo explorando/No estoy seguro"}
          </Label>
        </div>
      </RadioGroup>
      
      <div className="flex justify-end mt-6">
        <Button 
          onClick={onNext}
          disabled={!value}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// First-Time Buyer Question
export const FirstTimeBuyerQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['firstTimeBuyer'];
  onChange: (value: FormState['firstTimeBuyer']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "First-Time Homebuyer" : "Comprador de Primera Vez"}
      questionText={language === 'en' ? "Have you purchased a home before, or would this be your first time buying?" : "¿Ha comprado una casa antes, o esta sería su primera vez comprando?"}
      questionId="firstTimeBuyer"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <RadioGroup
        value={value === null ? undefined : value ? 'yes' : 'no'}
        onValueChange={(val) => onChange(val === 'yes')}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="first-time-yes" />
          <Label htmlFor="first-time-yes" className="flex-1 cursor-pointer">
            {language === 'en' ? "First-time buyer" : "Comprador de primera vez"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="first-time-no" />
          <Label htmlFor="first-time-no" className="flex-1 cursor-pointer">
            {language === 'en' ? "I've owned a home before" : "He tenido casa antes"}
          </Label>
        </div>
      </RadioGroup>
      
      {value === true && (
        <div className="mt-4 p-4 bg-green-900/20 rounded-md">
          <p className="text-sm">
            {language === 'en' 
              ? "Great! There are special programs for first-time buyers that help with low down payments."
              : "¡Genial! Hay programas para compradores primerizos que ayudan con un pago inicial bajo."}
          </p>
        </div>
      )}
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={value === null}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Employment Question
export const EmploymentQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['employmentType'];
  onChange: (value: FormState['employmentType']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Employment Status" : "Situación Laboral"}
      questionText={language === 'en' 
        ? "What is your current employment situation? (Do you work for a company, are self-employed, retired, or something else?)" 
        : "¿Cuál es su situación laboral actual? (¿Trabaja para una empresa, es autónomo/trabaja por cuenta propia, jubilado o algo más?)"}
      questionId="employment"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <RadioGroup
        value={value ?? undefined}
        onValueChange={(val) => onChange(val as FormState['employmentType'])}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="W-2" id="w2" />
          <Label htmlFor="w2" className="flex-1 cursor-pointer">
            {language === 'en' ? "Employed (W-2)" : "Empleado (W-2)"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="1099" id="1099" />
          <Label htmlFor="1099" className="flex-1 cursor-pointer">
            {language === 'en' ? "Self-employed (1099)" : "Trabajador por cuenta propia (1099)"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="retired" id="retired" />
          <Label htmlFor="retired" className="flex-1 cursor-pointer">
            {language === 'en' ? "Retired" : "Jubilado"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="unemployed" id="unemployed" />
          <Label htmlFor="unemployed" className="flex-1 cursor-pointer">
            {language === 'en' ? "Unemployed/No income" : "Desempleado/Sin ingresos"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="other" id="other-employment" />
          <Label htmlFor="other-employment" className="flex-1 cursor-pointer">
            {language === 'en' ? "Other" : "Otro"}
          </Label>
        </div>
      </RadioGroup>
      
      {value === 'unemployed' && (
        <div className="mt-4 p-4 bg-amber-900/20 rounded-md">
          <p className="text-sm flex items-start">
            <AlertTriangle size={16} className="mr-2 mt-0.5 text-amber-500 flex-shrink-0" />
            {language === 'en' 
              ? "A stable income is typically required for loan qualification. You may need a co-signer who can provide income verification."
              : "Normalmente se requiere un ingreso estable para calificar para un préstamo. Es posible que necesite un co-firmante que pueda verificar ingresos."}
          </p>
        </div>
      )}
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={!value}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Self-Employed Years Question
export const SelfEmployedYearsQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['selfEmployedYears'];
  onChange: (value: FormState['selfEmployedYears']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Self-Employment History" : "Historial de Autoempleo"}
      questionText={language === 'en' 
        ? "How long have you been self-employed? Have you been in business at least two years?" 
        : "¿Hace cuánto trabaja por cuenta propia? ¿Lleva al menos dos años con su negocio?"}
      questionId="selfEmployedYears"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="years">
            {language === 'en' ? "Years in business:" : "Años de negocio:"}
          </Label>
          <Input 
            id="years"
            type="number" 
            min="0"
            max="50"
            step="0.5"
            placeholder={language === 'en' ? "Enter number of years" : "Ingrese número de años"}
            value={value?.toString() ?? ''} 
            onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
          />
        </div>
        
        {value !== null && value < 2 && (
          <div className="mt-4 p-4 bg-amber-900/20 rounded-md">
            <p className="text-sm flex items-start">
              <AlertTriangle size={16} className="mr-2 mt-0.5 text-amber-500 flex-shrink-0" />
              {language === 'en' 
                ? "It can be harder to get a loan with less than 2 years of self-employment. You might need a co-signer or a special program."
                : "Con menos de 2 años como autónomo es más difícil calificar. Podría necesitar un co-firmante o un programa especial."}
            </p>
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={value === null}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Income Question
export const IncomeQuestion = ({
  incomeValue,
  incomeTypeValue,
  onChangeIncome,
  onChangeIncomeType,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  incomeValue: FormState['income'];
  incomeTypeValue: FormState['incomeType'];
  onChangeIncome: (value: FormState['income']) => void;
  onChangeIncomeType: (value: FormState['incomeType']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Income Level" : "Nivel de Ingresos"}
      questionText={language === 'en' 
        ? "Approximately how much do you earn per year or per month (before taxes)?" 
        : "¿Aproximadamente cuánto gana al año o al mes (antes de impuestos)?"}
      questionId="income"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <RadioGroup
          value={incomeTypeValue}
          onValueChange={(val) => onChangeIncomeType(val as 'annual' | 'monthly')}
          className="flex flex-wrap gap-4 mb-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="annual" id="annual" />
            <Label htmlFor="annual" className="cursor-pointer">
              {language === 'en' ? "Annual Income" : "Ingreso Anual"}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="monthly" id="monthly" />
            <Label htmlFor="monthly" className="cursor-pointer">
              {language === 'en' ? "Monthly Income" : "Ingreso Mensual"}
            </Label>
          </div>
        </RadioGroup>
        
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <Input 
            type="number" 
            min="0"
            className="pl-7" 
            value={incomeValue?.toString() ?? ''} 
            onChange={(e) => onChangeIncome(e.target.value ? Number(e.target.value) : null)}
            placeholder={language === 'en' ? "Enter amount" : "Ingrese cantidad"}
          />
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={incomeValue === null}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Credit Question
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
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Credit Score/History" : "Puntaje de Crédito"}
      questionText={language === 'en' 
        ? "Do you know approximately what your credit score is? If not: how would you describe your credit – excellent, good, fair, or poor?" 
        : "¿Sabe aproximadamente cuál es su puntaje de crédito? Si no lo sabe: ¿cómo describiría su crédito – excelente, bueno, regular, o bajo?"}
      questionId="credit"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <RadioGroup
        value={value ?? undefined}
        onValueChange={(val) => onChange(val as FormState['creditCategory'])}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="excellent" id="excellent" />
          <Label htmlFor="excellent" className="flex-1 cursor-pointer">
            {language === 'en' ? "Excellent (740+)" : "Excelente (740+)"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="good" id="good" />
          <Label htmlFor="good" className="flex-1 cursor-pointer">
            {language === 'en' ? "Good (700-739)" : "Bueno (700-739)"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="fair" id="fair" />
          <Label htmlFor="fair" className="flex-1 cursor-pointer">
            {language === 'en' ? "Fair (660-699)" : "Regular (660-699)"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="poor" id="poor" />
          <Label htmlFor="poor" className="flex-1 cursor-pointer">
            {language === 'en' ? "Poor (below 660)" : "Bajo (menos de 660)"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="unknown" id="unknown" />
          <Label htmlFor="unknown" className="flex-1 cursor-pointer">
            {language === 'en' ? "Not sure / No credit history" : "No estoy seguro / Sin historial"}
          </Label>
        </div>
      </RadioGroup>
      
      {(value === 'poor' || value === 'fair') && (
        <div className="mt-4 p-4 bg-amber-900/20 rounded-md">
          <p className="text-sm">
            {language === 'en' 
              ? "There are ways to improve a low credit score. For example, being added as an authorized user on someone else's credit card can quickly boost your score. Paying down credit balances helps too."
              : "Hay formas de mejorar un puntaje bajo. Por ejemplo, ser añadido como usuario autorizado en la tarjeta de crédito de otra persona puede subir su puntaje rápidamente. También ayuda bajar sus deudas de tarjeta."}
          </p>
        </div>
      )}
      
      {value === 'unknown' && (
        <div className="mt-4 p-4 bg-amber-900/20 rounded-md">
          <p className="text-sm">
            {language === 'en' 
              ? "You might need to build some credit first, for instance by using a secured credit card or reporting your rent payments."
              : "Quizá necesite generar historial de crédito primero, por ejemplo con una tarjeta asegurada o reportando sus pagos de renta."}
          </p>
        </div>
      )}
      
      {(value === 'excellent' || value === 'good') && (
        <div className="mt-4 p-4 bg-green-900/20 rounded-md">
          <p className="text-sm">
            {language === 'en' 
              ? "Great! Your credit should be a strong point in qualifying for a loan."
              : "¡Estupendo! Su crédito será un punto fuerte para calificar para un préstamo."}
          </p>
        </div>
      )}
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={!value}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Credit Score Question (conditional)
export const CreditScoreQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['creditScore'];
  onChange: (value: FormState['creditScore']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  const [unknown, setUnknown] = useState(false);
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Credit Score Details" : "Detalles del Puntaje de Crédito"}
      questionText={language === 'en' 
        ? "Do you know your approximate credit score?" 
        : "¿Sabe su puntaje de crédito aproximado?"}
      questionId="creditScore"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <Input 
          type="number" 
          min="300"
          max="850"
          placeholder={language === 'en' ? "Enter estimated score" : "Ingrese puntaje estimado"}
          value={value?.toString() ?? ''} 
          onChange={(e) => {
            setUnknown(false);
            onChange(e.target.value ? Number(e.target.value) : null);
          }}
          disabled={unknown}
        />
        
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox"
            id="unknown-score"
            checked={unknown}
            onChange={(e) => {
              setUnknown(e.target.checked);
              if (e.target.checked) {
                onChange(null);
              }
            }}
            className="w-4 h-4 rounded border-gray-300"
          />
          <Label htmlFor="unknown-score" className="cursor-pointer">
            {language === 'en' ? "I don't know my score" : "No conozco mi puntaje"}
          </Label>
        </div>
        
        {value !== null && value < 620 && (
          <div className="mt-4 p-4 bg-amber-900/20 rounded-md">
            <p className="text-sm">
              {language === 'en' 
                ? "Most mortgage loans require at least 620 credit score. You may need to work on improving your score before applying."
                : "La mayoría de los préstamos hipotecarios requieren al menos un puntaje de 620. Es posible que necesite mejorar su puntaje antes de aplicar."}
            </p>
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={!unknown && value === null}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Down Payment Question
export const DownPaymentQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['downPaymentSaved'];
  onChange: (value: FormState['downPaymentSaved']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Down Payment Availability" : "Disponibilidad de Enganche"}
      questionText={language === 'en' 
        ? "Do you have savings set aside for a down payment?" 
        : "¿Tiene ahorros apartados para el pago inicial (enganche)?"}
      questionId="downPayment"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <RadioGroup
        value={value === null ? undefined : value ? 'yes' : 'no'}
        onValueChange={(val) => onChange(val === 'yes')}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="yes-payment" />
          <Label htmlFor="yes-payment" className="cursor-pointer">
            {language === 'en' ? "Yes" : "Sí"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="no-payment" />
          <Label htmlFor="no-payment" className="cursor-pointer">
            {language === 'en' ? "No" : "No"}
          </Label>
        </div>
      </RadioGroup>
      
      {value === false && (
        <div className="mt-4 p-4 bg-amber-900/20 rounded-md">
          <p className="text-sm">
            {language === 'en' 
              ? "Some loan programs allow very low or even no down payment (for example, VA loans for veterans) and there are down payment assistance programs that can help. You could also use a gift from a family member if available."
              : "Algunos programas permiten un enganche muy bajo o incluso cero (por ejemplo, préstamos VA para veteranos), y existen programas de asistencia que pueden ayudar. También podría usar ayuda de un familiar si es posible."}
          </p>
        </div>
      )}
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={value === null}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Down Payment Amount Question (conditional)
export const DownPaymentAmountQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['downPaymentAmount'];
  onChange: (value: FormState['downPaymentAmount']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Down Payment Amount" : "Cantidad de Enganche"}
      questionText={language === 'en' 
        ? "Approximately how much have you saved?" 
        : "¿Aproximadamente cuánto tiene ahorrado?"}
      questionId="downPaymentAmount"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <Input 
            type="number" 
            min="0"
            className="pl-7" 
            value={value?.toString() ?? ''} 
            onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
            placeholder={language === 'en' ? "Enter amount" : "Ingrese cantidad"}
          />
        </div>
        
        {value !== null && value >= 20000 && (
          <div className="mt-4 p-4 bg-green-900/20 rounded-md">
            <p className="text-sm">
              {language === 'en' 
                ? "Great! A larger down payment gives you more loan options and lower monthly payments. 20% or more can eliminate mortgage insurance."
                : "¡Excelente! Un enganche mayor le brinda más opciones de préstamo y pagos mensuales más bajos. 20% o más evita el seguro hipotecario."}
            </p>
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={value === null}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Down Payment Assistance Question
export const DownPaymentAssistanceQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['assistanceOpen'];
  onChange: (value: FormState['assistanceOpen']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Down Payment Assistance" : "Asistencia para el Enganche"}
      questionText={language === 'en' 
        ? "Would you be open to using a down payment assistance program or receiving a family gift for the down payment?" 
        : "¿Estaría dispuesto a usar un programa de asistencia o recibir ayuda de familia para el enganche?"}
      questionId="downPaymentAssistance"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <RadioGroup
        value={value === null ? undefined : value ? 'yes' : 'no'}
        onValueChange={(val) => onChange(val === 'yes')}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="assistance-yes" />
          <Label htmlFor="assistance-yes" className="cursor-pointer">
            {language === 'en' ? "Yes, I'm open to assistance" : "Sí, estoy abierto a asistencia"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="assistance-no" />
          <Label htmlFor="assistance-no" className="cursor-pointer">
            {language === 'en' ? "No, I prefer to save up first" : "No, prefiero ahorrar primero"}
          </Label>
        </div>
      </RadioGroup>
      
      {value === true && (
        <div className="mt-4 p-4 bg-green-900/20 rounded-md">
          <p className="text-sm">
            {language === 'en' 
              ? "There are loans with minimum ~3%-3.5% down for first-time buyers. We can help find programs that might work for you."
              : "Hay préstamos con mínimo ~3%-3.5% de enganche para compradores primerizos. Podemos ayudar a encontrar programas adecuados."}
          </p>
        </div>
      )}
      
      {value === false && (
        <div className="mt-4 p-4 bg-amber-900/20 rounded-md">
          <p className="text-sm">
            {language === 'en' 
              ? "That's completely fine. Some people prefer to wait until they've saved enough for their down payment."
              : "Está perfectamente bien. Algunas personas prefieren esperar hasta ahorrar lo suficiente para su enganche."}
          </p>
        </div>
      )}
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={value === null}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Monthly Debts Question
export const MonthlyDebtsQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['monthlyDebts'];
  onChange: (value: FormState['monthlyDebts']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Other Debts & Obligations" : "Otras Deudas y Obligaciones"}
      questionText={language === 'en' 
        ? "What other debts or monthly obligations do you have? (For example: car loan, student loans, credit card debt, child support, etc.)" 
        : "¿Qué otras deudas u obligaciones mensuales tiene? (Por ejemplo: préstamo de auto, préstamos estudiantiles, deudas de tarjeta de crédito, pagos de manutención de niños, etc.)"}
      questionId="monthlyDebts"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <Textarea 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          placeholder={language === 'en' 
            ? "Example: Car $300, Student loan $200, Credit cards $50" 
            : "Ejemplo: Auto $300, Préstamo estudiantil $200, Tarjetas $50"}
          rows={3}
        />
        
        {value && value.length > 0 && value.toLowerCase() !== 'none' && (
          <div className="mt-4 p-4 bg-blue-900/20 rounded-md">
            <p className="text-sm">
              {language === 'en' 
                ? "High monthly debts will factor into how much house you can afford. If needed, paying off smaller debts could help your qualification by lowering your debt-to-income ratio."
                : "Las deudas mensuales influirán en cuánto puede pagar de casa. Si es necesario, liquidar deudas pequeñas podría ayudarle a calificar al bajar su proporción deuda-ingreso."}
            </p>
          </div>
        )}
        
        {(!value || value.length === 0 || value.toLowerCase() === 'none') && (
          <div className="mt-4 p-4 bg-green-900/20 rounded-md">
            <p className="text-sm">
              {language === 'en' 
                ? "Having little to no debt will help you qualify for a larger mortgage."
                : "Tener poca o ninguna deuda le ayudará a calificar para un préstamo más alto."}
            </p>
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Credit Issues Question
export const CreditIssuesQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['hasCreditIssues'];
  onChange: (value: FormState['hasCreditIssues']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Credit Issues" : "Problemas de Crédito"}
      questionText={language === 'en' 
        ? "Have you had any serious credit issues in the past? (For example, accounts in collections, bankruptcy or foreclosure.)" 
        : "¿Ha tenido algún problema serio de crédito en el pasado? (Por ej., cuentas en cobranza, bancarrota o ejecución hipotecaria/foreclosure.)"}
      questionId="creditIssues"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <RadioGroup
        value={value === null ? undefined : value ? 'yes' : 'no'}
        onValueChange={(val) => onChange(val === 'yes')}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="issues-yes" />
          <Label htmlFor="issues-yes" className="cursor-pointer">
            {language === 'en' ? "Yes" : "Sí"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="issues-no" />
          <Label htmlFor="issues-no" className="cursor-pointer">
            {language === 'en' ? "No" : "No"}
          </Label>
        </div>
      </RadioGroup>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={value === null}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Credit Issue Details Question (conditional)
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
}: {
  type: FormState['creditIssueType'];
  year: FormState['creditIssueYear'];
  amount: FormState['creditIssueAmount'];
  onChangeType: (value: FormState['creditIssueType']) => void;
  onChangeYear: (value: FormState['creditIssueYear']) => void;
  onChangeAmount: (value: FormState['creditIssueAmount']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  const currentYear = new Date().getFullYear();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Credit Issue Details" : "Detalles del Problema de Crédito"}
      questionText={language === 'en' 
        ? "Can you share more about your credit issues? This helps us better assess your situation." 
        : "¿Puede compartir más sobre sus problemas de crédito? Esto nos ayuda a evaluar mejor su situación."}
      questionId="creditIssueDetails"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>
            {language === 'en' ? "Type of issue:" : "Tipo de problema:"}
          </Label>
          <Select 
            value={type ?? undefined} 
            onValueChange={(val) => onChangeType(val as FormState['creditIssueType'])}
          >
            <SelectTrigger>
              <SelectValue placeholder={language === 'en' ? "Select issue type" : "Seleccione tipo de problema"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bankruptcy">
                {language === 'en' ? "Bankruptcy" : "Bancarrota"}
              </SelectItem>
              <SelectItem value="foreclosure">
                {language === 'en' ? "Foreclosure" : "Ejecución hipotecaria"}
              </SelectItem>
              <SelectItem value="collections">
                {language === 'en' ? "Accounts in collections" : "Cuentas en cobranza"}
              </SelectItem>
              <SelectItem value="other">
                {language === 'en' ? "Other issues" : "Otros problemas"}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {(type === 'bankruptcy' || type === 'foreclosure') && (
          <div className="space-y-2">
            <Label htmlFor="year">
              {language === 'en' ? "What year was it discharged/finalized?" : "¿En qué año se liberó/finalizó?"}
            </Label>
            <Input 
              id="year"
              type="number" 
              min="1980"
              max={currentYear}
              placeholder={language === 'en' ? "Enter year (e.g. 2019)" : "Ingrese año (ej. 2019)"}
              value={year?.toString() ?? ''} 
              onChange={(e) => onChangeYear(e.target.value ? Number(e.target.value) : null)}
            />
            
            {year && (currentYear - year < 2) && (
              <div className="mt-4 p-4 bg-amber-900/20 rounded-md">
                <p className="text-sm flex items-start">
                  <AlertTriangle size={16} className="mr-2 mt-0.5 text-amber-500 flex-shrink-0" />
                  {language === 'en' 
                    ? "Most loan programs require a waiting period after bankruptcy or foreclosure. Typically 2 years for FHA/VA loans and up to 4 years for conventional loans."
                    : "La mayoría de los programas exigen un tiempo de espera después de una bancarrota o ejecución. Típicamente 2 años para préstamos FHA/VA y hasta 4 años para préstamos convencionales."}
                </p>
              </div>
            )}
            
            {year && (currentYear - year >= 4) && (
              <div className="mt-4 p-4 bg-green-900/20 rounded-md">
                <p className="text-sm">
                  {language === 'en' 
                    ? "Since that was a while back, it likely won't prevent you from getting a loan now, as long as your credit has been clean since."
                    : "Como eso fue hace tiempo, probablemente no le impedirá obtener un préstamo ahora, mientras su crédito haya estado limpio desde entonces."}
                </p>
              </div>
            )}
          </div>
        )}
        
        {type === 'collections' && (
          <div className="space-y-2">
            <Label htmlFor="amount">
              {language === 'en' ? "Approximately how much total is in collections?" : "¿Aproximadamente cuánto total está en cobranza?"}
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
              <Input 
                id="amount"
                type="number" 
                min="0"
                className="pl-7" 
                placeholder={language === 'en' ? "Enter amount" : "Ingrese cantidad"}
                value={amount?.toString() ?? ''} 
                onChange={(e) => onChangeAmount(e.target.value ? Number(e.target.value) : null)}
              />
            </div>
            
            {amount && amount <= 500 && (
              <div className="mt-4 p-4 bg-green-900/20 rounded-md">
                <p className="text-sm">
                  {language === 'en' 
                    ? "Small collections may not stop you – for instance, medical debts under $500 no longer appear on credit reports. However, it's best to resolve them if possible."
                    : "Es posible que colecciones de monto menor no lo detengan – por ejemplo, deudas médicas debajo de $500 ya no aparecen en los informes de crédito. Sin embargo, es mejor resolverlas si es posible."}
                </p>
              </div>
            )}
            
            {amount && amount > 500 && (
              <div className="mt-4 p-4 bg-amber-900/20 rounded-md">
                <p className="text-sm">
                  {language === 'en' 
                    ? "Larger collections might need to be paid off or settled before you can get approved. We should plan how to address those debts as part of your qualification."
                    : "Las deudas en cobranza grandes quizá deban pagarse o negociarse antes de que puedan aprobarlo. Debemos planear cómo resolver esas deudas para su calificación."}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={!type || ((type === 'bankruptcy' || type === 'foreclosure') && !year) || (type === 'collections' && !amount)}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// ID Type Question
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
  
  return (
    <QuestionContainer
      title={language === 'en' ? "SSN or ITIN Check" : "Verificación de SSN o ITIN"}
      questionText={language === 'en' 
        ? "Do you have a Social Security Number (SSN) or an ITIN (Individual Taxpayer Identification Number)?" 
        : "¿Tiene un Número de Seguro Social (SSN) o un ITIN (Identificación Personal de Contribuyente)?"}
      questionId="idType"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <RadioGroup
        value={value ?? undefined}
        onValueChange={(val) => onChange(val as FormState['idType'])}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="SSN" id="ssn" />
          <Label htmlFor="ssn" className="cursor-pointer">
            {language === 'en' ? "I have a Social Security Number (SSN)" : "Tengo un Número de Seguro Social (SSN)"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="ITIN" id="itin" />
          <Label htmlFor="itin" className="cursor-pointer">
            {language === 'en' ? "I have an ITIN" : "Tengo un ITIN"}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="none" id="no-id" />
          <Label htmlFor="no-id" className="cursor-pointer">
            {language === 'en' ? "I don't have either" : "No tengo ninguno"}
          </Label>
        </div>
      </RadioGroup>
      
      {value === 'ITIN' && (
        <div className="mt-4 p-4 bg-amber-900/20 rounded-md">
          <p className="text-sm">
            {language === 'en' 
              ? "We can work with an ITIN. There are special loan programs for ITIN holders, though they often require a larger down payment (sometimes 15-20% minimum)."
              : "Podemos proceder con un ITIN. Hay programas de préstamo especiales para quienes tienen ITIN, aunque a menudo requieren un enganche más grande (a veces mínimo 15-20%)."}
          </p>
        </div>
      )}
      
      {value === 'none' && (
        <div className="mt-4 p-4 bg-amber-900/20 rounded-md">
          <p className="text-sm flex items-start">
            <AlertTriangle size={16} className="mr-2 mt-0.5 text-amber-500 flex-shrink-0" />
            {language === 'en' 
              ? "Since you don't have an SSN or ITIN, we won't be able to get a mortgage at this time. We recommend obtaining an ITIN or adding a co-borrower who has an SSN before moving forward."
              : "Como no tiene SSN ni ITIN, no podremos conseguir una hipoteca en este momento. Le recomendamos obtener un ITIN o añadir un co-prestatario con SSN antes de avanzar."}
          </p>
        </div>
      )}
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={!value}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Contact Info Question
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
}: {
  name: string;
  phone: string;
  email: string;
  comments: string;
  onChangeName: (value: string) => void;
  onChangePhone: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangeComments: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Contact Information" : "Información de Contacto"}
      questionText={language === 'en' 
        ? "Please enter the client's contact information" 
        : "Por favor, ingrese la información de contacto del cliente"}
      questionId="contactInfo"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            {language === 'en' ? "Full Name (as it appears on ID)" : "Nombre Completo (como aparece en su identificación)"}
          </Label>
          <Input 
            id="name"
            value={name} 
            onChange={(e) => onChangeName(e.target.value)}
            placeholder={language === 'en' ? "Enter client's full name" : "Ingrese nombre completo del cliente"}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">
            {language === 'en' ? "Phone Number" : "Número de Teléfono"}
          </Label>
          <Input 
            id="phone"
            value={phone} 
            onChange={(e) => onChangePhone(e.target.value)}
            placeholder={language === 'en' ? "Enter phone number" : "Ingrese número de teléfono"}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">
            {language === 'en' ? "Email Address" : "Correo Electrónico"}
          </Label>
          <Input 
            id="email"
            type="email"
            value={email} 
            onChange={(e) => onChangeEmail(e.target.value)}
            placeholder={language === 'en' ? "Enter email address" : "Ingrese correo electrónico"}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="comments">
            {language === 'en' ? "Comments or Notes (optional)" : "Comentarios o Notas (opcional)"}
          </Label>
          <Textarea 
            id="comments"
            value={comments} 
            onChange={(e) => onChangeComments(e.target.value)}
            placeholder={language === 'en' 
              ? "Add any additional information or notes about the client" 
              : "Añada cualquier información adicional o notas sobre el cliente"}
            rows={3}
          />
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={!name || !phone}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Summary Question
export const SummaryQuestion = ({
  formData,
  onBack,
  currentStep,
  totalSteps
}: {
  formData: FormState;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  const { addClient } = useData();
  const navigate = useNavigate();
  const qualificationCategory = getQualificationCategory(formData);
  
  const handleSubmit = () => {
    // Convert the form data to match your DataContext client structure
    const annualIncome = formData.incomeType === 'annual' 
      ? formData.income! 
      : formData.income! * 12;
    
    // Map employment type to supported values in the client structure
    let mappedEmploymentType: 'W-2' | '1099' = 'W-2';
    if (formData.employmentType === '1099') {
      mappedEmploymentType = '1099';
    }
    
    // Map credit category with proper capitalization
    let mappedCreditCategory: 'Poor' | 'Fair' | 'Good' | 'Excellent' = 'Poor';
    if (formData.creditCategory === 'excellent') {
      mappedCreditCategory = 'Excellent';
    } else if (formData.creditCategory === 'good') {
      mappedCreditCategory = 'Good';
    } else if (formData.creditCategory === 'fair') {
      mappedCreditCategory = 'Fair';
    }
    
    addClient({
      name: formData.name,
      phone: formData.phone,
      employmentType: mappedEmploymentType,
      incomeAnnual: annualIncome,
      creditCategory: formData.creditCategory === 'unknown' ? 'Poor' : mappedCreditCategory,
      creditScoreApprox: formData.creditScore || undefined,
      downPaymentSaved: formData.downPaymentSaved || false,
      downPaymentAmount: formData.downPaymentSaved ? formData.downPaymentAmount! : undefined,
      legalStatus: formData.idType === 'SSN' ? 'US Citizen' : 
                  formData.idType === 'ITIN' ? 'Work Permit' : 'Undocumented',
      qualified: qualificationCategory === 'ready',
      consentGiven: true,
      comments: formData.comments
    });
    
    toast.success(language === 'en' 
      ? "Client data saved successfully!" 
      : "¡Datos del cliente guardados exitosamente!");
    navigate("/clients");
  };
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Summary" : "Resumen"}
      questionText={language === 'en' ? "Review client information" : "Revisar información del cliente"}
      questionId="summary"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        {qualificationCategory === 'ready' && (
          <div className="p-4 rounded-md bg-green-900/30 mb-4">
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-2 flex-shrink-0" />
              <p className="text-md font-medium">
                {language === 'en' 
                  ? "You may qualify for a home loan! 🎉 Let's move forward with collecting your documents."
                  : "¡Es posible que califique para un préstamo! 🎉 Sigamos adelante reuniendo sus documentos."}
              </p>
            </div>
          </div>
        )}
        
        {qualificationCategory === 'fixesNeeded' && (
          <div className="p-4 rounded-md bg-amber-900/30 mb-4">
            <div className="flex items-center">
              <AlertTriangle className="text-amber-500 mr-2 flex-shrink-0" />
              <p className="text-md font-medium">
                {language === 'en' 
                  ? "With a few improvements, you should be able to qualify! We'll help create a plan."
                  : "¡Con algunas mejoras, debería poder calificar! Le ayudaremos a crear un plan."}
              </p>
            </div>
          </div>
        )}
        
        {qualificationCategory === 'notReady' && (
          <div className="p-4 rounded-md bg-red-900/30 mb-4">
            <div className="flex items-center">
              <XCircle className="text-red-500 mr-2 flex-shrink-0" />
              <p className="text-md font-medium">
                {language === 'en' 
                  ? "Not quite ready to qualify yet. But with a good game plan, you can qualify in the future!"
                  : "Aún no está listo para calificar. ¡Pero con un buen plan de acción, podrá calificar pronto!"}
              </p>
            </div>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? "Timeframe" : "Plazo"}
            </p>
            <p className="font-medium">
              {formData.timeline === 'immediately' ? (language === 'en' ? "Immediately" : "Inmediatamente") :
               formData.timeline === '3months' ? (language === 'en' ? "Within 3 months" : "Dentro de 3 meses") :
               formData.timeline === '3to6months' ? (language === 'en' ? "3-6 months" : "3-6 meses") :
               formData.timeline === '6to12months' ? (language === 'en' ? "6-12 months" : "6-12 meses") :
               (language === 'en' ? "Just exploring" : "Solo explorando")}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? "First-Time Buyer" : "Comprador de Primera Vez"}
            </p>
            <p className="font-medium">
              {formData.firstTimeBuyer !== null && (formData.firstTimeBuyer 
                ? (language === 'en' ? "Yes" : "Sí") 
                : (language === 'en' ? "No" : "No"))}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? "Employment Type" : "Tipo de Empleo"}
            </p>
            <p className="font-medium">
              {formData.employmentType === 'W-2' ? (language === 'en' ? "Employed (W-2)" : "Empleado (W-2)") :
               formData.employmentType === '1099' ? (language === 'en' ? "Self-employed (1099)" : "Trabajador por cuenta propia (1099)") :
               formData.employmentType === 'retired' ? (language === 'en' ? "Retired" : "Jubilado") :
               formData.employmentType === 'unemployed' ? (language === 'en' ? "Unemployed" : "Desempleado") :
               (language === 'en' ? "Other" : "Otro")}
               
               {formData.employmentType === '1099' && formData.selfEmployedYears !== null && (
                <span className="text-sm text-muted-foreground ml-1">
                  ({formData.selfEmployedYears} {language === 'en' ? "years" : "años"})
                </span>
               )}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? "Income" : "Ingresos"}
            </p>
            <p className="font-medium">
              ${formData.income?.toLocaleString()} 
              {formData.incomeType === 'monthly' 
                ? (language === 'en' ? '/month' : '/mes')
                : (language === 'en' ? '/year' : '/año')}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? "Credit" : "Crédito"}
            </p>
            <p className="font-medium">
              {formData.creditCategory === 'excellent' ? (language === 'en' ? "Excellent" : "Excelente") :
               formData.creditCategory === 'good' ? (language === 'en' ? "Good" : "Bueno") :
               formData.creditCategory === 'fair' ? (language === 'en' ? "Fair" : "Regular") :
               formData.creditCategory === 'poor' ? (language === 'en' ? "Poor" : "Bajo") :
               (language === 'en' ? "Unknown" : "Desconocido")}
               
              {formData.creditScore && (
                <span className="text-xs text-muted-foreground ml-1">
                  ({formData.creditScore})
                </span>
              )}
            </p>
            
            {formData.hasCreditIssues && (
              <p className="text-sm text-amber-500">
                {formData.creditIssueType === 'bankruptcy' ? (language === 'en' ? "Bankruptcy" : "Bancarrota") :
                 formData.creditIssueType === 'foreclosure' ? (language === 'en' ? "Foreclosure" : "Ejecución hipotecaria") :
                 formData.creditIssueType === 'collections' ? (language === 'en' ? "Collections" : "Cobranza") :
                 (language === 'en' ? "Credit Issues" : "Problemas de crédito")}
                 
                {formData.creditIssueYear && ` (${formData.creditIssueYear})`}
                {formData.creditIssueAmount && ` ($${formData.creditIssueAmount})`}
              </p>
            )}
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? "Down Payment" : "Enganche"}
            </p>
            {formData.downPaymentSaved ? (
              <p className="font-medium">
                {language === 'en' ? "Yes" : "Sí"} - ${formData.downPaymentAmount?.toLocaleString()}
              </p>
            ) : (
              <p className="font-medium">
                {language === 'en' ? "No" : "No"}
                {formData.assistanceOpen && (
                  <span className="text-sm text-muted-foreground ml-1">
                    ({language === 'en' ? "Open to assistance" : "Abierto a asistencia"})
                  </span>
                )}
              </p>
            )}
          </div>
          
          {formData.monthlyDebts && formData.monthlyDebts.length > 0 && (
            <div>
              <p className="text-sm text-muted-foreground">
                {language === 'en' ? "Monthly Debts" : "Deudas Mensuales"}
              </p>
              <p className="font-medium">
                {formData.monthlyDebts}
              </p>
            </div>
          )}
          
          <div>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? "ID Type" : "Tipo de Identificación"}
            </p>
            <p className="font-medium">
              {formData.idType === 'SSN' ? "SSN" :
               formData.idType === 'ITIN' ? "ITIN" :
               (language === 'en' ? "None" : "Ninguno")}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? "Contact" : "Contacto"}
            </p>
            <p className="font-medium">{formData.name}</p>
            <p className="text-sm">{formData.phone}</p>
            {formData.email && <p className="text-sm">{formData.email}</p>}
          </div>
        </div>
        
        {formData.comments && (
          <div>
            <p className="text-sm text-muted-foreground">
              {language === 'en' ? "Comments" : "Comentarios"}
            </p>
            <p className="text-sm border-l-2 border-gallopurple pl-3 mt-1">
              {formData.comments}
            </p>
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={handleSubmit}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.complete')}
        </Button>
      </div>
    </QuestionContainer>
  );
};
