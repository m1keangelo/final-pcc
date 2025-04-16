
import React from "react";
import { FormState } from "@/types/form";
import { QuestionRouterProps } from "./types";
import { handleSelfEmployedRoute } from "./selfEmployedRoute";
import { handleRegularRoute } from "./regularRoute";
import { renderSummaryComponent } from "./summaryComponent";

const QuestionRouter: React.FC<QuestionRouterProps> = (props) => {
  const { currentStep, formData } = props;
  
  // Handle routing based on employment type and step number
  const isSelfEmployed = formData.employmentType === '1099';
  
  // If we're on the last step (summary)
  if (currentStep > 12) {
    return renderSummaryComponent(props);
  }
  
  // Handle different question flows based on employment type
  if (isSelfEmployed && currentStep >= 4) {
    return handleSelfEmployedRoute(currentStep, props);
  } else {
    return handleRegularRoute(currentStep, props);
  }
};

export default QuestionRouter;
