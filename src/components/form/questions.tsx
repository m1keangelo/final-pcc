
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import QuestionContainer from "@/components/form/QuestionContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormState } from "@/types/form";

type QuestionProps = {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onBack?: () => void;
};

// Timeline Question
interface TimelineQuestionProps extends QuestionProps {
  value: FormState['timeline'];
  onChange: (value: FormState['timeline']) => void;
}

export const TimelineQuestion = ({ value, onChange, onNext, currentStep, totalSteps }: TimelineQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Your Timeline" : "Su Cronología"}
      questionText={language === 'en' 
        ? "How soon are you looking to buy a home?" 
        : "¿Qué tan pronto busca comprar una casa?"}
      questionId="timeline"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        {[
          { value: 'immediately', labelEn: 'Immediately (found a home)', labelEs: 'Inmediatamente (ya encontré una casa)' },
          { value: '3months', labelEn: 'Within 3 months', labelEs: 'Dentro de 3 meses' },
          { value: '3to6months', labelEn: '3-6 months', labelEs: '3-6 meses' },
          { value: '6to12months', labelEn: '6-12 months', labelEs: '6-12 meses' },
          { value: 'exploring', labelEn: 'Just exploring', labelEs: 'Solo explorando' },
        ].map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={value === option.value ? "default" : "outline"}
            className="w-full justify-start text-left font-normal"
            onClick={() => onChange(option.value as FormState['timeline'])}
          >
            {language === 'en' ? option.labelEn : option.labelEs}
          </Button>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <Button onClick={onNext}>
          {language === 'en' ? "Next" : "Siguiente"}
        </Button>
      </div>
    </QuestionContainer>
  );
};

// First Time Buyer Question
interface FirstTimeBuyerQuestionProps extends QuestionProps {
  value: FormState['firstTimeBuyer'];
  onChange: (value: boolean | null) => void;
}

export const FirstTimeBuyerQuestion = ({ value, onChange, onNext, onBack, currentStep, totalSteps }: FirstTimeBuyerQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "First-Time Home Buyer" : "Comprador de Primera Vez"}
      questionText={language === 'en' 
        ? "Is this your first time buying a home?" 
        : "¿Es esta su primera vez comprando una casa?"}
      questionId="firstTimeBuyer"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <Button
          type="button"
          variant={value === true ? "default" : "outline"}
          className="w-full justify-start text-left font-normal"
          onClick={() => onChange(true)}
        >
          {language === 'en' ? "Yes, first-time buyer" : "Sí, comprador de primera vez"}
        </Button>
        <Button
          type="button"
          variant={value === false ? "default" : "outline"}
          className="w-full justify-start text-left font-normal"
          onClick={() => onChange(false)}
        >
          {language === 'en' ? "No, I've owned a home before" : "No, he tenido casa antes"}
        </Button>
        
        {value === true && (
          <div className="mt-2 p-4 bg-yellow-50 rounded-md text-yellow-800 text-base">
            {language === 'en' 
              ? "Great! There are special programs for first-time buyers that help with low down payments." 
              : "¡Genial! Hay programas especiales para compradores primerizos que ayudan con pagos iniciales bajos."}
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {language === 'en' ? "Back" : "Atrás"}
          </Button>
        )}
        <Button onClick={onNext}>
          {language === 'en' ? "Next" : "Siguiente"}
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Employment Question
interface EmploymentQuestionProps extends QuestionProps {
  value: FormState['employmentType'];
  onChange: (value: FormState['employmentType']) => void;
}

