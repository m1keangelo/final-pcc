
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import QuestionContainer from "@/components/form/QuestionContainer";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

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
  
  const isFormValid = () => {
    return name.trim() !== '' && phone.trim() !== '' && email.trim() !== '';
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
          <Label htmlFor="name">{t('q.contactInfo.nameLabel')}</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => onChangeName(e.target.value)}
            placeholder={t('q.contactInfo.namePlaceholder')}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">{t('q.contactInfo.phoneLabel')}</Label>
          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(e) => onChangePhone(e.target.value)}
            placeholder={t('q.contactInfo.phonePlaceholder')}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="email">{t('q.contactInfo.emailLabel')}</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => onChangeEmail(e.target.value)}
            placeholder={t('q.contactInfo.emailPlaceholder')}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="comments">{t('q.contactInfo.commentsLabel')}</Label>
          <Textarea
            id="comments"
            value={comments}
            onChange={(e) => onChangeComments(e.target.value)}
            placeholder={t('q.contactInfo.commentsPlaceholder')}
            rows={4}
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
