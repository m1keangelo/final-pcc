
import React from "react";
import { FormState } from "@/types/form";

// Question Components
import TimelineQuestion from "./TimelineQuestion";
import FirstTimeBuyerQuestion from "./FirstTimeBuyerQuestion";
import EmploymentQuestion from "./EmploymentQuestion";
import SelfEmployedYearsQuestion from "./SelfEmployedYearsQuestion";
import IncomeQuestion from "./IncomeQuestion";
import CreditQuestion from "./CreditQuestion";
import CreditScoreQuestion from "./CreditScoreQuestion";
import DownPaymentQuestion from "./DownPaymentQuestion";
import DownPaymentAmountQuestion from "./DownPaymentAmountQuestion";
import DownPaymentAssistanceQuestion from "./DownPaymentAssistanceQuestion";
import MonthlyDebtsQuestion from "./MonthlyDebtsQuestion";
import CreditIssuesQuestion from "./CreditIssuesQuestion";
import IdTypeQuestion from "./IdTypeQuestion";
import ContactInfoQuestion from "./ContactInfoQuestion";
import SummaryQuestion from "./SummaryQuestion";

interface QuestionRouterProps {
  currentStep: number;
  totalSteps: number;
  formData: FormState;
  updateFormData: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  handleNext: () => void;
  handleBack: () => void;
}

const QuestionRouter: React.FC<QuestionRouterProps> = ({
  currentStep,
  totalSteps,
  formData,
  updateFormData,
  handleNext,
  handleBack,
}) => {
  switch (currentStep) {
    case 1:
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
          otherEmploymentDetails={formData.otherEmploymentDetails}
          onChange={(value) => updateFormData('employmentType', value)}
          onChangeOtherDetails={(value) => updateFormData('otherEmploymentDetails', value)}
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      );
    case 4:
      if (formData.employmentType === '1099') {
        return (
          <SelfEmployedYearsQuestion
            value={formData.selfEmployedYears}
            onChange={(value) => updateFormData('selfEmployedYears', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      } else {
        return (
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
    case 5:
      if (formData.employmentType === '1099') {
        return (
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
      } else {
        return (
          <CreditQuestion
            value={formData.creditCategory}
            onChange={(value) => updateFormData('creditCategory', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      }
    case 6:
      if (formData.employmentType === '1099') {
        return (
          <CreditQuestion
            value={formData.creditCategory}
            onChange={(value) => updateFormData('creditCategory', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      } else {
        return (
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
    case 7:
      if (formData.employmentType === '1099') {
        return (
          <CreditScoreQuestion
            value={formData.creditScore}
            onChange={(value) => updateFormData('creditScore', value)}
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
    case 8:
      if (formData.employmentType === '1099') {
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
      } else if (formData.downPaymentSaved) {
        return (
          <DownPaymentAmountQuestion
            value={formData.downPaymentAmount}
            onChange={(value) => updateFormData('downPaymentAmount', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      } else {
        return (
          <DownPaymentAssistanceQuestion
            value={formData.assistanceOpen}
            onChange={(value) => updateFormData('assistanceOpen', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      }
    case 9:
      if (formData.employmentType === '1099') {
        if (formData.downPaymentSaved) {
          return (
            <DownPaymentAmountQuestion
              value={formData.downPaymentAmount}
              onChange={(value) => updateFormData('downPaymentAmount', value)}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          );
        } else {
          return (
            <DownPaymentAssistanceQuestion
              value={formData.assistanceOpen}
              onChange={(value) => updateFormData('assistanceOpen', value)}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          );
        }
      } else {
        return (
          <MonthlyDebtsQuestion
            value={formData.monthlyDebts}
            onChange={(value) => updateFormData('monthlyDebts', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      }
    case 10:
      if (formData.employmentType === '1099') {
        return (
          <MonthlyDebtsQuestion
            value={formData.monthlyDebts}
            onChange={(value) => updateFormData('monthlyDebts', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      } else {
        return (
          <CreditIssuesQuestion
            value={formData.hasCreditIssues}
            creditIssues={formData.creditIssues}
            onChange={(value) => updateFormData('hasCreditIssues', value)}
            onCreditIssuesChange={(issues) => updateFormData('creditIssues', issues)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      }
    case 11:
      if (formData.employmentType === '1099') {
        return (
          <CreditIssuesQuestion
            value={formData.hasCreditIssues}
            creditIssues={formData.creditIssues}
            onChange={(value) => updateFormData('hasCreditIssues', value)}
            onCreditIssuesChange={(issues) => updateFormData('creditIssues', issues)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      } else {
        return (
          <IdTypeQuestion
            value={formData.idType}
            onChange={(value) => updateFormData('idType', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      }
    case 12:
      return (
        <IdTypeQuestion
          value={formData.idType}
          onChange={(value) => updateFormData('idType', value)}
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
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

export default QuestionRouter;