export const EmploymentQuestion = ({ value, onChange, onNext, onBack, currentStep, totalSteps }: EmploymentQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Employment Status" : "Situación Laboral"}
      questionText={language === 'en' 
        ? "What is your current employment situation?" 
        : "¿Cuál es su situación laboral actual?"}
      questionId="employment"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        {[
          { value: 'W-2', labelEn: 'Employed (W-2)', labelEs: 'Empleado (W-2)' },
          { value: '1099', labelEn: 'Self-employed (1099)', labelEs: 'Trabajador independiente (1099)' },
          { value: 'retired', labelEn: 'Retired', labelEs: 'Jubilado' },
          { value: 'unemployed', labelEn: 'Unemployed/No income', labelEs: 'Desempleado/Sin ingresos' },
          { value: 'other', labelEn: 'Other', labelEs: 'Otro' },
        ].map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={value === option.value ? "default" : "outline"}
            className="w-full justify-start text-left font-normal"
            onClick={() => onChange(option.value as FormState['employmentType'])}
          >
            {language === 'en' ? option.labelEn : option.labelEs}
          </Button>
        ))}
      </div>
      <div className="mt-6 flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {language === 'en' ? "Back" : "Atrás"}
          </Button>
        )}
        <Button onClick={onNext}>
          {language === 'en' ? "Next" : "Siguiente"}
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Self-Employed Years Question
interface SelfEmployedYearsQuestionProps extends QuestionProps {
  value: FormState['selfEmployedYears'];
  onChange: (value: number | null) => void;
}

export const SelfEmployedYearsQuestion = ({ value, onChange, onNext, onBack, currentStep, totalSteps }: SelfEmployedYearsQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Self-Employment History" : "Historial de Autoempleo"}
      questionText={language === 'en' 
        ? "How long have you been self-employed?" 
        : "¿Cuánto tiempo lleva trabajando por cuenta propia?"}
      questionId="selfEmployedYears"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <Label>
          {language === 'en' ? "Years" : "Años"}
        </Label>
        <Input 
          type="number" 
          min="0"
          value={value || ""}
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)} 
        />
        
        {value !== null && value < 2 && (
          <div className="mt-2 p-4 bg-yellow-50 rounded-md text-yellow-800 text-base">
            {language === 'en' 
              ? "It can be harder to get a loan with less than 2 years self-employment. You might need a co-signer or a special program." 
              : "Con menos de 2 años como autónomo es más difícil calificar. Podría necesitar un co-firmante o un programa especial."}
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {language === 'en' ? "Back" : "Atrás"}
          </Button>
        )}
        <Button onClick={onNext}>
          {language === 'en' ? "Next" : "Siguiente"}
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Income Question
interface IncomeQuestionProps extends QuestionProps {
  incomeValue: FormState['income'];
  incomeTypeValue: FormState['incomeType'];
  onChangeIncome: (value: number | null) => void;
  onChangeIncomeType: (value: FormState['incomeType']) => void;
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
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Income Information" : "Información de Ingresos"}
      questionText={language === 'en' 
        ? "What is your approximate income before taxes?" 
        : "¿Cuál es su ingreso aproximado antes de impuestos?"}
      questionId="income"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="income">
              {language === 'en' ? "Income amount" : "Cantidad de ingresos"}
            </Label>
            <Input
              id="income"
              type="number"
              min="0"
              value={incomeValue || ""}
              onChange={(e) => onChangeIncome(e.target.value ? Number(e.target.value) : null)}
              placeholder={language === 'en' ? "Enter amount" : "Ingrese cantidad"}
            />
          </div>
          <div>
            <Label htmlFor="incomeType">
              {language === 'en' ? "Frequency" : "Frecuencia"}
            </Label>
            <Select 
              value={incomeTypeValue} 
              onValueChange={(value) => onChangeIncomeType(value as FormState['incomeType'])}
            >
              <SelectTrigger id="incomeType">
                <SelectValue placeholder={language === 'en' ? "Select frequency" : "Seleccionar frecuencia"} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annual">{language === 'en' ? "Annual" : "Anual"}</SelectItem>
                <SelectItem value="monthly">{language === 'en' ? "Monthly" : "Mensual"}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {language === 'en' ? "Back" : "Atrás"}
          </Button>
        )}
        <Button onClick={onNext}>
          {language === 'en' ? "Next" : "Siguiente"}
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Credit Question
interface CreditQuestionProps extends QuestionProps {
  value: FormState['creditCategory'];
  onChange: (value: FormState['creditCategory']) => void;
}

