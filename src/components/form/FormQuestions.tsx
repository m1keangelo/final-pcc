
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft } from "lucide-react";
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
import CreditIssueDetailsQuestion from "./CreditIssueDetailsQuestion";
import IdTypeQuestion from "./IdTypeQuestion";
import ContactInfoQuestion from "./ContactInfoQuestion";
import SummaryQuestion from "./SummaryQuestion";

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
  const totalSteps = 12;

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
    idType: null,
    name: "",
    phone: "",
    email: "",
    comments: ""
  });

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else if (onBack) {
      onBack();
    }
  };

  const updateFormData = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setFormData({ ...formData, [key]: value });
  };

  const renderCurrentQuestion = () => {
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
        return formData.employmentType === '1099' ? (
          <SelfEmployedYearsQuestion
            value={formData.selfEmployedYears}
            onChange={(value) => updateFormData('selfEmployedYears', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        ) : (
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
      case 5:
        return formData.employmentType === '1099' ? (
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
        ) : (
          <CreditQuestion
            value={formData.creditCategory}
            onChange={(value) => updateFormData('creditCategory', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      case 6:
        return formData.employmentType === '1099' ? (
          <CreditQuestion
            value={formData.creditCategory}
            onChange={(value) => updateFormData('creditCategory', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        ) : (
          <CreditScoreQuestion
            value={formData.creditScore}
            onChange={(value) => updateFormData('creditScore', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      case 7:
        return formData.employmentType === '1099' ? (
          <CreditScoreQuestion
            value={formData.creditScore}
            onChange={(value) => updateFormData('creditScore', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        ) : (
          <DownPaymentQuestion
            value={formData.downPaymentSaved}
            onChange={(value) => updateFormData('downPaymentSaved', value)}
            onNext={handleNext}
            onBack={handleBack}
            currentStep={currentStep}
            totalSteps={totalSteps}
          />
        );
      case 8:
        return (
          formData.employmentType === '1099' ? (
            <DownPaymentQuestion
              value={formData.downPaymentSaved}
              onChange={(value) => updateFormData('downPaymentSaved', value)}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          ) : (
            formData.downPaymentSaved ? (
              <DownPaymentAmountQuestion
                value={formData.downPaymentAmount}
                onChange={(value) => updateFormData('downPaymentAmount', value)}
                onNext={handleNext}
                onBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            ) : (
              <DownPaymentAssistanceQuestion
                value={formData.assistanceOpen}
                onChange={(value) => updateFormData('assistanceOpen', value)}
                onNext={handleNext}
                onBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            )
          )
        );
      case 9:
        return (
          formData.employmentType === '1099' ? (
            formData.downPaymentSaved ? (
              <DownPaymentAmountQuestion
                value={formData.downPaymentAmount}
                onChange={(value) => updateFormData('downPaymentAmount', value)}
                onNext={handleNext}
                onBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            ) : (
              <DownPaymentAssistanceQuestion
                value={formData.assistanceOpen}
                onChange={(value) => updateFormData('assistanceOpen', value)}
                onNext={handleNext}
                onBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            )
          ) : (
            <MonthlyDebtsQuestion
              value={formData.monthlyDebts}
              onChange={(value) => updateFormData('monthlyDebts', value)}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          )
        );
      case 10:
        return (
          formData.employmentType === '1099' ? (
            <MonthlyDebtsQuestion
              value={formData.monthlyDebts}
              onChange={(value) => updateFormData('monthlyDebts', value)}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          ) : (
            <CreditIssuesQuestion
              value={formData.hasCreditIssues}
              onChange={(value) => updateFormData('hasCreditIssues', value)}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          )
        );
      case 11:
        return (
          formData.employmentType === '1099' ? (
            <CreditIssuesQuestion
              value={formData.hasCreditIssues}
              onChange={(value) => updateFormData('hasCreditIssues', value)}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          ) : (
            formData.hasCreditIssues ? (
              <CreditIssueDetailsQuestion
                type={formData.creditIssueType}
                year={formData.creditIssueYear}
                amount={formData.creditIssueAmount}
                onChangeType={(value) => updateFormData('creditIssueType', value)}
                onChangeYear={(value) => updateFormData('creditIssueYear', value)}
                onChangeAmount={(value) => updateFormData('creditIssueAmount', value)}
                onNext={handleNext}
                onBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            ) : (
              <IdTypeQuestion
                value={formData.idType}
                onChange={(value) => updateFormData('idType', value)}
                onNext={handleNext}
                onBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            )
          )
        );
      case 12:
        return (
          formData.employmentType === '1099' ? (
            formData.hasCreditIssues ? (
              <CreditIssueDetailsQuestion
                type={formData.creditIssueType}
                year={formData.creditIssueYear}
                amount={formData.creditIssueAmount}
                onChangeType={(value) => updateFormData('creditIssueType', value)}
                onChangeYear={(value) => updateFormData('creditIssueYear', value)}
                onChangeAmount={(value) => updateFormData('creditIssueAmount', value)}
                onNext={handleNext}
                onBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            ) : (
              <IdTypeQuestion
                value={formData.idType}
                onChange={(value) => updateFormData('idType', value)}
                onNext={handleNext}
                onBack={handleBack}
                currentStep={currentStep}
                totalSteps={totalSteps}
              />
            )
          ) : (
            <IdTypeQuestion
              value={formData.idType}
              onChange={(value) => updateFormData('idType', value)}
              onNext={handleNext}
              onBack={handleBack}
              currentStep={currentStep}
              totalSteps={totalSteps}
            />
          )
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
      {renderCurrentQuestion()}
    </div>
  );
};

export default FormQuestions;
