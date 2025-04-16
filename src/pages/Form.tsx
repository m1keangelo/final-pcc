
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import FormQuestions from "@/components/form/FormQuestions";
import SummaryOutcome from "@/components/form/SummaryOutcome";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormState } from "@/types/form";
import { toast } from "@/hooks/use-toast";

const Form = () => {
  const { language } = useLanguage();
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
    comments: "",
    currentHousing: null,
    wantsCreditHelp: null,
    leaseEndDate: null,
    creditRatingScore: null,
    creditRatingTier: null
  });

  // Handle form completion
  const handleFormComplete = (data: FormState) => {
    setFormData(data);
    setFormStage('summary');
    
    // Show toast notification
    toast({
      title: language === 'en' ? "Form completed" : "Formulario completado",
      description: language === 'en' ? "The prequalification form has been completed." : "El formulario de precalificación ha sido completado.",
    });
    
    // In a real implementation, we would save the data to a CRM here
    console.log("Form data submitted:", data);
  };

  // Handle proceeding to documents
  const handleProceedToDocuments = () => {
    toast({
      title: language === 'en' ? "Processing" : "Procesando",
      description: language === 'en' ? "Proceeding to document submission." : "Avanzando al envío de documentos.",
    });
    
    // In a real implementation, we would navigate to a documents page
    console.log("Proceeding to documents with data:", formData);
  };

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
              onComplete={handleFormComplete} 
            />
          ) : (
            <SummaryOutcome 
              formData={formData}
              onProceedToDocuments={handleProceedToDocuments} 
            />
          )}
        </Card>
      </div>
    </div>
  );
};

export default Form;
