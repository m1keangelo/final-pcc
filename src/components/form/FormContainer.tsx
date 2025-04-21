
import React, { useState, useEffect } from "react";
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const FormContainer: React.FC = () => {
  const { language } = useLanguage();
  const { addClient, campaigns } = useData();
  const navigate = useNavigate();

  const [formStage, setFormStage] = useState<'initialInfo' | 'questions' | 'summary'>('initialInfo');
  const [selectedAgent, setSelectedAgent] = useState<string>("SoReal Estate");
  const [selectedCampaign, setSelectedCampaign] = useState<string>("Dennis Lopez Campaign");
  const [formCompleteData, setFormCompleteData] = useState<FormState | null>(null);
  
  const { formData, updateFormData, handleFormDataChange, setFormData } = useFormData();

  useEffect(() => {
    console.log("FormContainer - Current Stage:", formStage);
    console.log("FormContainer - Current Form Data:", formData);
    console.log("FormContainer - Complete Form Data:", formCompleteData);
  }, [formStage, formData, formCompleteData]);

  const handleNextFromInitialInfo = () => {
    console.log("Moving to questions stage");
    setFormStage('questions');
  };

  const handleFormComplete = (completedData: FormState) => {
    console.log('Form completion triggered with data:', completedData);
    
    try {
      // Create a complete data object with all form information
      const finalData = {
        ...completedData,
        name: formData.name || completedData.name,
        phone: formData.phone || completedData.phone,
        email: formData.email || completedData.email,
        agent: selectedAgent,
        campaign: selectedCampaign 
      };
      
      console.log('Final data before setting to state:', finalData);
      
      // First save complete data to state for the summary page
      setFormCompleteData(finalData);
      setFormData(finalData);
      
      // Send data to backend
      const transformedData = transformFormData(finalData, selectedAgent);
      console.log('Transformed client data for backend:', transformedData);
      
      addClient({
        ...transformedData,
        campaign: selectedCampaign
      });
      
      // Show success message
      toast.success(language === 'en' ? 
        'Your information has been submitted successfully!' : 
        '¡Su información ha sido enviada con éxito!');
      
      // Then change stage - this needs to happen AFTER data is set
      console.log('Changing form stage to summary');
      setTimeout(() => {
        setFormStage('summary');
      }, 100);
    } catch (error) {
      console.error("Error during form completion:", error);
      toast.error(language === 'en' ? 
        'There was an error submitting your information. Please try again.' : 
        'Hubo un error al enviar su información. Por favor, inténtelo de nuevo.');
    }
  };

  const handleProceedToDocuments = () => {
    navigate('/documents');
  };

  const renderFormContent = () => {
    switch (formStage) {
      case 'initialInfo':
        return (
          <>
            <InitialInfoForm 
              formData={formData}
              onFormDataChange={handleFormDataChange}
              selectedAgent={selectedAgent}
              setSelectedAgent={setSelectedAgent}
              onNext={handleNextFromInitialInfo}
            />
            
            <div className="mt-4">
              <Label htmlFor="campaign-select" className="text-base font-medium">
                {language === 'en' ? 'Select Campaign' : 'Seleccionar Campaña'}
              </Label>
              <Select
                value={selectedCampaign}
                onValueChange={setSelectedCampaign}
              >
                <SelectTrigger id="campaign-select" className="w-full mt-2 h-11 bg-popover">
                  <SelectValue placeholder={language === 'en' ? 'Select campaign' : 'Seleccionar campaña'} />
                </SelectTrigger>
                <SelectContent>
                  {campaigns.map(campaign => (
                    <SelectItem key={campaign} value={campaign}>
                      {campaign}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </>
        );
      
      case 'questions':
        return (
          <FormQuestions 
            initialData={formData}
            onComplete={handleFormComplete}
            onBack={() => setFormStage('initialInfo')}
          />
        );
      
      case 'summary':
        // Use either the complete form data or the current form data
        const summaryData = formCompleteData || formData;
        console.log("Rendering summary with data:", summaryData);
        
        return (
          <SummaryOutcome 
            formData={summaryData}
            onProceedToDocuments={handleProceedToDocuments} 
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 md:py-12 space-y-8 animate-fade-in bg-gradient-to-b from-background to-background/95">
      <FormHeader />
      
      {/* Using a unique key for each form stage to force re-render */}
      <div key={`form-stage-${formStage}-${Date.now()}`} className="form-container">
        {renderFormContent()}
      </div>
    </div>
  );
};

export default FormContainer;
