
import React, { useState, useRef, useEffect, useCallback } from "react";
import { memo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import QuestionContainer from "@/components/form/QuestionContainer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Use memo to prevent unnecessary re-renders
const ContactInfoQuestion = ({
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
  const [formattedPhone, setFormattedPhone] = useState("");
  const nameInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const commentsRef = useRef<HTMLTextAreaElement>(null);
  
  const isFormValid = () => {
    return name.trim() !== '' && phone.trim() !== '' && email.trim() !== '';
  };
  
  // Focus on name input when component mounts
  useEffect(() => {
    if (currentStep === 1 && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [currentStep]);
  
  // Format phone number for display
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
  
  // Update formatted phone whenever raw phone changes
  useEffect(() => {
    const formatted = formatPhoneNumber(phone);
    setFormattedPhone(formatted);
  }, [phone, formatPhoneNumber]);
  
  // Use memoized handlers to prevent unnecessary re-renders
  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeName(e.target.value);
  }, [onChangeName]);
  
  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeEmail(e.target.value);
  }, [onChangeEmail]);
  
  const handleCommentsChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChangeComments(e.target.value);
  }, [onChangeComments]);
  
  const handlePhoneChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Extract only digits for the raw phone value
    const cleaned = value.replace(/\D/g, '');
    
    // Update the parent component with just digits
    onChangePhone(cleaned);
  }, [onChangePhone]);
  
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
            onChange={handleNameChange}
            placeholder={t('q.contactInfo.namePlaceholder')}
            className="text-foreground"
            ref={nameInputRef}
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
            onChange={handleEmailChange}
            placeholder={t('q.contactInfo.emailPlaceholder')}
            className="text-foreground"
            ref={emailInputRef}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="comments" className="text-gallomodern-100">{t('q.contactInfo.commentsLabel')}</Label>
          <Textarea
            id="comments"
            value={comments}
            onChange={handleCommentsChange}
            placeholder={t('q.contactInfo.commentsPlaceholder')}
            rows={4}
            className="text-foreground"
            ref={commentsRef}
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

export default memo(ContactInfoQuestion);