export const CreditQuestion = ({ value, onChange, onNext, onBack, currentStep, totalSteps }: CreditQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Credit Score" : "Puntaje de Crédito"}
      questionText={language === 'en' 
        ? "Do you know your approximate credit score or how you would describe your credit?" 
        : "¿Sabe aproximadamente cuál es su puntaje de crédito o cómo describiría su crédito?"}
      questionId="credit"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        {[
          { value: 'excellent', labelEn: 'Excellent (740+)', labelEs: 'Excelente (740+)' },
          { value: 'good', labelEn: 'Good (700-739)', labelEs: 'Bueno (700-739)' },
          { value: 'fair', labelEn: 'Fair (660-699)', labelEs: 'Regular (660-699)' },
          { value: 'poor', labelEn: 'Poor (Below 660)', labelEs: 'Bajo (Menos de 660)' },
          { value: 'unknown', labelEn: 'Not sure/No credit', labelEs: 'No estoy seguro/Sin crédito' },
        ].map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={value === option.value ? "default" : "outline"}
            className="w-full justify-start text-left font-normal"
            onClick={() => onChange(option.value as FormState['creditCategory'])}
          >
            {language === 'en' ? option.labelEn : option.labelEs}
          </Button>
        ))}
        
        {(value === 'poor' || value === 'fair') && (
          <div className="mt-2 p-4 bg-yellow-50 rounded-md text-yellow-800 text-base">
            {language === 'en' 
              ? "There are ways to improve a low credit score. For example, being added as an authorized user on someone else's credit card can quickly boost your score. Paying down credit balances helps too." 
              : "Hay formas de mejorar un puntaje bajo. Por ejemplo, ser añadido como usuario autorizado en la tarjeta de crédito de otra persona puede subir su puntaje rápidamente. También ayudaría bajar sus deudas de tarjeta."}
          </div>
        )}
        
        {value === 'unknown' && (
          <div className="mt-2 p-4 bg-yellow-50 rounded-md text-yellow-800 text-base">
            {language === 'en' 
              ? "We might need to build some credit for you first, for instance by using a secured credit card or reporting your rent payments." 
              : "Quizá necesitemos que usted genere historial de crédito primero, por ejemplo con una tarjeta asegurada o reportando sus pagos de renta."}
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {language === 'en' ? "Back" : "Atrás"}
          </Button>
        )}
        <Button onClick={onNext}>
          {language === 'en' ? "Next" : "Siguiente"}
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Credit Score Question
interface CreditScoreQuestionProps extends QuestionProps {
  value: FormState['creditScore'];
  onChange: (value: number | null) => void;
}

export const CreditScoreQuestion = ({ value, onChange, onNext, onBack, currentStep, totalSteps }: CreditScoreQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Specific Credit Score" : "Puntaje de Crédito Específico"}
      questionText={language === 'en' 
        ? "If you know your specific credit score, please enter it here:" 
        : "Si conoce su puntaje de crédito específico, ingréselo aquí:"}
      questionId="creditScore"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <Input 
          type="number" 
          min="300"
          max="850"
          value={value || ""}
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)} 
          placeholder={language === 'en' ? "Enter score (optional)" : "Ingrese puntaje (opcional)"}
        />
      </div>
      <div className="mt-6 flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {language === 'en' ? "Back" : "Atrás"}
          </Button>
        )}
        <Button onClick={onNext}>
          {language === 'en' ? "Next" : "Siguiente"}
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Down Payment Question
interface DownPaymentQuestionProps extends QuestionProps {
  value: FormState['downPaymentSaved'];
  onChange: (value: boolean | null) => void;
}

