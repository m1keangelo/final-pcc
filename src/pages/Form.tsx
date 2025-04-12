
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import FormQuestions from "@/components/form/FormQuestions";
import SummaryOutcome from "@/components/form/SummaryOutcome";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormState } from "@/types/form";

const Form = () => {
  const { t, language } = useLanguage();
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
        <h1 className="text-4xl font-bold mb-2">
          {language === 'en' ? 'Loan Prequalification Form' : 'Formulario de Precalificación de Préstamo'}
        </h1>
        <p className="text-xl text-muted-foreground">
          {language === 'en' ? 'Fill out the form below to prequalify' : 'Complete el formulario a continuación para precalificar'}
        </p>
      </div>

      <div>
        <Card className="w-full max-w-[1200px] mx-auto">
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
        </Card>
      </div>
    </div>
  );
};

export default Form;
