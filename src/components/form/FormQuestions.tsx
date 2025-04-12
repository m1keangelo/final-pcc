import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import SummaryOutcome from './SummaryOutcome';

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
      title="Homebuying Timeline"
      questionText="How soon are you looking to buy a home?"
      questionId="timeline"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Button
          variant={value === 'immediately' ? 'default' : 'outline'}
          onClick={() => onChange('immediately')}
        >
          Immediately (I've found a home)
        </Button>
        <Button
          variant={value === '3months' ? 'default' : 'outline'}
          onClick={() => onChange('3months')}
        >
          Within 3 months
        </Button>
        <Button
          variant={value === '3to6months' ? 'default' : 'outline'}
          onClick={() => onChange('3to6months')}
        >
          3-6 months
        </Button>
        <Button
          variant={value === '6to12months' ? 'default' : 'outline'}
          onClick={() => onChange('6to12months')}
        >
          6-12 months
        </Button>
        <Button
          variant={value === 'exploring' ? 'default' : 'outline'}
          onClick={() => onChange('exploring')}
        >
          Just exploring/Not sure
        </Button>
      </div>
      
      <div className="mt-8 flex justify-end">
        <Button onClick={onNext}>Next</Button>
      </div>
    </QuestionContainer>
  );
};

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
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title={t('q.firsttime.title')}
      questionText={t('q.firsttime.question')}
      questionId="firsttime"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Button
          variant={value === true ? 'default' : 'outline'}
          onClick={() => onChange(true)}
        >
          {t('q.firsttime.yes')}
        </Button>
        <Button
          variant={value === false ? 'default' : 'outline'}
          onClick={() => onChange(false)}
        >
          {t('q.firsttime.no')}
        </Button>
      </div>
      
      {value === true && (
        <div className="mt-4 text-sm text-muted-foreground">
          {t('q.firsttime.help')}
        </div>
      )}
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          {t('form.previous')}
        </Button>
        <Button onClick={onNext}>{t('form.next')}</Button>
      </div>
    </QuestionContainer>
  );
};

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
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title={t('q1.title')}
      questionText={t('q1.question')}
      questionId="employment"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Button
          variant={value === 'W-2' ? 'default' : 'outline'}
          onClick={() => onChange('W-2')}
        >
          {t('q1.option1')}
        </Button>
        <Button
          variant={value === '1099' ? 'default' : 'outline'}
          onClick={() => onChange('1099')}
        >
          {t('q1.option2')}
        </Button>
        <Button
          variant={value === 'retired' ? 'default' : 'outline'}
          onClick={() => onChange('retired')}
        >
          {t('q1.option3')}
        </Button>
        <Button
          variant={value === 'unemployed' ? 'default' : 'outline'}
          onClick={() => onChange('unemployed')}
        >
          {t('q1.option4')}
        </Button>
        <Button
          variant={value === 'other' ? 'default' : 'outline'}
          onClick={() => onChange('other')}
        >
          {t('q1.option5')}
        </Button>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          {t('form.previous')}
        </Button>
        <Button onClick={onNext}>{t('form.next')}</Button>
      </div>
    </QuestionContainer>
  );
};

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
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title={t('q.selfyears.title')}
      questionText={t('q.selfyears.question')}
      questionId="selfemployementyears"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Input
          type="number"
          placeholder={t('q.selfyears.placeholder')}
          value={value === null ? '' : value.toString()}
          onChange={(e) => {
            const parsedValue = parseInt(e.target.value);
            onChange(isNaN(parsedValue) ? null : parsedValue);
          }}
        />
        {value !== null && value < 2 && (
          <div className="mt-2 text-sm text-yellow-500">
            {t('q.selfyears.warning')}
          </div>
        )}
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          {t('form.previous')}
        </Button>
        <Button onClick={onNext}>{t('form.next')}</Button>
      </div>
    </QuestionContainer>
  );
};

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
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title={t('q2.title')}
      questionText={t('q2.question')}
      questionId="income"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <div className="flex items-center space-x-2">
          <Button
            variant={incomeTypeValue === 'annual' ? 'default' : 'outline'}
            onClick={() => onChangeIncomeType('annual')}
          >
            {t('q2.annual')}
          </Button>
          <Button
            variant={incomeTypeValue === 'monthly' ? 'default' : 'outline'}
            onClick={() => onChangeIncomeType('monthly')}
          >
            {t('q2.monthly')}
          </Button>
        </div>
        <Input
          type="number"
          placeholder="Enter amount"
          value={incomeValue === null ? '' : incomeValue.toString()}
          onChange={(e) => {
            const parsedValue = parseInt(e.target.value);
            onChangeIncome(isNaN(parsedValue) ? null : parsedValue);
          }}
        />
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          {t('form.previous')}
        </Button>
        <Button onClick={onNext}>{t('form.next')}</Button>
      </div>
    </QuestionContainer>
  );
};

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
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title={t('q3.title')}
      questionText={t('q3.question')}
      questionId="credit"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Button
          variant={value === 'poor' ? 'default' : 'outline'}
          onClick={() => onChange('poor')}
        >
          {t('q3.option1')}
        </Button>
        <Button
          variant={value === 'fair' ? 'default' : 'outline'}
          onClick={() => onChange('fair')}
        >
          {t('q3.option2')}
        </Button>
        <Button
          variant={value === 'good' ? 'default' : 'outline'}
          onClick={() => onChange('good')}
        >
          {t('q3.option3')}
        </Button>
        <Button
          variant={value === 'excellent' ? 'default' : 'outline'}
          onClick={() => onChange('excellent')}
        >
          {t('q3.option4')}
        </Button>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          {t('form.previous')}
        </Button>
        <Button onClick={onNext}>{t('form.next')}</Button>
      </div>
    </QuestionContainer>
  );
};

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
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title={t('q3a.title')}
      questionText={t('q3a.question')}
      questionId="creditscore"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Input
          type="number"
          placeholder={t('q3a.placeholder')}
          value={value === null ? '' : value.toString()}
          onChange={(e) => {
            const parsedValue = parseInt(e.target.value);
            onChange(isNaN(parsedValue) ? null : parsedValue);
          }}
        />
        <Button
          variant="outline"
          onClick={() => onChange(null)}
        >
          {t('q3a.unknown')}
        </Button>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          {t('form.previous')}
        </Button>
        <Button onClick={onNext}>{t('form.next')}</Button>
      </div>
    </QuestionContainer>
  );
};

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
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title={t('q4.title')}
      questionText={t('q4.question')}
      questionId="downpayment"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Button
          variant={value === true ? 'default' : 'outline'}
          onClick={() => onChange(true)}
        >
          {t('q4.yes')}
        </Button>
        <Button
          variant={value === false ? 'default' : 'outline'}
          onClick={() => onChange(false)}
        >
          {t('q4.no')}
        </Button>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          {t('form.previous')}
        </Button>
        <Button onClick={onNext}>{t('form.next')}</Button>
      </div>
    </QuestionContainer>
  );
};

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
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title={t('q4a.title')}
      questionText={t('q4a.question')}
      questionId="downpaymentamount"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Input
          type="number"
          placeholder="Enter amount"
          value={value === null ? '' : value.toString()}
          onChange={(e) => {
            const parsedValue = parseInt(e.target.value);
            onChange(isNaN(parsedValue) ? null : parsedValue);
          }}
        />
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          {t('form.previous')}
        </Button>
        <Button onClick={onNext}>{t('form.next')}</Button>
      </div>
    </QuestionContainer>
  );
};

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
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title="Down Payment Assistance"
      questionText="Are you open to down payment assistance programs?"
      questionId="downpaymentassistance"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Button
          variant={value === true ? 'default' : 'outline'}
          onClick={() => onChange(true)}
        >
          Yes
        </Button>
        <Button
          variant={value === false ? 'default' : 'outline'}
          onClick={() => onChange(false)}
        >
          No
        </Button>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          {t('form.previous')}
        </Button>
        <Button onClick={onNext}>{t('form.next')}</Button>
      </div>
    </QuestionContainer>
  );
};

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
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title="Monthly Debts"
      questionText="What are your total monthly debt payments (credit cards, student loans, car loans, etc.)?"
      questionId="monthlydebts"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Input
          type="number"
          placeholder="Enter amount"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          {t('form.previous')}
        </Button>
        <Button onClick={onNext}>{t('form.next')}</Button>
      </div>
    </QuestionContainer>
  );
};

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
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title="Credit Issues"
      questionText="Have you had any credit issues in the past (bankruptcy, foreclosure, collections, etc.)?"
      questionId="creditissues"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Button
          variant={value === true ? 'default' : 'outline'}
          onClick={() => onChange(true)}
        >
          Yes
        </Button>
        <Button
          variant={value === false ? 'default' : 'outline'}
          onClick={() => onChange(false)}
        >
          No
        </Button>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          {t('form.previous')}
        </Button>
        <Button onClick={onNext}>{t('form.next')}</Button>
      </div>
    </QuestionContainer>
  );
};

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
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title="Credit Issue Details"
      questionText="Please provide details about your credit issue."
      questionId="creditissuedetails"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Select onValueChange={onChangeType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select issue type" defaultValue={type || undefined} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bankruptcy">Bankruptcy</SelectItem>
            <SelectItem value="foreclosure">Foreclosure</SelectItem>
            <SelectItem value="collections">Collections</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="number"
          placeholder="Enter year of issue"
          value={year === null ? '' : year.toString()}
          onChange={(e) => {
            const parsedValue = parseInt(e.target.value);
            onChangeYear(isNaN(parsedValue) ? null : parsedValue);
          }}
        />
        <Input
          type="number"
          placeholder="Enter amount of issue"
          value={amount === null ? '' : amount.toString()}
          onChange={(e) => {
            const parsedValue = parseInt(e.target.value);
            onChangeAmount(isNaN(parsedValue) ? null : parsedValue);
          }}
        />
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          {t('form.previous')}
        </Button>
        <Button onClick={onNext}>{t('form.next')}</Button>
      </div>
    </QuestionContainer>
  );
};

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
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title={t('q5.title')}
      questionText={t('q5.question')}
      questionId="idtype"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Button
          variant={value === 'SSN' ? 'default' : 'outline'}
          onClick={() => onChange('SSN')}
        >
          US Citizen
        </Button>
        <Button
          variant={value === 'ITIN' ? 'default' : 'outline'}
          onClick={() => onChange('ITIN')}
        >
          Permanent Resident (Green Card)
        </Button>
        <Button
          variant={value === 'none' ? 'default' : 'outline'}
          onClick={() => onChange('none')}
        >
          Undocumented
        </Button>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          {t('form.previous')}
        </Button>
        <Button onClick={onNext}>{t('form.next')}</Button>
      </div>
    </QuestionContainer>
  );
};

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
  name: FormState['name'];
  phone: FormState['phone'];
  email: FormState['email'];
  comments: FormState['comments'];
  onChangeName: (value: FormState['name']) => void;
  onChangePhone: (value: FormState['phone']) => void;
  onChangeEmail: (value: FormState['email']) => void;
  onChangeComments: (value: FormState['comments']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title="Contact Information"
      questionText="Please provide your contact information."
      questionId="contactinfo"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => onChangeName(e.target.value)}
        />
        <Input
          type="tel"
          placeholder="Enter your phone number"
          value={phone}
          onChange={(e) => onChangePhone(e.target.value)}
        />
        <Input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => onChangeEmail(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Any comments?"
          value={comments}
          onChange={(e) => onChangeComments(e.target.value)}
        />
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          {t('form.previous')}
        </Button>
        <Button onClick={onNext}>{t('form.next')}</Button>
      </div>
    </QuestionContainer>
  );
};

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
  
  const handleProceedToDocuments = () => {
    console.log("Proceeding to document collection");
    alert(language === 'en' 
      ? "In a complete implementation, this would proceed to document collection." 
      : "En una implementación completa, esto procedería a la recolección de documentos.");
  };
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Summary & Recommendations" : "Resumen y Recomendaciones"}
      questionText={language === 'en' 
        ? "Based on the information provided, here's your mortgage qualification summary:"
        : "Basado en la información proporcionada, aquí está su resumen de calificación hipotecaria:"}
      questionId="summary"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <SummaryOutcome 
        formData={formData}
        onProceedToDocuments={handleProceedToDocuments}
      />
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          {t('form.previous')}
        </Button>
        <Button type="button" onClick={() => window.location.href = '/'}>
          {language === 'en' ? 'Return to Dashboard' : 'Volver al Panel Principal'}
        </Button>
      </div>
    </QuestionContainer>
  );
};