export const DownPaymentQuestion = ({ value, onChange, onNext, onBack, currentStep, totalSteps }: DownPaymentQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Down Payment" : "Pago Inicial"}
      questionText={language === 'en' 
        ? "Have you saved money for a down payment?" 
        : "¿Ha ahorrado dinero para el pago inicial (enganche)?"}
      questionId="downPayment"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <Button
          type="button"
          variant={value === true ? "default" : "outline"}
          className="w-full justify-start text-left font-normal"
          onClick={() => onChange(true)}
        >
          {language === 'en' ? "Yes, I have savings" : "Sí, tengo ahorros"}
        </Button>
        <Button
          type="button"
          variant={value === false ? "default" : "outline"}
          className="w-full justify-start text-left font-normal"
          onClick={() => onChange(false)}
        >
          {language === 'en' ? "No, not yet" : "No, todavía no"}
        </Button>
        
        {value === false && (
          <div className="mt-2 p-4 bg-yellow-50 rounded-md text-yellow-800 text-base">
            {language === 'en' 
              ? "No worries. Some loan programs allow very low or even no down payment, and there are assistance programs that can help." 
              : "No se preocupe. Algunos programas permiten un enganche muy bajo o incluso cero, y existen programas de asistencia que pueden ayudar."}
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {language === 'en' ? "Back" : "Atrás"}
          </Button>
        )}
        <Button onClick={onNext}>
          {language === 'en' ? "Next" : "Siguiente"}
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Down Payment Amount Question
interface DownPaymentAmountQuestionProps extends QuestionProps {
  value: FormState['downPaymentAmount'];
  onChange: (value: number | null) => void;
}

export const DownPaymentAmountQuestion = ({ value, onChange, onNext, onBack, currentStep, totalSteps }: DownPaymentAmountQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Down Payment Amount" : "Monto del Pago Inicial"}
      questionText={language === 'en' 
        ? "How much have you saved for a down payment?" 
        : "¿Cuánto ha ahorrado para el pago inicial?"}
      questionId="downPaymentAmount"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <div className="flex items-center">
          <span className="mr-2">$</span>
          <Input 
            type="number" 
            min="0"
            value={value || ""}
            onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)} 
            placeholder={language === 'en' ? "Enter amount" : "Ingrese monto"}
          />
        </div>
        
        {value !== null && value >= 20000 && (
          <div className="mt-2 p-4 bg-yellow-50 rounded-md text-yellow-800 text-base">
            {language === 'en' 
              ? "Great! A larger down payment gives you more loan options and lower monthly payments." 
              : "¡Excelente! Un enganche mayor le brinda más opciones de préstamo y pagos mensuales más bajos."}
          </div>
        )}
        
        {value !== null && value < 5000 && (
          <div className="mt-2 p-4 bg-yellow-50 rounded-md text-yellow-800 text-base">
            {language === 'en' 
              ? "There are loans with minimum ~3%–3.5% down for first-time buyers. We might need to combine your funds with an assistance program." 
              : "Hay préstamos con mínimo ~3%–3.5% de enganche para compradores primerizos. Quizá necesitemos combinar sus fondos con algún programa de asistencia."}
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {language === 'en' ? "Back" : "Atrás"}
          </Button>
        )}
        <Button onClick={onNext}>
          {language === 'en' ? "Next" : "Siguiente"}
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Down Payment Assistance Question
interface DownPaymentAssistanceQuestionProps extends QuestionProps {
  value: FormState['assistanceOpen'];
  onChange: (value: boolean | null) => void;
}

