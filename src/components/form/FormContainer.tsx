
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import { toast } from "sonner";
import { FormState } from "@/types/form";
import FormHeader from "./FormHeader";
import InitialInfoForm from "./InitialInfoForm";
import FormQuestions from "./FormQuestions";
import SummaryOutcome from "./SummaryOutcome";
import useFormData from "@/hooks/useFormData";
import { transformFormData } from "@/utils/formDataTransformer";

const FormContainer: React.FC = () => {
  const { language } = useLanguage();
  const { addClient } = useData();
  const navigate = useNavigate();

  const [formStage, setFormStage] = useState<'initialInfo' | 'questions' | 'summary'>('initialInfo');
  const [selectedAgent, setSelectedAgent] = useState<string>("SoReal Estate");
  
  const { formData, updateFormData, handleFormDataChange, setFormData } = useFormData();

  const handleNextFromInitialInfo = () => {
    setFormStage('questions');
  };

  const handleFormComplete = (completedData: FormState) => {
    const finalData = {
      ...completedData,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      agent: selectedAgent
    };
    
    setFormData(finalData);
    setFormStage('summary');
    
    const transformedData = transformFormData(finalData, selectedAgent);
    addClient(transformedData);
    
    toast.success(language === 'en' ? 
      'Your information has been submitted successfully!' : 
      '¡Su información ha sido enviada con éxito!');
  };

  const handleProceedToDocuments = () => {
    navigate('/documents');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8 animate-fade-in bg-gradient-to-b from-background to-background/95">
      <FormHeader />

      <div>
        {formStage === 'initialInfo' && (
          <InitialInfoForm 
            formData={formData}
            onFormDataChange={handleFormDataChange}
            selectedAgent={selectedAgent}
            setSelectedAgent={setSelectedAgent}
            onNext={handleNextFromInitialInfo}
          />
        )}

        {formStage === 'questions' ? (
          <FormQuestions 
            initialData={formData}
            onComplete={handleFormComplete}
            onBack={() => setFormStage('initialInfo')}
          />
        ) : formStage === 'summary' ? (
          <SummaryOutcome 
            formData={formData}
            onProceedToDocuments={handleProceedToDocuments} 
          />
        ) : null}
      </div>
    </div>
  );
};

export default FormContainer;