const FormQuestions = ({ onComplete }: { onComplete: (data: FormState) => void }) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 12;

  const [formData, setFormData] = useState<FormState>({
    timeline: 'exploring',
    firstTimeBuyer: null,
    employmentType: null,
    selfEmployedYears: null,
    income: null,
    incomeType: 'annual',
    creditCategory: null,
    creditScore: null,
    downPaymentSaved: null,
    downPaymentAmount: null,
    assistanceOpen: null,
    monthlyDebts: "",
    hasCreditIssues: null,
    creditIssueType: null,
    creditIssueYear: null,
    creditIssueAmount: null,
    idType: null,
    name: "",
    phone: "",
    email: "",
    comments: ""
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const updateFormData = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormData({ ...formData, [key]: value });
  };

  const renderCurrentQuestion = () => {
    switch (currentStep) {
      case 1:
        return (
          <TimelineQuestion
            value={formData.timeline}
            onChange={(value) => updateFormData('timeline', value)}
            onNext={handleNext}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      case 2:
        return (
          <FirstTimeBuyerQuestion
            value={formData.firstTimeBuyer}
            onChange={(value) => updateFormData('firstTimeBuyer', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      case 3:
        return (
          <EmploymentQuestion
            value={formData.employmentType}
            onChange={(value) => updateFormData('employmentType', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      case 4:
        return formData.employmentType === '1099' ? (
          <SelfEmployedYearsQuestion
            value={formData.selfEmployedYears}
            onChange={(value) => updateFormData('selfEmployedYears', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        ) : (
          <IncomeQuestion
            incomeValue={formData.income}
            incomeTypeValue={formData.incomeType}
            onChangeIncome={(value) => updateFormData('income', value)}
            onChangeIncomeType={(value) => updateFormData('incomeType', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      case 5:
        return formData.employmentType === '1099' ? (
          <IncomeQuestion
            incomeValue={formData.income}
            incomeTypeValue={formData.incomeType}
            onChangeIncome={(value) => updateFormData('income', value)}
            onChangeIncomeType={(value) => updateFormData('incomeType', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        ) : (
          <CreditQuestion
            value={formData.creditCategory}
            onChange={(value) => updateFormData('creditCategory', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      case 6:
        return formData.employmentType === '1099' ? (
          <CreditQuestion
            value={formData.creditCategory}
            onChange={(value) => updateFormData('creditCategory', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        ) : (
          <CreditScoreQuestion
            value={formData.creditScore}
            onChange={(value) => updateFormData('creditScore', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      case 7:
        return formData.employmentType === '1099' ? (
          <CreditScoreQuestion
            value={formData.creditScore}
            onChange={(value) => updateFormData('creditScore', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        ) : (
          <DownPaymentQuestion
            value={formData.downPaymentSaved}
            onChange={(value) => updateFormData('downPaymentSaved', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      case 8:
        return (
          formData.employmentType === '1099' ? (
            <DownPaymentQuestion
              value={formData.downPaymentSaved}
              onChange={(value) => updateFormData('downPaymentSaved', value)}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          ) : (
            formData.downPaymentSaved ? (
              <DownPaymentAmountQuestion
                value={formData.downPaymentAmount}
                onChange={(value) => updateFormData('downPaymentAmount', value)}
                onNext={handleNext}
                onBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            ) : (
              <DownPaymentAssistanceQuestion
                value={formData.assistanceOpen}
                onChange={(value) => updateFormData('assistanceOpen', value)}
                onNext={handleNext}
                onBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            )
          )
        );
      case 9:
        return (
          formData.employmentType === '1099' ? (
            formData.downPaymentSaved ? (
              <DownPaymentAmountQuestion
                value={formData.downPaymentAmount}
                onChange={(value) => updateFormData('downPaymentAmount', value)}
                onNext={handleNext}
                onBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            ) : (
              <DownPaymentAssistanceQuestion
                value={formData.assistanceOpen}
                onChange={(value) => updateFormData('assistanceOpen', value)}
                onNext={handleNext}
                onBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            )
          ) : (
            <MonthlyDebtsQuestion
              value={formData.monthlyDebts}
              onChange={(value) => updateFormData('monthlyDebts', value)}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          )
        );
      case 10:
        return (
          formData.employmentType === '1099' ? (
            <MonthlyDebtsQuestion
              value={formData.monthlyDebts}
              onChange={(value) => updateFormData('monthlyDebts', value)}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          ) : (
            <CreditIssuesQuestion
              value={formData.hasCreditIssues}
              onChange={(value) => updateFormData('hasCreditIssues', value)}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          )
        );
      case 11:
        return (
          formData.employmentType === '1099' ? (
            <CreditIssuesQuestion
              value={formData.hasCreditIssues}
              onChange={(value) => updateFormData('hasCreditIssues', value)}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          ) : (
            formData.hasCreditIssues ? (
              <CreditIssueDetailsQuestion
                type={formData.creditIssueType}
                year={formData.creditIssueYear}
                amount={formData.creditIssueAmount}
                onChangeType={(value) => updateFormData('creditIssueType', value)}
                onChangeYear={(value) => updateFormData('creditIssueYear', value)}
                onChangeAmount={(value) => updateFormData('creditIssueAmount', value)}
                onNext={handleNext}
                onBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            ) : (
              <IdTypeQuestion
                value={formData.idType}
                onChange={(value) => updateFormData('idType', value)}
                onNext={handleNext}
                onBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            )
          )
        );
      case 12:
        return (
          formData.employmentType === '1099' ? (
            formData.hasCreditIssues ? (
              <CreditIssueDetailsQuestion
                type={formData.creditIssueType}
                year={formData.creditIssueYear}
                amount={formData.creditIssueAmount}
                onChangeType={(value) => updateFormData('creditIssueType', value)}
                onChangeYear={(value) => updateFormData('creditIssueYear', value)}
                onChangeAmount={(value) => updateFormData('creditIssueAmount', value)}
                onNext={handleNext}
                onBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            ) : (
              <ContactInfoQuestion
                name={formData.name}
                phone={formData.phone}
                email={formData.email}
                comments={formData.comments}
                onChangeName={(value) => updateFormData('name', value)}
                onChangePhone={(value) => updateFormData('phone', value)}
                onChangeEmail={(value) => updateFormData('email', value)}
                onChangeComments={(value) => updateFormData('comments', value)}
                onNext={handleNext}
                onBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            )
          ) : (
            <ContactInfoQuestion
              name={formData.name}
              phone={formData.phone}
              email={formData.email}
              comments={formData.comments}
              onChangeName={(value) => updateFormData('name', value)}
              onChangePhone={(value) => updateFormData('phone', value)}
              onChangeEmail={(value) => updateFormData('email', value)}
              onChangeComments={(value) => updateFormData('comments', value)}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          )
        );
      default:
        return (
          <SummaryQuestion
            formData={formData}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
    }
  };

  return renderCurrentQuestion();
};

export default FormQuestions;
