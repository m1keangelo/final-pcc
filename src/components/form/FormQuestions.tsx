
import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
import QuestionRouter from "./questionRouter/QuestionRouter";
import { getNextStep, getPreviousStep, getTotalSteps } from "@/utils/formNavigationUtils";

const FormQuestions = ({ 
  initialData,
  onComplete, 
  onBack 
}: { 
  initialData?: FormState,
  onComplete: (data: FormState) => void,
  onBack?: () => void
}) => {
  const { t } = useLanguage();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = getTotalSteps();

  const [formData, setFormData] = useState<FormState>({
    timeline: 'exploring',
    firstTimeBuyer: null,
    employmentType: null,
    otherEmploymentDetails: "",
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
    creditIssues: {}, // Initialize the credit issues data structure
    idType: null,
    name: "",
    phone: "",
    email: "",
    comments: ""
  });

  // Initialize from props if available
  useEffect(() => {
    if (initialData) {
      console.log("FormQuestions initializing with data:", initialData);
      setFormData(prevData => ({
        ...prevData,
        ...initialData
      }));
    }
  }, [initialData]);

  const handleNext = useCallback(() => {
    console.log("Current step:", currentStep, "of", totalSteps);
    
    if (currentStep < totalSteps) {
      // Set income to 0 if unemployed before skipping
      if (currentStep === 3 && formData.employmentType === 'unemployed') {
        setFormData(prev => ({ ...prev, income: 0 }));
      }
      
      const nextStep = getNextStep(currentStep, formData);
      console.log("Moving to step:", nextStep);
      setCurrentStep(nextStep);
    } else {
      // We're at the last step, complete the form
      console.log("Form completed. Submitting data:", formData);
      onComplete(formData);
    }
  }, [currentStep, totalSteps, formData, onComplete]);

  const handleBack = useCallback(() => {
    if (currentStep > 1) {
      const prevStep = getPreviousStep(currentStep, formData);
      setCurrentStep(prevStep);
    } else if (onBack) {
      onBack();
    }
  }, [currentStep, formData, onBack]);

  const updateFormData = useCallback(<K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormData(prev => {
      const updated = { ...prev, [key]: value };
      console.log(`Updated ${String(key)}:`, value);
      return updated;
    });
  }, []);

  return (
    <div className="animate-fade-in">
      {currentStep === 1 && onBack && (
        <div className="p-4 border-b">
          <Button variant="outline" size="sm" onClick={onBack}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t('form.backToContactInfo')}
          </Button>
        </div>
      )}
      <QuestionRouter
        currentStep={currentStep}
        totalSteps={totalSteps}
        formData={formData}
        updateFormData={updateFormData}
        handleNext={handleNext}
        handleBack={handleBack}
      />
    </div>
  );
};

export default FormQuestions;
