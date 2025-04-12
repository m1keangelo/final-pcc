
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue, 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, CheckCircle, XCircle } from "lucide-react";
import QuestionContainer from "@/components/form/QuestionContainer";
import { useLanguage } from "@/contexts/LanguageContext";
import { FormState, FormStep, isQualified } from "@/types/form";
import { useData } from "@/contexts/DataContext";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

// Employment Question Component
export const EmploymentQuestion = ({
  value,
  onChange,
  onNext,
  currentStep,
  totalSteps
}: {
  value: FormState['employmentType'];
  onChange: (value: FormState['employmentType']) => void;
  onNext: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title={t('q1.title')}
      questionText={t('q1.question')}
      questionId="q1"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <RadioGroup
        value={value ?? undefined}
        onValueChange={(val) => onChange(val as 'W-2' | '1099')}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="W-2" id="w2" />
          <Label htmlFor="w2" className="flex-1 cursor-pointer">
            {t('q1.option1')}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="1099" id="1099" />
          <Label htmlFor="1099" className="flex-1 cursor-pointer">
            {t('q1.option2')}
          </Label>
        </div>
      </RadioGroup>
      
      <div className="flex justify-end mt-6">
        <Button 
          onClick={onNext}
          disabled={!value}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Income Question Component
export const IncomeQuestion = ({
  incomeValue,
  incomeTypeValue,
  onChangeIncome,
  onChangeIncomeType,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  incomeValue: FormState['income'];
  incomeTypeValue: FormState['incomeType'];
  onChangeIncome: (value: FormState['income']) => void;
  onChangeIncomeType: (value: FormState['incomeType']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title={t('q2.title')}
      questionText={t('q2.question')}
      questionId="q2"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <RadioGroup
          value={incomeTypeValue}
          onValueChange={(val) => onChangeIncomeType(val as 'annual' | 'monthly')}
          className="flex flex-wrap gap-4 mb-4"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="annual" id="annual" />
            <Label htmlFor="annual" className="cursor-pointer">
              {t('q2.annual')}
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="monthly" id="monthly" />
            <Label htmlFor="monthly" className="cursor-pointer">
              {t('q2.monthly')}
            </Label>
          </div>
        </RadioGroup>
        
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
          <Input 
            type="number" 
            min="0"
            className="pl-7" 
            value={incomeValue?.toString() ?? ''} 
            onChange={(e) => onChangeIncome(e.target.value ? Number(e.target.value) : null)}
          />
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={incomeValue === null}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Credit Question Component
export const CreditQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['creditCategory'];
  onChange: (value: FormState['creditCategory']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title={t('q3.title')}
      questionText={t('q3.question')}
      questionId="q3"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <Select 
        value={value ?? undefined} 
        onValueChange={(val) => onChange(val as FormState['creditCategory'])}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select credit rating" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Poor">{t('q3.option1')}</SelectItem>
          <SelectItem value="Fair">{t('q3.option2')}</SelectItem>
          <SelectItem value="Good">{t('q3.option3')}</SelectItem>
          <SelectItem value="Excellent">{t('q3.option4')}</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={!value}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Credit Score Question Component (conditional)
export const CreditScoreQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['creditScore'];
  onChange: (value: FormState['creditScore']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t } = useLanguage();
  const [unknown, setUnknown] = useState(false);
  
  return (
    <QuestionContainer
      title={t('q3a.title')}
      questionText={t('q3a.question')}
      questionId="q3"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <Input 
          type="number" 
          min="300"
          max="850"
          placeholder={t('q3a.placeholder')}
          value={value?.toString() ?? ''} 
          onChange={(e) => {
            setUnknown(false);
            onChange(e.target.value ? Number(e.target.value) : null);
          }}
          disabled={unknown}
        />
        
        <div className="flex items-center space-x-2">
          <input 
            type="checkbox"
            id="unknown-score"
            checked={unknown}
            onChange={(e) => {
              setUnknown(e.target.checked);
              if (e.target.checked) {
                onChange(null);
              }
            }}
            className="w-4 h-4 rounded border-gray-300"
          />
          <Label htmlFor="unknown-score" className="cursor-pointer">
            {t('q3a.unknown')}
          </Label>
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={!unknown && value === null}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Down Payment Question Component
export const DownPaymentQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['downPaymentSaved'];
  onChange: (value: FormState['downPaymentSaved']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title={t('q4.title')}
      questionText={t('q4.question')}
      questionId="q4"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <RadioGroup
        value={value === null ? undefined : value ? 'yes' : 'no'}
        onValueChange={(val) => onChange(val === 'yes')}
        className="space-y-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="yes" id="yes-payment" />
          <Label htmlFor="yes-payment" className="cursor-pointer">
            {t('q4.yes')}
          </Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="no" id="no-payment" />
          <Label htmlFor="no-payment" className="cursor-pointer">
            {t('q4.no')}
          </Label>
        </div>
      </RadioGroup>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={value === null}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Down Payment Amount Question Component (conditional)
export const DownPaymentAmountQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['downPaymentAmount'];
  onChange: (value: FormState['downPaymentAmount']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title={t('q4a.title')}
      questionText={t('q4a.question')}
      questionId="q4"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
        <Input 
          type="number" 
          min="0"
          className="pl-7" 
          value={value?.toString() ?? ''} 
          onChange={(e) => onChange(e.target.value ? Number(e.target.value) : null)}
        />
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={value === null || value === 0}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Legal Status Question Component
export const LegalStatusQuestion = ({
  value,
  onChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['legalStatus'];
  onChange: (value: FormState['legalStatus']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title={t('q5.title')}
      questionText={t('q5.question')}
      questionId="q5"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <Select 
        value={value ?? undefined} 
        onValueChange={(val) => onChange(val as FormState['legalStatus'])}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select legal status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="US Citizen">{t('q5.option1')}</SelectItem>
          <SelectItem value="Permanent Resident">{t('q5.option2')}</SelectItem>
          <SelectItem value="Work Permit">{t('q5.option3')}</SelectItem>
          <SelectItem value="Undocumented">{t('q5.option4')}</SelectItem>
        </SelectContent>
      </Select>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={!value}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Contact Info Question Component
export const ContactInfoQuestion = ({
  name,
  phone,
  comments,
  onChangeName,
  onChangePhone,
  onChangeComments,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  name: string;
  phone: string;
  comments: string;
  onChangeName: (value: string) => void;
  onChangePhone: (value: string) => void;
  onChangeComments: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t } = useLanguage();
  
  return (
    <QuestionContainer
      title="Contact Information"
      questionText="Please enter the client's contact information"
      questionId="contact"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input 
            id="name"
            value={name} 
            onChange={(e) => onChangeName(e.target.value)}
            placeholder="Enter client's full name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input 
            id="phone"
            value={phone} 
            onChange={(e) => onChangePhone(e.target.value)}
            placeholder="Enter phone number"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="comments">Comments or Notes (optional)</Label>
          <Textarea 
            id="comments"
            value={comments} 
            onChange={(e) => onChangeComments(e.target.value)}
            placeholder="Add any additional information or notes about the client"
            rows={3}
          />
        </div>
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext}
          disabled={!name || !phone}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.next')} <ArrowRight size={16} className="ml-2" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

// Summary Component
export const SummaryQuestion = ({
  formData,
  onBack,
  currentStep,
  totalSteps
}: {
  formData: FormState;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t } = useLanguage();
  const { addClient } = useData();
  const navigate = useNavigate();
  const qualified = isQualified(formData);
  
  const handleSubmit = () => {
    addClient({
      name: formData.name,
      phone: formData.phone,
      employmentType: formData.employmentType!,
      incomeAnnual: formData.incomeType === 'annual' ? 
        formData.income! : 
        formData.income! * 12,
      creditCategory: formData.creditCategory!,
      creditScoreApprox: formData.creditScore || undefined,
      downPaymentSaved: formData.downPaymentSaved!,
      downPaymentAmount: formData.downPaymentSaved ? formData.downPaymentAmount! : undefined,
      legalStatus: formData.legalStatus!,
      qualified,
      consentGiven: true,
      comments: formData.comments
    });
    
    toast.success("Client data saved successfully!");
    navigate("/clients");
  };
  
  return (
    <QuestionContainer
      title="Summary"
      questionText="Review client information"
      questionId="summary"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className={`p-4 rounded-md ${qualified ? 'bg-green-900/30' : 'bg-red-900/30'} mb-4`}>
          <div className="flex items-center">
            {qualified ? (
              <CheckCircle className="text-green-500 mr-2 flex-shrink-0" />
            ) : (
              <XCircle className="text-red-500 mr-2 flex-shrink-0" />
            )}
            <p className="text-md font-medium">
              {qualified ? t('form.result.qualified') : t('form.result.notqualified')}
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Employment Type</p>
            <p className="font-medium">{formData.employmentType}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Income</p>
            <p className="font-medium">
              ${formData.income?.toLocaleString()} 
              {formData.incomeType === 'monthly' ? '/month' : '/year'}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Credit Category</p>
            <p className="font-medium">{formData.creditCategory}</p>
            {formData.creditScore && (
              <p className="text-xs text-muted-foreground">Score: {formData.creditScore}</p>
            )}
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Down Payment</p>
            {formData.downPaymentSaved ? (
              <p className="font-medium">
                Yes - ${formData.downPaymentAmount?.toLocaleString()}
              </p>
            ) : (
              <p className="font-medium">No</p>
            )}
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Legal Status</p>
            <p className="font-medium">{formData.legalStatus}</p>
          </div>
          
          <div>
            <p className="text-sm text-muted-foreground">Contact</p>
            <p className="font-medium">{formData.name}</p>
            <p className="text-sm">{formData.phone}</p>
          </div>
        </div>
        
        {formData.comments && (
          <div>
            <p className="text-sm text-muted-foreground">Comments</p>
            <p className="text-sm border-l-2 border-gallopurple pl-3 mt-1">
              {formData.comments}
            </p>
          </div>
        )}
      </div>
      
      <div className="flex justify-between mt-6">
        <Button variant="outline" onClick={onBack}>
          <ArrowLeft size={16} className="mr-2" /> {t('form.previous')}
        </Button>
        <Button 
          onClick={handleSubmit}
          className="bg-gallopurple hover:bg-gallopurple-dark"
        >
          {t('form.complete')}
        </Button>
      </div>
    </QuestionContainer>
  );
};
