
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import FormQuestions from "@/components/form/FormQuestions";
import SummaryOutcome from "@/components/form/SummaryOutcome";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FormState } from "@/types/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const Form = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const { addClient } = useData();
  const navigate = useNavigate();

  const [formStage, setFormStage] = useState<'initialInfo' | 'questions' | 'summary'>('initialInfo');
  const [selectedAgent, setSelectedAgent] = useState<string>("SoReal Estate");
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
    idType: null,
    name: "",
    phone: "",
    email: "",
    comments: ""
  });

  useEffect(() => {
    if (formData.phone) {
      const cleaned = formData.phone.replace(/\D/g, '');
      const formatted = formatPhoneNumber(cleaned);
      
      if (formatted !== formData.phone) {
        setFormData(prev => ({ ...prev, phone: formatted }));
      }
    }
  }, [formData.phone]);

  const agents = [
    { id: "soreal", name: "SoReal Estate" },
    { id: "tito", name: "Tito Baptista" },
    { id: "dens", name: "Dens Taveras" },
    { id: "dennis", name: "Dennis Lopez" },
    { id: "alvaro", name: "Alvaro Terry" }
  ];

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const truncated = cleaned.slice(0, 10);
    
    if (truncated.length <= 3) {
      return truncated;
    } else if (truncated.length <= 6) {
      return `(${truncated.slice(0, 3)}) ${truncated.slice(3)}`;
    } else {
      return `(${truncated.slice(0, 3)}) ${truncated.slice(3, 6)}-${truncated.slice(6)}`;
    }
  };

  const handleInitialInfoChange = (field: keyof FormState, value: string) => {
    if (field === 'phone') {
      const onlyDigits = value.replace(/\D/g, '');
      setFormData({
        ...formData,
        [field]: onlyDigits
      });
    } else {
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };

  const handleNextFromInitialInfo = () => {
    if (formData.name && formData.phone && formData.email) {
      setFormStage('questions');
      toast.success(language === 'en' ? 
        'Contact information saved' : 
        'Información de contacto guardada');
    } else {
      toast.error(language === 'en' ? 
        'Please fill all contact information fields' : 
        'Por favor complete todos los campos de información de contacto');
    }
  };

  // Add the transformFormData function that was missing
  const transformFormData = (data: FormState) => {
    // Transform the form data to the format needed by the data context
    return {
      ...data,
      date: new Date().toISOString(),
      id: Date.now().toString(),
      status: 'new'
    };
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
    
    addClient({ ...transformFormData(finalData) });
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-bold mb-2">{t('form.title')}</h1>
        <p className="text-xl text-muted-foreground">
          {t('form.subtitle')}
        </p>
      </div>

      <div>
        <Card className="w-full">
          {formStage === 'initialInfo' && (
            <div className="p-6 space-y-6">
              <h2 className="text-2xl font-semibold mb-4">
                {language === 'en' ? 'Contact Information' : 'Información de Contacto'}
              </h2>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-base font-medium">
                    {language === 'en' ? 'Select Agent' : 'Seleccionar Agente'}
                  </Label>
                  <RadioGroup 
                    value={selectedAgent} 
                    onValueChange={setSelectedAgent}
                    className="flex flex-wrap gap-4 mt-2"
                  >
                    {agents.map((agent) => (
                      <div key={agent.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={agent.name} id={agent.id} />
                        <Label htmlFor={agent.id} className="cursor-pointer">{agent.name}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="name">{language === 'en' ? 'Full Name' : 'Nombre Completo'}</Label>
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => handleInitialInfoChange('name', e.target.value)}
                    placeholder={language === 'en' ? 'Enter your full name' : 'Ingrese su nombre completo'}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">{language === 'en' ? 'Phone Number' : 'Número de Teléfono'}</Label>
                  <Input 
                    id="phone" 
                    value={formData.phone} 
                    onChange={(e) => handleInitialInfoChange('phone', e.target.value)}
                    placeholder={language === 'en' ? 'Enter your phone number' : 'Ingrese su número de teléfono'}
                    type="tel"
                    inputMode="numeric"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">{language === 'en' ? 'Email Address' : 'Correo Electrónico'}</Label>
                  <Input 
                    id="email" 
                    value={formData.email} 
                    onChange={(e) => handleInitialInfoChange('email', e.target.value)}
                    placeholder={language === 'en' ? 'Enter your email address' : 'Ingrese su correo electrónico'}
                    type="email"
                  />
                </div>
              </div>
              
              <div className="flex justify-end mt-6">
                <Button onClick={handleNextFromInitialInfo}>
                  {language === 'en' ? 'Next' : 'Siguiente'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
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
              onProceedToDocuments={() => console.log('Proceeding to documents')} 
            />
          ) : null}
        </Card>
      </div>
    </div>
  );
};

export default Form;
