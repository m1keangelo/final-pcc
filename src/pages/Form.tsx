
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FormState, FormStep, isQualified, getQualificationCategory } from "@/types/form";
import {
  TimelineQuestion,
  FirstTimeBuyerQuestion,
  EmploymentQuestion,
  SelfEmployedYearsQuestion,
  IncomeQuestion,
  CreditQuestion,
  CreditScoreQuestion,
  DownPaymentQuestion,
  DownPaymentAmountQuestion,
  DownPaymentAssistanceQuestion,
  MonthlyDebtsQuestion,
  CreditIssuesQuestion,
  CreditIssueDetailsQuestion,
  IdTypeQuestion,
  ContactInfoQuestion,
  SummaryQuestion
} from "@/components/form/FormQuestions";

const Form = () => {
  const { t } = useLanguage();
  
  // Form state with default values
  const [formData, setFormData] = useState<FormState>({
    timeline: null,
    firstTimeBuyer: null,
    employmentType: null,
    selfEmployedYears: null,
    incomeType: 'annual',
    income: null,
    creditCategory: null,
    creditScore: null,
    downPaymentSaved: null,
    downPaymentAmount: null,
    assistanceOpen: null,
    monthlyDebts: '',
    hasCreditIssues: null,
    creditIssueType: null,
    creditIssueYear: null,
    creditIssueAmount: null,
    idType: null,
    name: '',
    phone: '',
    email: '',
    comments: ''
  });
  
  // Current step state
  const [currentStep, setCurrentStep] = useState<FormStep>('timeline');
  
  // Update form data helper
  const updateFormData = (field: keyof FormState, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  
  // Navigation helpers
  const goToNext = (nextStep: FormStep) => {
    setCurrentStep(nextStep);
    window.scrollTo(0, 0);
  };
  
  const goToPrevious = (prevStep: FormStep) => {
    setCurrentStep(prevStep);
    window.scrollTo(0, 0);
  };
  
  // Conditional navigation logic
  const handleTimelineNext = () => {
    goToNext('firstTimeBuyer');
  };
  
  const handleFirstTimeBuyerNext = () => {
    goToNext('employment');
  };
  
  const handleEmploymentNext = () => {
    if (formData.employmentType === '1099') {
      goToNext('selfEmployedYears');
    } else {
      goToNext('income');
    }
  };
  
  const handleSelfEmployedYearsNext = () => {
    goToNext('income');
  };
  
  const handleIncomeNext = () => {
    goToNext('credit');
  };
  
  const handleCreditNext = () => {
    if (formData.creditCategory === 'poor' || formData.creditCategory === 'fair') {
      goToNext('creditScore');
    } else {
      goToNext('downPayment');
    }
  };
  
  const handleCreditScoreNext = () => {
    goToNext('downPayment');
  };
  
  const handleDownPaymentNext = () => {
    if (formData.downPaymentSaved) {
      goToNext('downPaymentAmount');
    } else {
      goToNext('downPaymentAssistance');
    }
  };
  
  const handleDownPaymentAmountNext = () => {
    goToNext('monthlyDebts');
  };
  
  const handleDownPaymentAssistanceNext = () => {
    goToNext('monthlyDebts');
  };
  
  const handleMonthlyDebtsNext = () => {
    goToNext('creditIssues');
  };
  
  const handleCreditIssuesNext = () => {
    if (formData.hasCreditIssues) {
      goToNext('creditIssueDetails');
    } else {
      goToNext('idType');
    }
  };
  
  const handleCreditIssueDetailsNext = () => {
    goToNext('idType');
  };
  
  const handleIdTypeNext = () => {
    goToNext('contactInfo');
  };
  
  const handleContactInfoNext = () => {
    goToNext('summary');
  };

  // Total steps for progress indicator
  const totalSteps = 10;
  
  // Current step number for progress indicator
  const getCurrentStepNumber = () => {
    const stepOrder: FormStep[] = [
      'timeline',
      'firstTimeBuyer',
      'employment',
      'income',
      'credit',
      'downPayment',
      'monthlyDebts',
      'creditIssues',
      'idType',
      'contactInfo',
      'summary'
    ];
    
    // Find the main step (ignoring conditional steps)
    const currentMainStepIndex = stepOrder.findIndex(step => {
      if (currentStep === step) return true;
      if (currentStep === 'selfEmployedYears' && step === 'employment') return true;
      if (currentStep === 'creditScore' && step === 'credit') return true;
      if ((currentStep === 'downPaymentAmount' || currentStep === 'downPaymentAssistance') && step === 'downPayment') return true;
      if (currentStep === 'creditIssueDetails' && step === 'creditIssues') return true;
      return false;
    });
    
    return currentMainStepIndex + 1;
  };

  return (
    <div className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">{t('form.title')}</h1>
      
      <div className="mb-8">
        <div className="bg-secondary h-2 rounded-full w-full">
          <div 
            className="bg-gallopurple h-2 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${(getCurrentStepNumber() / totalSteps) * 100}%` }} 
          />
        </div>
        <div className="mt-2 text-sm text-muted-foreground">
          {t('form.progress').replace('{current}', getCurrentStepNumber().toString())
            .replace('{total}', totalSteps.toString())}
        </div>
      </div>
      
      {/* Timeline Question */}
      {currentStep === 'timeline' && (
        <TimelineQuestion 
          value={formData.timeline}
          onChange={(value) => updateFormData('timeline', value)}
          onNext={handleTimelineNext}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {/* First Time Buyer Question */}
      {currentStep === 'firstTimeBuyer' && (
        <FirstTimeBuyerQuestion 
          value={formData.firstTimeBuyer}
          onChange={(value) => updateFormData('firstTimeBuyer', value)}
          onNext={handleFirstTimeBuyerNext}
          onBack={() => goToPrevious('timeline')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {/* Employment Question */}
      {currentStep === 'employment' && (
        <EmploymentQuestion 
          value={formData.employmentType}
          onChange={(value) => updateFormData('employmentType', value)}
          onNext={handleEmploymentNext}
          onBack={() => goToPrevious('firstTimeBuyer')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {/* Self-Employed Years Question (conditional) */}
      {currentStep === 'selfEmployedYears' && (
        <SelfEmployedYearsQuestion
          value={formData.selfEmployedYears}
          onChange={(value) => updateFormData('selfEmployedYears', value)}
          onNext={handleSelfEmployedYearsNext}
          onBack={() => goToPrevious('employment')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {/* Income Question */}
      {currentStep === 'income' && (
        <IncomeQuestion 
          incomeValue={formData.income}
          incomeTypeValue={formData.incomeType}
          onChangeIncome={(value) => updateFormData('income', value)}
          onChangeIncomeType={(value) => updateFormData('incomeType', value)}
          onNext={handleIncomeNext}
          onBack={() => formData.employmentType === '1099' ? goToPrevious('selfEmployedYears') : goToPrevious('employment')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {/* Credit Question */}
      {currentStep === 'credit' && (
        <CreditQuestion 
          value={formData.creditCategory}
          onChange={(value) => updateFormData('creditCategory', value)}
          onNext={handleCreditNext}
          onBack={() => goToPrevious('income')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {/* Credit Score Question (conditional) */}
      {currentStep === 'creditScore' && (
        <CreditScoreQuestion 
          value={formData.creditScore}
          onChange={(value) => updateFormData('creditScore', value)}
          onNext={handleCreditScoreNext}
          onBack={() => goToPrevious('credit')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {/* Down Payment Question */}
      {currentStep === 'downPayment' && (
        <DownPaymentQuestion 
          value={formData.downPaymentSaved}
          onChange={(value) => updateFormData('downPaymentSaved', value)}
          onNext={handleDownPaymentNext}
          onBack={() => formData.creditCategory === 'poor' || formData.creditCategory === 'fair' 
            ? goToPrevious('creditScore') 
            : goToPrevious('credit')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {/* Down Payment Amount Question (conditional) */}
      {currentStep === 'downPaymentAmount' && (
        <DownPaymentAmountQuestion 
          value={formData.downPaymentAmount}
          onChange={(value) => updateFormData('downPaymentAmount', value)}
          onNext={handleDownPaymentAmountNext}
          onBack={() => goToPrevious('downPayment')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {/* Down Payment Assistance Question (conditional) */}
      {currentStep === 'downPaymentAssistance' && (
        <DownPaymentAssistanceQuestion 
          value={formData.assistanceOpen}
          onChange={(value) => updateFormData('assistanceOpen', value)}
          onNext={handleDownPaymentAssistanceNext}
          onBack={() => goToPrevious('downPayment')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {/* Monthly Debts Question */}
      {currentStep === 'monthlyDebts' && (
        <MonthlyDebtsQuestion 
          value={formData.monthlyDebts}
          onChange={(value) => updateFormData('monthlyDebts', value)}
          onNext={handleMonthlyDebtsNext}
          onBack={() => formData.downPaymentSaved 
            ? goToPrevious('downPaymentAmount') 
            : goToPrevious('downPaymentAssistance')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {/* Credit Issues Question */}
      {currentStep === 'creditIssues' && (
        <CreditIssuesQuestion 
          value={formData.hasCreditIssues}
          onChange={(value) => updateFormData('hasCreditIssues', value)}
          onNext={handleCreditIssuesNext}
          onBack={() => goToPrevious('monthlyDebts')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {/* Credit Issue Details Question (conditional) */}
      {currentStep === 'creditIssueDetails' && (
        <CreditIssueDetailsQuestion 
          type={formData.creditIssueType}
          year={formData.creditIssueYear}
          amount={formData.creditIssueAmount}
          onChangeType={(value) => updateFormData('creditIssueType', value)}
          onChangeYear={(value) => updateFormData('creditIssueYear', value)}
          onChangeAmount={(value) => updateFormData('creditIssueAmount', value)}
          onNext={handleCreditIssueDetailsNext}
          onBack={() => goToPrevious('creditIssues')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {/* ID Type Question */}
      {currentStep === 'idType' && (
        <IdTypeQuestion 
          value={formData.idType}
          onChange={(value) => updateFormData('idType', value)}
          onNext={handleIdTypeNext}
          onBack={() => formData.hasCreditIssues 
            ? goToPrevious('creditIssueDetails') 
            : goToPrevious('creditIssues')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {/* Contact Info Question */}
      {currentStep === 'contactInfo' && (
        <ContactInfoQuestion 
          name={formData.name}
          phone={formData.phone}
          email={formData.email}
          comments={formData.comments}
          onChangeName={(value) => updateFormData('name', value)}
          onChangePhone={(value) => updateFormData('phone', value)}
          onChangeEmail={(value) => updateFormData('email', value)}
          onChangeComments={(value) => updateFormData('comments', value)}
          onNext={handleContactInfoNext}
          onBack={() => goToPrevious('idType')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {/* Summary Question */}
      {currentStep === 'summary' && (
        <SummaryQuestion 
          formData={formData}
          onBack={() => goToPrevious('contactInfo')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
    </div>
  );
};

export default Form;
