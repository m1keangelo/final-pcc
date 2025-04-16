
import { useState } from "react";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";

// Import components directly from their respective files
import { CreditHelpQuestion } from './questions/CreditHelpQuestion';
import { CurrentHousingQuestion } from './questions/CurrentHousingQuestion';
import { LeaseEndDateQuestion } from './questions/LeaseEndDateQuestion';

// Import other question components from the questions.tsx file
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
} from './questions';

const FormQuestions = ({ onComplete }: { onComplete: (data: FormState) => void }) => {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 15; // Updated total steps

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
    comments: "",
    currentHousing: null,
    wantsCreditHelp: null,
    leaseEndDate: null,
    creditRatingScore: null,
    creditRatingTier: null
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

  const shouldShowCreditHelp = () => {
    return formData.creditCategory === 'fair' || 
           formData.creditCategory === 'poor' || 
           formData.creditCategory === 'unknown';
  };

  const shouldShowLeaseEndDate = () => {
    return formData.currentHousing === 'rent' && 
           (formData.timeline === '3to6months' || 
            formData.timeline === '6to12months' || 
            formData.timeline === 'exploring');
  };

  const renderCurrentQuestion = () => {
    if (currentStep === 1) {
      return (
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
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      );
    }
    
    if (currentStep === 2) {
      return (
        <CurrentHousingQuestion
          value={formData.currentHousing}
          onChange={(value) => updateFormData('currentHousing', value)}
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      );
    }
    
    if (currentStep === 3) {
      return (
        <TimelineQuestion
          value={formData.timeline}
          onChange={(value) => updateFormData('timeline', value)}
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      );
    }
    
    if (currentStep === 4) {
      if (shouldShowLeaseEndDate()) {
        return (
          <LeaseEndDateQuestion
            value={formData.leaseEndDate}
            onChange={(value) => updateFormData('leaseEndDate', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      } else {
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
      }
    }
    
    if (currentStep === 5) {
      if (shouldShowLeaseEndDate()) {
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
      } else {
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
      }
    }
    
    const leaseOffset = shouldShowLeaseEndDate() ? 0 : -1;
    
    if (currentStep === 6 + leaseOffset) {
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
    }
    
    if (currentStep === 7 + leaseOffset) {
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
    }
    
    if (currentStep === 8 + leaseOffset) {
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
          onChange={(value) => {
            updateFormData('creditCategory', value);
            if (value === 'excellent') {
              updateFormData('creditRatingScore', 10);
              updateFormData('creditRatingTier', 'Excellent');
            } else if (value === 'good') {
              updateFormData('creditRatingScore', 8);
              updateFormData('creditRatingTier', 'Good');
            } else if (value === 'fair') {
              updateFormData('creditRatingScore', 6);
              updateFormData('creditRatingTier', 'Fair');
            } else if (value === 'poor') {
              updateFormData('creditRatingScore', 3);
              updateFormData('creditRatingTier', 'Poor');
            } else if (value === 'unknown') {
              updateFormData('creditRatingScore', 2);
              updateFormData('creditRatingTier', 'Unknown');
            }
          }}
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      );
    }
    
    if (currentStep === 9 + leaseOffset) {
      return formData.employmentType === '1099' ? (
        <CreditQuestion
          value={formData.creditCategory}
          onChange={(value) => {
            updateFormData('creditCategory', value);
            if (value === 'excellent') {
              updateFormData('creditRatingScore', 10);
              updateFormData('creditRatingTier', 'Excellent');
            } else if (value === 'good') {
              updateFormData('creditRatingScore', 8);
              updateFormData('creditRatingTier', 'Good');
            } else if (value === 'fair') {
              updateFormData('creditRatingScore', 6);
              updateFormData('creditRatingTier', 'Fair');
            } else if (value === 'poor') {
              updateFormData('creditRatingScore', 3);
              updateFormData('creditRatingTier', 'Poor');
            } else if (value === 'unknown') {
              updateFormData('creditRatingScore', 2);
              updateFormData('creditRatingTier', 'Unknown');
            }
          }}
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
    }
    
    if (currentStep === 10 + leaseOffset) {
      if (formData.employmentType === '1099') {
        return (
          <CreditQuestion
            value={formData.creditCategory}
            onChange={(value) => {
              updateFormData('creditCategory', value);
              if (value === 'excellent') {
                updateFormData('creditRatingScore', 10);
                updateFormData('creditRatingTier', 'Excellent');
              } else if (value === 'good') {
                updateFormData('creditRatingScore', 8);
                updateFormData('creditRatingTier', 'Good');
              } else if (value === 'fair') {
                updateFormData('creditRatingScore', 6);
                updateFormData('creditRatingTier', 'Fair');
              } else if (value === 'poor') {
                updateFormData('creditRatingScore', 3);
                updateFormData('creditRatingTier', 'Poor');
              } else if (value === 'unknown') {
                updateFormData('creditRatingScore', 2);
                updateFormData('creditRatingTier', 'Unknown');
              }
            }}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      } else if (shouldShowCreditHelp()) {
        return (
          <CreditHelpQuestion
            value={formData.wantsCreditHelp}
            onChange={(value) => updateFormData('wantsCreditHelp', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      } else {
        return (
          <DownPaymentQuestion
            value={formData.downPaymentSaved}
            onChange={(value) => updateFormData('downPaymentSaved', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      }
    }
    
    const creditHelpOffset = shouldShowCreditHelp() ? 0 : -1;
    
    if (currentStep === 11 + leaseOffset + creditHelpOffset) {
      if (formData.employmentType === '1099' && shouldShowCreditHelp()) {
        return (
          <CreditHelpQuestion
            value={formData.wantsCreditHelp}
            onChange={(value) => updateFormData('wantsCreditHelp', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      } else {
        return (
          <DownPaymentQuestion
            value={formData.downPaymentSaved}
            onChange={(value) => updateFormData('downPaymentSaved', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      }
    }
    
    const selfEmployedCreditHelpOffset = 
      formData.employmentType === '1099' && shouldShowCreditHelp() ? 0 : 
      formData.employmentType === '1099' ? creditHelpOffset : 0;

    if (currentStep === 12 + leaseOffset + creditHelpOffset + selfEmployedCreditHelpOffset) {
      return (
        formData.employmentType === '1099' && !shouldShowCreditHelp() ? (
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
    }
    
    return (
      <SummaryQuestion
        formData={formData}
        onBack={handleBack}
        onNext={() => onComplete(formData)}
        currentStep={currentStep}
        totalSteps={totalSteps}
      />
    );
  };

  return renderCurrentQuestion();
};

export default FormQuestions;
