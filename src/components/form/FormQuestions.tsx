import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import SummaryOutcome from './SummaryOutcome';

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
  const { t, language } = useLanguage();
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
