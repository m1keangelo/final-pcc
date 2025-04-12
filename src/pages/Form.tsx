
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { FormState, FormStep } from "@/types/form";
import {
  EmploymentQuestion,
  IncomeQuestion,
  CreditQuestion,
  CreditScoreQuestion,
  DownPaymentQuestion,
  DownPaymentAmountQuestion,
  LegalStatusQuestion,
  ContactInfoQuestion,
  SummaryQuestion
} from "@/components/form/FormQuestions";

const Form = () => {
  const { t } = useLanguage();
  
  // Form state
  const [formData, setFormData] = useState<FormState>({
    employmentType: null,
    incomeType: 'annual',
    income: null,
    creditCategory: null,
    creditScore: null,
    downPaymentSaved: null,
    downPaymentAmount: null,
    legalStatus: null,
    name: '',
    phone: '',
    comments: ''
  });
  
  // Current step state
  const [currentStep, setCurrentStep] = useState<FormStep>('employment');
  
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

  // Total steps for progress indicator
  const totalSteps = 7;
  
  // Current step number for progress indicator
  const getCurrentStepNumber = () => {
    switch (currentStep) {
      case 'employment': return 1;
      case 'income': return 2;
      case 'credit': return 3;
      case 'creditScore': return 3;
      case 'downPayment': return 4;
      case 'downPaymentAmount': return 4;
      case 'legalStatus': return 5;
      case 'contactInfo': return 6;
      case 'summary': return 7;
      default: return 1;
    }
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
      
      {/* Render current step */}
      {currentStep === 'employment' && (
        <EmploymentQuestion 
          value={formData.employmentType}
          onChange={(value) => updateFormData('employmentType', value)}
          onNext={() => goToNext('income')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {currentStep === 'income' && (
        <IncomeQuestion 
          incomeValue={formData.income}
          incomeTypeValue={formData.incomeType}
          onChangeIncome={(value) => updateFormData('income', value)}
          onChangeIncomeType={(value) => updateFormData('incomeType', value)}
          onNext={() => goToNext('credit')}
          onBack={() => goToPrevious('employment')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {currentStep === 'credit' && (
        <CreditQuestion 
          value={formData.creditCategory}
          onChange={(value) => {
            updateFormData('creditCategory', value);
            // If they change to a category that doesn't need score, clear it
            if (value !== 'Poor' && value !== 'Fair') {
              updateFormData('creditScore', null);
            }
          }}
          onNext={() => {
            // Conditional navigation based on credit category
            if (formData.creditCategory === 'Poor' || formData.creditCategory === 'Fair') {
              goToNext('creditScore');
            } else {
              goToNext('downPayment');
            }
          }}
          onBack={() => goToPrevious('income')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {currentStep === 'creditScore' && (
        <CreditScoreQuestion 
          value={formData.creditScore}
          onChange={(value) => updateFormData('creditScore', value)}
          onNext={() => goToNext('downPayment')}
          onBack={() => goToPrevious('credit')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {currentStep === 'downPayment' && (
        <DownPaymentQuestion 
          value={formData.downPaymentSaved}
          onChange={(value) => {
            updateFormData('downPaymentSaved', value);
            // If they change to No, clear any amount
            if (!value) {
              updateFormData('downPaymentAmount', null);
            }
          }}
          onNext={() => {
            // Conditional navigation based on down payment answer
            if (formData.downPaymentSaved) {
              goToNext('downPaymentAmount');
            } else {
              goToNext('legalStatus');
            }
          }}
          onBack={() => {
            // Go back to credit score if they had poor/fair credit, otherwise to credit
            if (formData.creditCategory === 'Poor' || formData.creditCategory === 'Fair') {
              goToPrevious('creditScore');
            } else {
              goToPrevious('credit');
            }
          }}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {currentStep === 'downPaymentAmount' && (
        <DownPaymentAmountQuestion 
          value={formData.downPaymentAmount}
          onChange={(value) => updateFormData('downPaymentAmount', value)}
          onNext={() => goToNext('legalStatus')}
          onBack={() => goToPrevious('downPayment')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {currentStep === 'legalStatus' && (
        <LegalStatusQuestion 
          value={formData.legalStatus}
          onChange={(value) => updateFormData('legalStatus', value)}
          onNext={() => goToNext('contactInfo')}
          onBack={() => {
            // Go back to amount if they had savings, otherwise to down payment
            if (formData.downPaymentSaved) {
              goToPrevious('downPaymentAmount');
            } else {
              goToPrevious('downPayment');
            }
          }}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
      {currentStep === 'contactInfo' && (
        <ContactInfoQuestion 
          name={formData.name}
          phone={formData.phone}
          comments={formData.comments}
          onChangeName={(value) => updateFormData('name', value)}
          onChangePhone={(value) => updateFormData('phone', value)}
          onChangeComments={(value) => updateFormData('comments', value)}
          onNext={() => goToNext('summary')}
          onBack={() => goToPrevious('legalStatus')}
          currentStep={getCurrentStepNumber()}
          totalSteps={totalSteps}
        />
      )}
      
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
