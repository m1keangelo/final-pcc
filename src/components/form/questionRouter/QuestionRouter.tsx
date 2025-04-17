
import React from "react";
import { FormState } from "@/types/form";
import { QuestionRouterProps } from "./types";
import { regularRoute } from "./regularRoute";
import { selfEmployedRoute } from "./selfEmployedRoute";
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
    const route = selfEmployedRoute.questions;
    const questionId = Object.keys(route)[currentStep - 4] || 'start';
    const questionConfig = route[questionId];
    
    if (questionConfig) {
      return questionConfig.component(props);
    }
  } else {
    const route = regularRoute.questions;
    const questionId = Object.keys(route)[currentStep - 1] || 'idType';
    const questionConfig = route[questionId];
    
    if (questionConfig) {
      return questionConfig.component(props);
    }
  }
  
  return null;
};

export default QuestionRouter;
