import React, { useEffect, useState, useCallback } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { FormState } from "@/types/form";

interface InitialInfoFormProps {
  formData: FormState;
  onFormDataChange: (field: keyof FormState, value: string) => void;
  selectedAgent: string;
  setSelectedAgent: (agent: string) => void;
  onNext: () => void;
}

const InitialInfoForm: React.FC<InitialInfoFormProps> = ({
  formData,
  onFormDataChange,
  selectedAgent,
  setSelectedAgent,
  onNext,
}) => {
  const { language } = useLanguage();
  const [formattedPhone, setFormattedPhone] = useState("");

  const formatPhoneNumber = useCallback((value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const truncated = cleaned.slice(0, 10);
    
    if (truncated.length === 0) {
      return "";
    } else if (truncated.length <= 3) {
      return `(${truncated}`;
    } else if (truncated.length <= 6) {
      return `(${truncated.slice(0, 3)}) ${truncated.slice(3)}`;
    } else {
      return `(${truncated.slice(0, 3)}) ${truncated.slice(3, 6)}-${truncated.slice(6)}`;
    }
  }, []);

  useEffect(() => {
    if (formData.phone) {
      setFormattedPhone(formatPhoneNumber(formData.phone));
    }
  }, [formData.phone, formatPhoneNumber]);

  const handleInitialInfoChange = (field: keyof FormState, value: string) => {
    onFormDataChange(field, value);
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleaned = value.replace(/\D/g, '');
    onFormDataChange("phone", cleaned);
  };

  const handleNextFromInitialInfo = () => {
    if (formData.name && formData.phone && formData.email) {
      onNext();
      toast.success(
        language === "en"
          ? "Contact information saved"
          : "Información de contacto guardada"
      );
    } else {
      toast.error(
        language === "en"
          ? "Please fill all contact information fields"
          : "Por favor complete todos los campos de información de contacto"
      );
    }
  };

  const agents = [
    { id: "soreal", name: "SoReal Estate" },
    { id: "tito", name: "Tito Baptista" },
    { id: "dens", name: "Dens Taveras" },
    { id: "dennis", name: "Dennis Lopez" },
    { id: "alvaro", name: "Alvaro Terry" },
  ];

  return (
    <Card className="w-full max-w-[800px] mx-auto shadow-lg border-t-4 border-t-purple-500">
      <div className="p-6 space-y-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          {language === "en"
            ? "Contact Information"
            : "Información de Contacto"}
        </h2>

        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">
                {language === "en" ? "Full Name" : "Nombre Completo"}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInitialInfoChange("name", e.target.value)}
                placeholder={language === "en" ? "Enter your full name" : "Ingrese su nombre completo"}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">
                {language === "en" ? "Phone Number" : "Número de Teléfono"}
              </Label>
              <Input
                id="phone"
                value={formattedPhone}
                onChange={handlePhoneChange}
                placeholder={language === "en" ? "(123) 456-7890" : "Ingrese su número de teléfono"}
                type="tel"
                inputMode="numeric"
                className="h-11"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">
              {language === "en" ? "Email Address" : "Correo Electrónico"}
            </Label>
            <Input
              id="email"
              value={formData.email}
              onChange={(e) => handleInitialInfoChange("email", e.target.value)}
              placeholder={language === "en" ? "yourname@example.com" : "Ingrese su correo electrónico"}
              type="email"
              className="h-11"
            />
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <Button
            onClick={handleNextFromInitialInfo}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 transition-colors w-full sm:w-auto"
          >
            {language === "en" ? "Start Questionnaire" : "Comenzar Cuestionario"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default InitialInfoForm;
