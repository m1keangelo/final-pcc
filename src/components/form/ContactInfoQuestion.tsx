
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import QuestionContainer from "@/components/form/QuestionContainer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState, useRef } from "react";

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
}: {
  name: string;
  phone: string;
  email: string;
  comments: string;
  onChangeName: (value: string) => void;
  onChangePhone: (value: string) => void;
  onChangeEmail: (value: string) => void;
  onChangeComments: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t } = useLanguage();
  const [formattedPhone, setFormattedPhone] = useState(phone);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  
  const isFormValid = () => {
    return name.trim() !== '' && phone.trim() !== '' && email.trim() !== '';
  };
  
  // Format the phone number whenever it changes
  useEffect(() => {
    if (phone && phone !== formattedPhone.replace(/\D/g, '')) {
      const cleaned = phone.replace(/\D/g, '');
      const formatted = formatPhoneNumber(cleaned);
      setFormattedPhone(formatted);
    }
  }, [phone, formattedPhone]);
  
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
  
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const cleaned = value.replace(/\D/g, '');
    onChangePhone(cleaned);
    
    // Maintain cursor position after formatting
    const formattedValue = formatPhoneNumber(cleaned);
    if (formattedValue !== value) {
      setFormattedPhone(formattedValue);
    }
  };
  
  return (
    <QuestionContainer
      title={t('q.contactInfo.title')}
      questionText={t('q.contactInfo.question')}
      questionId="contactinfo"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="name" className="text-gallomodern-100">{t('q.contactInfo.nameLabel')}</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
            placeholder={t('q.contactInfo.namePlaceholder')}
            className="text-foreground"
            autoFocus={currentStep === 1}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone" className="text-gallomodern-100">{t('q.contactInfo.phoneLabel')}</Label>
          <Input
            id="phone"
            type="tel"
            value={formattedPhone}
            onChange={handlePhoneChange}
            placeholder={t('q.contactInfo.phonePlaceholder')}
            className="text-foreground"
            inputMode="numeric"
            ref={phoneInputRef}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email" className="text-gallomodern-100">{t('q.contactInfo.emailLabel')}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
            placeholder={t('q.contactInfo.emailPlaceholder')}
            className="text-foreground"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="comments" className="text-gallomodern-100">{t('q.contactInfo.commentsLabel')}</Label>
          <Textarea
            id="comments"
            value={comments}
            onChange={(e) => onChangeComments(e.target.value)}
            placeholder={t('q.contactInfo.commentsPlaceholder')}
            rows={4}
            className="text-foreground"
          />
        </div>
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t('form.previous')}
        </Button>
        <Button onClick={onNext} disabled={!isFormValid()}>
          {t('form.next')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default ContactInfoQuestion;
