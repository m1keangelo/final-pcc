
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
import QuestionRouter from "./QuestionRouter";
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

  const [formData, setFormData] = useState<FormState>(initialData || {
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
    creditIssues: {}, // Initialize the new credit issues data structure
    idType: null,
    name: "",
    phone: "",
    email: "",
    comments: ""
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      // Set income to 0 if unemployed before skipping
      if (currentStep === 3 && formData.employmentType === 'unemployed') {
        setFormData(prev => ({ ...prev, income: 0 }));
      }
      
      const nextStep = getNextStep(currentStep, formData);
      setCurrentStep(nextStep);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      const prevStep = getPreviousStep(currentStep, formData);
      setCurrentStep(prevStep);
    } else if (onBack) {
      onBack();
    }
  };

  const updateFormData = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormData({ ...formData, [key]: value });
  };

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
