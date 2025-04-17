import React from "react";
import { QuestionRouterProps } from "./types";
import TimelineQuestion from "../TimelineQuestion";
import FirstTimeBuyerQuestion from "../FirstTimeBuyerQuestion";
import EmploymentQuestion from "../EmploymentQuestion";
import IncomeQuestion from "../IncomeQuestion";
import CreditQuestion from "../CreditQuestion";
import CreditScoreQuestion from "../CreditScoreQuestion";
import DownPaymentQuestion from "../DownPaymentQuestion";
import DownPaymentAmountQuestion from "../DownPaymentAmountQuestion";
import DownPaymentAssistanceQuestion from "../DownPaymentAssistanceQuestion";
import MonthlyDebtsQuestion from "../MonthlyDebtsQuestion";
import CreditIssuesQuestion from "../CreditIssuesQuestion";
import IdTypeQuestion from "../IdTypeQuestion";

export const handleRegularRoute = (
  step: number,
  props: QuestionRouterProps
) => {
  const { formData, updateFormData, handleNext, handleBack, currentStep, totalSteps } = props;

  switch (step) {
    case 1:
      return (
        <TimelineQuestion
          value={formData.timeline}
          onChange={(value) => updateFormData("timeline", value)}
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
          onChange={(value) => updateFormData("firstTimeBuyer", value)}
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
          onChange={(value) => updateFormData("employmentType", value)}
          onChangeOtherDetails={(value) => updateFormData("otherEmploymentDetails", value)}
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      );
    case 4:
      return (
        <IncomeQuestion
          value={formData.income}
          incomeType={formData.incomeType}
          onChange={(value) => updateFormData("income", value)}
          onChangeIncomeType={(value) => updateFormData("incomeType", value)}
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      );
    case 5:
      return (
        <CreditQuestion
          value={formData.creditCategory}
          onChange={(value) => updateFormData("creditCategory", value)}
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      );
    case 6:
      return (
        <CreditScoreQuestion
          value={formData.creditScore}
          onChange={(value) => updateFormData("creditScore", value)}
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      );
    case 7:
      return (
        <DownPaymentQuestion
          value={formData.downPaymentSaved}
          onChange={(value) => updateFormData("downPaymentSaved", value)}
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      );
    case 8:
      if (formData.downPaymentSaved) {
        return (
          <DownPaymentAmountQuestion
            value={formData.downPaymentAmount}
            onChange={(value) => updateFormData("downPaymentAmount", value)}
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
            onChange={(value) => updateFormData("assistanceOpen", value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      }
    case 9:
      return (
        <MonthlyDebtsQuestion
          value={formData.monthlyDebts}
          onChange={(value) => updateFormData("monthlyDebts", Number(value))}
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      );
    case 10:
      return (
        <CreditIssuesQuestion
          value={formData.hasCreditIssues}
          creditIssues={formData.creditIssues}
          onChange={(value) => updateFormData("hasCreditIssues", value)}
          onCreditIssuesChange={(issues) => updateFormData("creditIssues", issues)}
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      );
    case 11:
      return (
        <IdTypeQuestion
          value={formData.idType}
          onChange={(value) => updateFormData("idType", value)}
          onNext={handleNext}
          onBack={handleBack}
          currentStep={currentStep}
          totalSteps={totalSteps}
        />
      );
    default:
      return null;
  }
};