export const DownPaymentAssistanceQuestion = ({ value, onChange, onNext, onBack, currentStep, totalSteps }: DownPaymentAssistanceQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Down Payment Assistance" : "Asistencia para el Pago Inicial"}
      questionText={language === 'en' 
        ? "Would you be open to using down payment assistance programs?" 
        : "¿Estaría dispuesto a usar programas de asistencia para el pago inicial?"}
      questionId="downPaymentAssistance"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <Button
          type="button"
          variant={value === true ? "default" : "outline"}
          className="w-full justify-start text-left font-normal"
          onClick={() => onChange(true)}
        >
          {language === 'en' ? "Yes, I'm open to assistance" : "Sí, estoy dispuesto a recibir asistencia"}
        </Button>
        <Button
          type="button"
          variant={value === false ? "default" : "outline"}
          className="w-full justify-start text-left font-normal"
          onClick={() => onChange(false)}
        >
          {language === 'en' ? "No, I'd prefer not to" : "No, preferiría no hacerlo"}
        </Button>
        
        {value === true && (
          <div className="mt-2 p-4 bg-yellow-50 rounded-md text-yellow-800 text-base">
            {language === 'en' 
              ? "Great! There are many programs that can help with down payment and closing costs. We can connect you with local resources." 
              : "¡Estupendo! Hay muchos programas que pueden ayudar con el pago inicial y los costos de cierre. Podemos conectarle con recursos locales."}
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {language === 'en' ? "Back" : "Atrás"}
          </Button>
        )}
        <Button onClick={onNext}>
          {language === 'en' ? "Next" : "Siguiente"}
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Monthly Debts Question
interface MonthlyDebtsQuestionProps extends QuestionProps {
  value: FormState['monthlyDebts'];
  onChange: (value: string) => void;
}

export const MonthlyDebtsQuestion = ({ value, onChange, onNext, onBack, currentStep, totalSteps }: MonthlyDebtsQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Monthly Debts" : "Deudas Mensuales"}
      questionText={language === 'en' 
        ? "What other debts or monthly obligations do you have?" 
        : "¿Qué otras deudas u obligaciones mensuales tiene?"}
      questionId="monthlyDebts"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <textarea
          className="w-full h-32 border border-gray-300 rounded-md p-2"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={language === 'en' 
            ? "Example: Car payment $300, Student loan $200, Credit cards $100" 
            : "Ejemplo: Pago de auto $300, Préstamo estudiantil $200, Tarjetas de crédito $100"}
        />
      </div>
      <div className="mt-6 flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {language === 'en' ? "Back" : "Atrás"}
          </Button>
        )}
        <Button onClick={onNext}>
          {language === 'en' ? "Next" : "Siguiente"}
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Credit Issues Question
interface CreditIssuesQuestionProps extends QuestionProps {
  value: FormState['hasCreditIssues'];
  onChange: (value: boolean | null) => void;
}

