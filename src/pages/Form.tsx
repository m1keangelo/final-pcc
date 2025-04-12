
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import FormQuestions from "@/components/form/FormQuestions";
import SummaryOutcome from "@/components/form/SummaryOutcome";
import { Card } from "@/components/ui/card";
import { FormState } from "@/types/form";

const Form = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formStage, setFormStage] = useState<'questions' | 'summary'>('questions');
  const [formData, setFormData] = useState<FormState>({
    timeline: 'exploring',
    firstTimeBuyer: null,
    employmentType: null,
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

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2">Loan Prequalification Form</h1>
        <p className="text-xl text-muted-foreground">
          Fill out the form below to prequalify
        </p>
      </div>

      <div>
        {formStage === 'questions' ? (
          <FormQuestions 
            onComplete={(data: FormState) => {
              setFormData(data);
              setFormStage('summary');
            }} 
          />
        ) : (
          <SummaryOutcome 
            formData={formData}
            onProceedToDocuments={() => console.log('Proceeding to documents')} 
          />
        )}
      </div>
    </div>
  );
};

export default Form;
