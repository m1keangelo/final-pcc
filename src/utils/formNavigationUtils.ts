
import { FormState } from "@/types/form";

/**
 * Determines the next step in the form flow based on current step and form data
 */
export const getNextStep = (currentStep: number, formData: FormState): number => {
  // Special case for the unemployed selection - skip income questions
  if (currentStep === 3 && formData.employmentType === 'unemployed') {
    // Skip to question 6 (credit question)
    return 6;
  }
  
  return currentStep + 1;
};

/**
 * Determines the previous step in the form flow based on current step and form data
 */
export const getPreviousStep = (currentStep: number, formData: FormState): number => {
  // Special case for going back when unemployed
  if (currentStep === 6 && formData.employmentType === 'unemployed') {
    return 3;
  }
  
  return currentStep - 1;
};

/**
 * Returns the total number of steps in the form
 */
export const getTotalSteps = (): number => {
  return 12;
};