export const CreditIssuesQuestion = ({ value, onChange, onNext, onBack, currentStep, totalSteps }: CreditIssuesQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Credit Issues" : "Problemas de Crédito"}
      questionText={language === 'en' 
        ? "Have you had any major credit issues in the past?" 
        : "¿Ha tenido problemas graves de crédito en el pasado?"}
      questionId="creditIssues"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <Button
          type="button"
          variant={value === true ? "default" : "outline"}
          className="w-full justify-start text-left font-normal"
          onClick={() => onChange(true)}
        >
          {language === 'en' ? "Yes, I've had credit issues" : "Sí, he tenido problemas de crédito"}
        </Button>
        <Button
          type="button"
          variant={value === false ? "default" : "outline"}
          className="w-full justify-start text-left font-normal"
          onClick={() => onChange(false)}
        >
          {language === 'en' ? "No credit issues" : "Sin problemas de crédito"}
        </Button>
      </div>
      <div className="mt-6 flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {language === 'en' ? "Back" : "Atrás"}
          </Button>
        )}
        <Button onClick={onNext}>
          {language === 'en' ? "Next" : "Siguiente"}
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Credit Issue Details Question
interface CreditIssueDetailsQuestionProps extends QuestionProps {
  type: FormState['creditIssueType'];
  year: FormState['creditIssueYear'];
  amount: FormState['creditIssueAmount'];
  onChangeType: (value: FormState['creditIssueType']) => void;
  onChangeYear: (value: number | null) => void;
  onChangeAmount: (value: number | null) => void;
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
  const currentYear = new Date().getFullYear();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Credit Issue Details" : "Detalles del Problema de Crédito"}
      questionText={language === 'en' 
        ? "Please provide more information about your credit issues" 
        : "Por favor proporcione más información sobre sus problemas de crédito"}
      questionId="creditIssueDetails"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label>
            {language === 'en' ? "Type of issue" : "Tipo de problema"}
          </Label>
          <Select 
            value={type || ""} 
            onValueChange={(value) => onChangeType(value as FormState['creditIssueType'])}
          >
            <SelectTrigger>
              <SelectValue placeholder={language === 'en' ? "Select issue type" : "Seleccione tipo de problema"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bankruptcy">{language === 'en' ? "Bankruptcy" : "Bancarrota"}</SelectItem>
              <SelectItem value="foreclosure">{language === 'en' ? "Foreclosure" : "Ejecución hipotecaria"}</SelectItem>
              <SelectItem value="collections">{language === 'en' ? "Collections" : "Colecciones"}</SelectItem>
              <SelectItem value="other">{language === 'en' ? "Other" : "Otro"}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>
            {language === 'en' ? "Year it happened" : "Año en que ocurrió"}
          </Label>
          <Select 
            value={year?.toString() || ""} 
            onValueChange={(value) => onChangeYear(value ? Number(value) : null)}
          >
            <SelectTrigger>
              <SelectValue placeholder={language === 'en' ? "Select year" : "Seleccione año"} />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 10 }, (_, i) => currentYear - i).map((year) => (
                <SelectItem key={year} value={year.toString()}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label>
            {language === 'en' ? "Approximate amount involved" : "Monto aproximado involucrado"}
          </Label>
          <div className="flex items-center">
            <span className="mr-2">$</span>
            <Input 
              type="number" 
              min="0"
              value={amount || ""}
              onChange={(e) => onChangeAmount(e.target.value ? Number(e.target.value) : null)} 
              placeholder={language === 'en' ? "Enter amount" : "Ingrese monto"}
            />
          </div>
        </div>
        
        {type === 'bankruptcy' || type === 'foreclosure' ? (
          <div className="mt-2 p-4 bg-yellow-50 rounded-md text-yellow-800 text-base">
            {language === 'en' 
              ? `Most loan programs require a waiting period after a ${type}. Typically 2-7 years depending on the loan type.` 
              : `La mayoría de programas requieren un período de espera después de una ${type === 'bankruptcy' ? 'bancarrota' : 'ejecución hipotecaria'}. Típicamente 2-7 años dependiendo del tipo de préstamo.`}
          </div>
        ) : type === 'collections' && amount && amount > 500 ? (
          <div className="mt-2 p-4 bg-yellow-50 rounded-md text-yellow-800 text-base">
            {language === 'en' 
              ? "Larger collections might need to be paid off or settled before you can get approved." 
              : "Las deudas en colecciones grandes quizá deban pagarse o negociarse antes de que puedan aprobarlo."}
          </div>
        ) : null}
      </div>
      <div className="mt-6 flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {language === 'en' ? "Back" : "Atrás"}
          </Button>
        )}
        <Button onClick={onNext}>
          {language === 'en' ? "Next" : "Siguiente"}
        </Button>
      </div>
    </QuestionContainer>
  );
};

// ID Type Question
interface IdTypeQuestionProps extends QuestionProps {
  value: FormState['idType'];
  onChange: (value: FormState['idType']) => void;
}

