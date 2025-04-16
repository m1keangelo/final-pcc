
import { useLanguage } from "@/contexts/LanguageContext";
import QuestionContainer from "@/components/form/QuestionContainer";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert } from "@/components/ui/alert";
import { useState, useEffect } from "react";
import { getLeaseEndDateProximity } from "@/types/form";

interface LeaseEndDateQuestionProps {
  value: string | null;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
}

export const LeaseEndDateQuestion = ({ 
  value, 
  onChange, 
  onNext, 
  onBack, 
  currentStep, 
  totalSteps 
}: LeaseEndDateQuestionProps) => {
  const { language } = useLanguage();
  const [month, setMonth] = useState<string>(value?.split('/')[0] || "");
  const [year, setYear] = useState<string>(value?.split('/')[1] || "");
  const [proximity, setProximity] = useState<'soon' | 'distant' | null>(null);
  
  // Generate month options
  const months = Array.from({ length: 12 }, (_, i) => {
    const monthNum = i + 1;
    return { 
      value: String(monthNum).padStart(2, '0'),
      label: new Date(2000, i, 1).toLocaleString(language === 'en' ? 'en-US' : 'es', { month: 'long' })
    };
  });
  
  // Generate year options (current year + next 5 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 6 }, (_, i) => String(currentYear + i));
  
  // Update lease end date when month or year changes
  useEffect(() => {
    if (month && year) {
      const fullDate = `${month}/${year}`;
      onChange(fullDate);
      
      // Determine if the lease ends soon or is distant
      const newProximity = getLeaseEndDateProximity(fullDate);
      setProximity(newProximity);
    }
  }, [month, year, onChange]);
  
  return (
    <QuestionContainer
      title={language === 'en' ? "Lease End Date" : "Fecha de Finalización del Contrato"}
      questionText={language === 'en' 
        ? "When does your lease end?" 
        : "¿Cuándo finaliza su contrato de arrendamiento?"}
      questionId="leaseEndDate"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="month">{language === 'en' ? "Month" : "Mes"}</Label>
            <Select 
              value={month} 
              onValueChange={(value) => setMonth(value)}
            >
              <SelectTrigger id="month">
                <SelectValue placeholder={language === 'en' ? "Select month" : "Seleccionar mes"} />
              </SelectTrigger>
              <SelectContent>
                {months.map(month => (
                  <SelectItem key={month.value} value={month.value}>
                    {month.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="year">{language === 'en' ? "Year" : "Año"}</Label>
            <Select 
              value={year} 
              onValueChange={(value) => setYear(value)}
            >
              <SelectTrigger id="year">
                <SelectValue placeholder={language === 'en' ? "Select year" : "Seleccionar año"} />
              </SelectTrigger>
              <SelectContent>
                {years.map(year => (
                  <SelectItem key={year} value={year}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {proximity === 'soon' && (
          <Alert className="mt-2 p-4 bg-yellow-50 rounded-md text-yellow-800 text-base border-yellow-200">
            {language === 'en' 
              ? "Let's move quickly — we can get you in your new home before your lease is up." 
              : "Avancemos rápido — podemos conseguirle su nuevo hogar antes de que venza su contrato."}
          </Alert>
        )}
        
        {proximity === 'distant' && (
          <Alert className="mt-2 p-4 bg-yellow-50 rounded-md text-yellow-800 text-base border-yellow-200">
            {language === 'en' 
              ? "We may even help you exit your lease early. One of our agents can call you and explain how." 
              : "Incluso podríamos ayudarle a terminar su contrato antes de tiempo. Uno de nuestros agentes puede llamarle y explicarle cómo."}
          </Alert>
        )}
      </div>
      <div className="mt-6 flex justify-between">
        {onBack && (
          <Button variant="outline" onClick={onBack}>
            {language === 'en' ? "Back" : "Atrás"}
          </Button>
        )}
        <Button onClick={onNext}>
          {language === 'en' ? "Next" : "Siguiente"}
        </Button>
      </div>
    </QuestionContainer>
  );
};
