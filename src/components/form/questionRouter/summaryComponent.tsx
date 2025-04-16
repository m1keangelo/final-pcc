
import React from "react";
import { QuestionRouterProps } from "./types";
import SummaryQuestion from "../SummaryQuestion";

export const renderSummaryComponent = (props: QuestionRouterProps) => {
  const { formData, handleBack, currentStep, totalSteps } = props;
  
  return (
    <SummaryQuestion
      formData={formData}
      onBack={handleBack}
      currentStep={currentStep}
      totalSteps={totalSteps}
    />
  );
};
