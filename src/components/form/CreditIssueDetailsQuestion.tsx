
import { useState, useRef, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

const CreditIssueDetailsQuestion = ({
  type,
  year,
  amount,
  onChangeType,
  onChangeYear,
  onChangeAmount,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  type: FormState['creditIssueType'];
  year: FormState['creditIssueYear'];
  amount: FormState['creditIssueAmount'];
  onChangeType: (value: FormState['creditIssueType']) => void;
  onChangeYear: (value: FormState['creditIssueYear']) => void;
  onChangeAmount: (value: FormState['creditIssueAmount']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t } = useLanguage();
  const [yearInput, setYearInput] = useState(year?.toString() || "");
  const [amountInput, setAmountInput] = useState(amount?.toString() || "");
  const yearInputRef = useRef<HTMLInputElement>(null);
  const amountInputRef = useRef<HTMLInputElement>(null);
  
  // Focus the year input when type is selected
  useEffect(() => {
    if (type && yearInputRef.current) {
      setTimeout(() => {
        yearInputRef.current?.focus();
      }, 100);
    }
  }, [type]);
  
  // Focus the amount input when collections type is selected and year is entered
  useEffect(() => {
    if (type === 'collections' && year && amountInputRef.current) {
      setTimeout(() => {
        amountInputRef.current?.focus();
      }, 100);
    }
  }, [type, year]);
  
  const handleYearChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setYearInput(val);
    
    const numVal = parseInt(val);
    const currentYear = new Date().getFullYear();
    if (!isNaN(numVal) && numVal >= 1990 && numVal <= currentYear) {
      onChangeYear(numVal);
    } else {
      onChangeYear(null);
    }
  }, [onChangeYear]);
  
  const handleAmountChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setAmountInput(val);
    
    const numVal = parseFloat(val);
    if (!isNaN(numVal)) {
      onChangeAmount(numVal);
    } else {
      onChangeAmount(null);
    }
  }, [onChangeAmount]);
  
  const handleTypeChange = useCallback((value: string) => {
    onChangeType(value as FormState['creditIssueType']);
  }, [onChangeType]);
  
  const currentYear = new Date().getFullYear();
  
  return (
    <QuestionContainer
      title={t('q.creditIssueDetails.title')}
      questionText={t('q.creditIssueDetails.question')}
      questionId="creditissuedetails"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div>
          <Label htmlFor="creditIssueType" className="mb-2 block text-gallomodern-100">{t('q.creditIssueDetails.typeLabel')}</Label>
          <Select value={type || ""} onValueChange={handleTypeChange}>
            <SelectTrigger id="creditIssueType" className="w-full text-foreground bg-background/80">
              <SelectValue placeholder={t('q.creditIssueDetails.typePlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bankruptcy">{t('q.creditIssueDetails.bankruptcy')}</SelectItem>
              <SelectItem value="foreclosure">{t('q.creditIssueDetails.foreclosure')}</SelectItem>
              <SelectItem value="collections">{t('q.creditIssueDetails.collections')}</SelectItem>
              <SelectItem value="other">{t('q.creditIssueDetails.other')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="creditIssueYear" className="text-gallomodern-100">{t('q.creditIssueDetails.yearLabel')}</Label>
          <Input
            id="creditIssueYear"
            type="number"
            min="1990"
            max={currentYear}
            value={yearInput}
            onChange={handleYearChange}
            className="mt-1 text-foreground"
            placeholder={t('q.creditIssueDetails.yearPlaceholder')}
            ref={yearInputRef}
          />
        </div>
        
        {type === 'collections' && (
          <div>
            <Label htmlFor="creditIssueAmount" className="text-gallomodern-100">{t('q.creditIssueDetails.amountLabel')}</Label>
            <div className="relative mt-1">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <span className="text-gallomodern-300">$</span>
              </div>
              <Input
                id="creditIssueAmount"
                type="number"
                min="0"
                value={amountInput}
                onChange={handleAmountChange}
                placeholder={t('q.creditIssueDetails.amountPlaceholder')}
                className="pl-6 text-foreground"
                ref={amountInputRef}
              />
            </div>
          </div>
        )}
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
        <Button 
          onClick={onNext} 
          disabled={!type || !year || (type === 'collections' && amount === null)}
        >
          {t('form.next')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default React.memo(CreditIssueDetailsQuestion);
