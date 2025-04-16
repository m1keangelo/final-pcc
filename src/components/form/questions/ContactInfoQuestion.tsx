
import { useLanguage } from "@/contexts/LanguageContext";
import QuestionContainer from "@/components/form/QuestionContainer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ContactInfoQuestionProps {
  name: string;
  phone: string;
  email: string;
  comments: string;
  onChangeName: (value: string) => void;
  onChangePhone: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangeComments: (value: string) => void;
  onNext: () => void;
  onBack?: () => void;
  currentStep: number;
  totalSteps: number;
}

export const ContactInfoQuestion = ({
  name,
  phone,
  email,
  comments,
  onChangeName,
  onChangePhone,
  onChangeEmail,
  onChangeComments,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: ContactInfoQuestionProps) => {
  const { language } = useLanguage();

  return (
    <QuestionContainer
      title={language === 'en' ? "Contact Information" : "Información de Contacto"}
      questionText={language === 'en'
        ? "Please provide your contact information"
        : "Por favor proporcione su información de contacto"}
      questionId="contactInfo"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name" className="required">
            {language === 'en' ? "Full Name" : "Nombre Completo"}
          </Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="required">
            {language === 'en' ? "Phone Number" : "Número de Teléfono"}
          </Label>
          <Input
            id="phone"
            value={phone}
            onChange={(e) => onChangePhone(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email" className="required">
            {language === 'en' ? "Email Address" : "Correo Electrónico"}
          </Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="comments">
            {language === 'en' ? "Additional Comments (Optional)" : "Comentarios Adicionales (Opcional)"}
          </Label>
          <textarea
            id="comments"
            className="w-full h-24 border border-gray-300 rounded-md p-2"
            value={comments}
            onChange={(e) => onChangeComments(e.target.value)}
          ></textarea>
        </div>
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
