
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

export const EmploymentQuestion = ({
  value,
  otherEmploymentDetails,
  onChange,
  onChangeOtherDetails,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['employmentType'];
  otherEmploymentDetails?: string;
  onChange: (value: FormState['employmentType']) => void;
  onChangeOtherDetails?: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t } = useLanguage();
  const [showOtherInput, setShowOtherInput] = useState(value === 'other');
  
  // Handle the visibility of the "other" text field
  useEffect(() => {
    setShowOtherInput(value === 'other');
  }, [value]);
  
  // Function to check if the form can proceed
  const isFormValid = () => {
    // If "other" is selected, require the details field
    if (value === 'other') {
      return !!otherEmploymentDetails?.trim();
    }
    // For other options, just require a selection
    return !!value;
  };
  
  // Define feedback messages based on employment type selection
  const getFeedbackMessage = () => {
    switch(value) {
      case 'W-2':
        return "Simple setup — your consistent income makes underwriting smooth. Send us your latest pay stub and we'll get the wheels moving.";
      case '1099':
        return "You're the boss. We'll use tax returns, bank deposits, and smart structuring to show the full picture. If write-offs shrink your income, we'll use lender tricks to show the real story.";
      case 'retired':
        return "You've earned it — now we'll put those retirement benefits to work. Pension, Social Security, or assets, we'll leverage every bit.";
      case 'unemployed':
        return "That's OK. If you've got savings, a job lined up, or a strong co-borrower, we'll build a workaround. We've helped many in transition — and still closed deals.";
      case 'other':
        return "Every path has a paper trail. If it's not standard, we'll make it understandable. Real life isn't always black and white — and neither is lending.";
      default:
        return "";
    }
  };
  
  return (
    <QuestionContainer
      title={t('q.employment.title')}
      questionText={t('q.employment.question')}
      questionId="employment"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="grid gap-4">
        <Button
          variant={value === 'W-2' ? 'default' : 'outline'}
          onClick={() => onChange('W-2')}
        >
          {t('q.employment.w2')}
        </Button>
        <Button
          variant={value === '1099' ? 'default' : 'outline'}
          onClick={() => onChange('1099')}
        >
          {t('q.employment.1099')}
        </Button>
        <Button
          variant={value === 'retired' ? 'default' : 'outline'}
          onClick={() => onChange('retired')}
        >
          {t('q.employment.retired')}
        </Button>
        <Button
          variant={value === 'unemployed' ? 'default' : 'outline'}
          onClick={() => onChange('unemployed')}
        >
          {t('q.employment.unemployed')}
        </Button>
        <Button
          variant={value === 'other' ? 'default' : 'outline'}
          onClick={() => onChange('other')}
        >
          {t('q.employment.other')}
        </Button>
        
        {/* Show text input for "other" option */}
        {showOtherInput && onChangeOtherDetails && (
          <div className="mt-2">
            <Input
              placeholder={t('q.employment.otherPlaceholder') || "Please specify your employment situation"}
              value={otherEmploymentDetails || ""}
              onChange={(e) => onChangeOtherDetails(e.target.value)}
              className="mt-2"
            />
          </div>
        )}
      </div>
      
      {/* Display feedback message if an option is selected */}
      {value && (
        <div className="mt-4 p-4 border border-amber-200 rounded-md bg-amber-50">
          <p className="text-[#FFD700] font-medium">{getFeedbackMessage()}</p>
        </div>
      )}
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('form.previous')}
        </Button>
        <Button onClick={onNext} disabled={!isFormValid()}>
          {t('form.next')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default EmploymentQuestion;
