
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
  
  const { formData, updateFormData, handleFormDataChange, setFormData } = useFormData();

  const handleNextFromInitialInfo = () => {
    setFormStage('questions');
  };

  const handleFormComplete = (completedData: FormState) => {
    // Merge all form data together
    const finalData = {
      ...completedData,
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      agent: selectedAgent,
      campaign: selectedCampaign 
    };
    
    // Update the form data state with all information for the summary
    setFormData(finalData);
    setFormStage('summary');
    
    console.log('Submitting form data:', finalData);
    const transformedData = transformFormData(finalData, selectedAgent);
    console.log('Transformed client data for submission:', transformedData);
    
    // Add client to the database
    addClient({
      ...transformedData,
      campaign: selectedCampaign // Make sure campaign is set correctly
    });
    
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
        )}

        {formStage === 'questions' && (
          <FormQuestions 
            initialData={formData}
            onComplete={handleFormComplete}
            onBack={() => setFormStage('initialInfo')}
          />
        )}
        
        {formStage === 'summary' && (
          <SummaryOutcome 
            formData={formData}
            onProceedToDocuments={handleProceedToDocuments} 
          />
        )}
      </div>
    </div>
  );
};

export default FormContainer;
