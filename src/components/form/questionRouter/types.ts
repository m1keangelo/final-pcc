
import { FormState } from "@/types/form";

export interface QuestionRouterProps {
  currentStep: number;
  totalSteps: number;
  formData: FormState;
  updateFormData: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  handleNext: () => void;
  handleBack: () => void;
}

export interface QuestionComponentProps {
  value: any;
  onChange: (value: any) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}