export const IdTypeQuestion = ({ value, onChange, onNext, onBack, currentStep, totalSteps }: IdTypeQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Identification Type" : "Tipo de Identificación"}
      questionText={language === 'en' 
        ? "Do you have a Social Security Number (SSN) or ITIN?" 
        : "¿Tiene un Número de Seguro Social (SSN) o un ITIN?"}
      questionId="idType"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        {[
          { value: 'SSN', labelEn: 'I have an SSN', labelEs: 'Tengo un SSN' },
          { value: 'ITIN', labelEn: 'I have an ITIN', labelEs: 'Tengo un ITIN' },
          { value: 'none', labelEn: 'I have neither', labelEs: 'No tengo ninguno' },
        ].map((option) => (
          <Button
            key={option.value}
            type="button"
            variant={value === option.value ? "default" : "outline"}
            className="w-full justify-start text-left font-normal"
            onClick={() => onChange(option.value as FormState['idType'])}
          >
            {language === 'en' ? option.labelEn : option.labelEs}
          </Button>
        ))}
        
        {value === 'ITIN' && (
          <div className="mt-2 p-4 bg-yellow-50 rounded-md text-yellow-800 text-base">
            {language === 'en' 
              ? "We can work with an ITIN. There are special loan programs for ITIN holders, though they often require a larger down payment (sometimes 15-20% minimum)." 
              : "Podemos trabajar con un ITIN. Hay programas de préstamo especiales para personas con ITIN, aunque a menudo requieren un enganche más grande (a veces mínimo 15-20%)."}
          </div>
        )}
        
        {value === 'none' && (
          <div className="mt-2 p-4 bg-yellow-50 rounded-md text-yellow-800 text-base">
            {language === 'en' 
              ? "Since you don't have an SSN or ITIN, we won't be able to get a mortgage at this time. We'd recommend obtaining an ITIN or adding a co-borrower who has an SSN before moving forward." 
              : "Como no tiene SSN ni ITIN, no podremos conseguir una hipoteca en este momento. Le recomendaríamos obtener un ITIN o añadir un co-prestatario con SSN antes de avanzar."}
          </div>
        )}
      </div>
      <div className="mt-6 flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {language === 'en' ? "Back" : "Atrás"}
          </Button>
        )}
        <Button onClick={onNext}>
          {language === 'en' ? "Next" : "Siguiente"}
        </Button>
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
      title={language === 'en' ? "Contact Information" : "Información de Contacto"}
      questionText={language === 'en' 
        ? "Please provide your contact information" 
        : "Por favor proporcione su información de contacto"}
      questionId="contactInfo"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">
            {language === 'en' ? "Full Name" : "Nombre Completo"}
          </Label>
          <Input 
            id="name" 
            value={name} 
            onChange={(e) => onChangeName(e.target.value)} 
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
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="comments">
            {language === 'en' ? "Additional Comments (Optional)" : "Comentarios Adicionales (Opcional)"}
          </Label>
          <textarea
            id="comments"
            className="w-full h-24 border border-gray-300 rounded-md p-2"
            value={comments}
            onChange={(e) => onChangeComments(e.target.value)}
          ></textarea>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {language === 'en' ? "Back" : "Atrás"}
          </Button>
        )}
        <Button onClick={onNext}>
          {language === 'en' ? "Submit" : "Enviar"}
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Summary Question
interface SummaryQuestionProps extends QuestionProps {
  formData: FormState;
}

export const SummaryQuestion = ({ formData, onBack, currentStep, totalSteps }: SummaryQuestionProps) => {
  const { language } = useLanguage();
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Summary" : "Resumen"}
      questionText={language === 'en' 
        ? "Review your information" 
        : "Revise su información"}
      questionId="summary"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <p>{language === 'en' ? "Thank you for completing the form." : "Gracias por completar el formulario."}</p>
        
        <div className="mt-2 p-4 bg-yellow-50 rounded-md text-yellow-800 text-base">
          {language === 'en' 
            ? "We'll analyze your information and contact you shortly with next steps." 
            : "Analizaremos su información y le contactaremos pronto con los siguientes pasos."}
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {language === 'en' ? "Back" : "Atrás"}
          </Button>
        )}
      </div>
    </QuestionContainer>
  );
};
