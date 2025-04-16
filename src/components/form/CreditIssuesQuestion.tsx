
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

const timeframeOptions = [
  { value: "1-3months", label: "1-3 months" },
  { value: "4-6months", label: "4-6 months" },
  { value: "7-9months", label: "7-9 months" },
  { value: "1year", label: "1 year" },
  { value: "2years", label: "2 years" },
  { value: "3years", label: "3 years" },
  { value: "4years", label: "4 years" },
  { value: "5years", label: "5 years" },
  { value: "6years", label: "6 years" },
  { value: "7years", label: "7 years" },
  { value: "8years", label: "8 years" },
  { value: "9years", label: "9 years" },
  { value: "10years", label: "10 years" },
];

type CreditIssueType = 'bankruptcy' | 'foreclosure' | 'collections' | 'medical' | 'other';

interface CreditIssueDetails {
  amount: number | null;
  timeframe: string | null;
  inCollection: boolean | null;
}

export const CreditIssuesQuestion = ({
  value,
  creditIssues,
  onChange,
  onCreditIssuesChange,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['hasCreditIssues'];
  creditIssues: FormState['creditIssues'];
  onChange: (value: FormState['hasCreditIssues']) => void;
  onCreditIssuesChange: (issues: FormState['creditIssues']) => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t } = useLanguage();
  const [openIssues, setOpenIssues] = useState<Record<CreditIssueType, boolean>>({
    bankruptcy: false,
    foreclosure: false,
    collections: false,
    medical: false,
    other: false
  });
  
  const toggleIssue = (issueType: CreditIssueType) => {
    setOpenIssues(prev => ({
      ...prev,
      [issueType]: !prev[issueType]
    }));
  };

  const handleIssueToggle = (issueType: CreditIssueType, isChecked: boolean) => {
    const updatedIssues = { ...creditIssues };
    
    updatedIssues[issueType] = isChecked;
    
    if (isChecked) {
      const detailsKey = `${issueType}Details` as keyof typeof updatedIssues;
      
      const details: CreditIssueDetails = {
        amount: null,
        timeframe: null,
        inCollection: null
      };
      
      updatedIssues[detailsKey] = details as any;

      setOpenIssues(prev => ({
        ...prev,
        [issueType]: true
      }));
    }
    
    onCreditIssuesChange(updatedIssues);
  };

  const handleIssueDetailChange = (
    issueType: CreditIssueType,
    field: 'amount' | 'timeframe' | 'inCollection',
    value: any
  ) => {
    const detailsKey = `${issueType}Details` as keyof typeof creditIssues;
    
    const currentDetails = creditIssues[detailsKey] || { amount: null, timeframe: null, inCollection: null };
    
    const updatedIssues = { ...creditIssues };
    
    if (typeof currentDetails === 'object' && currentDetails !== null) {
      const updatedDetails = {
        ...currentDetails,
        [field]: value
      };
      
      updatedIssues[detailsKey] = updatedDetails as any;
    } else {
      const newDetails = {
        amount: null,
        timeframe: null,
        inCollection: null,
        [field]: value
      };
      
      updatedIssues[detailsKey] = newDetails as any;
    }
    
    onCreditIssuesChange(updatedIssues);
  };
  
  const isAnyIssueComplete = () => {
    if (value === false) return true;
    
    if (value === true) {
      const issueTypes: CreditIssueType[] = ['bankruptcy', 'foreclosure', 'collections', 'medical', 'other'];
      return issueTypes.some(type => creditIssues[type]);
    }
    
    return false;
  };

  const renderIssueDetails = (issueType: CreditIssueType) => {
    const detailsKey = `${issueType}Details` as keyof typeof creditIssues;
    const details = creditIssues[detailsKey] as CreditIssueDetails | undefined;
    
    if (!details) return null;
    
    return (
      <div className="p-4 space-y-4 border-t border-purple-800/30 bg-[#121826] rounded-b-lg">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${issueType}-amount`} className="text-sm font-medium text-gray-300">
              Estimated Amount
            </Label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
              <Input
                id={`${issueType}-amount`}
                type="number"
                className="pl-7 bg-black border-purple-500 text-white"
                placeholder="Amount"
                value={details.amount || ''}
                onChange={e => handleIssueDetailChange(
                  issueType, 
                  'amount', 
                  e.target.value ? Number(e.target.value) : null
                )}
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${issueType}-timeframe`} className="text-sm font-medium text-gray-300">
              How long ago?
            </Label>
            <Select
              value={details.timeframe || ''}
              onValueChange={value => handleIssueDetailChange(issueType, 'timeframe', value)}
            >
              <SelectTrigger id={`${issueType}-timeframe`} className="bg-black border-purple-500 text-white">
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent className="bg-black border-purple-500 text-white">
                {timeframeOptions.map(option => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <Label className="text-sm font-medium mb-2 block text-gray-300">Collection Status</Label>
          <RadioGroup
            value={details.inCollection !== null ? details.inCollection.toString() : ''}
            onValueChange={value => handleIssueDetailChange(
              issueType, 
              'inCollection', 
              value === 'true'
            )}
            className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4 mt-1"
          >
            <div className="flex items-center space-x-2 bg-black px-4 py-2 rounded-md border border-purple-500">
              <RadioGroupItem value="true" id={`${issueType}-in-collection`} className="border-purple-500 text-purple-500" />
              <Label htmlFor={`${issueType}-in-collection`} className="text-sm text-white">In Collection</Label>
            </div>
            <div className="flex items-center space-x-2 bg-black px-4 py-2 rounded-md border border-purple-500">
              <RadioGroupItem value="false" id={`${issueType}-not-in-collection`} className="border-purple-500 text-purple-500" />
              <Label htmlFor={`${issueType}-not-in-collection`} className="text-sm text-white">Not in Collection</Label>
            </div>
          </RadioGroup>
        </div>
      </div>
    );
  };

  const renderIssueItem = (issueType: CreditIssueType, label: string) => {
    const isSelected = !!creditIssues[issueType];
    const isOpen = openIssues[issueType];
    
    return (
      <div className={cn(
        "mb-3 overflow-hidden rounded-lg border transition-all",
        "border-purple-600 bg-purple-600"
      )}>
        <Collapsible 
          open={isOpen && isSelected} 
          onOpenChange={() => isSelected && toggleIssue(issueType)}
        >
          <div className="flex items-center p-4">
            <div className="flex items-center space-x-3 flex-1">
              <Checkbox
                id={`${issueType}-check`} 
                checked={isSelected}
                onCheckedChange={(checked) => 
                  handleIssueToggle(issueType, checked === true)
                }
                className="h-5 w-5 bg-[#121826] border-purple-600 data-[state=checked]:bg-purple-600 data-[state=checked]:text-white"
              />
              <Label 
                htmlFor={`${issueType}-check`} 
                className="font-medium text-base cursor-pointer text-white"
              >
                {label}
              </Label>
            </div>
            {isSelected && (
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1 h-auto text-[#121826]">
                  {isOpen ? 
                    <ChevronUp className="h-5 w-5" /> : 
                    <ChevronDown className="h-5 w-5" />
                  }
                </Button>
              </CollapsibleTrigger>
            )}
          </div>
          
          {isSelected && (
            <CollapsibleContent>
              {renderIssueDetails(issueType)}
            </CollapsibleContent>
          )}
        </Collapsible>
      </div>
    );
  };

  return (
    <QuestionContainer
      title={t('q.creditIssues.title')}
      questionText={t('q.creditIssues.question')}
      questionId="creditissues"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-6">
        <div className="grid gap-3 sm:grid-cols-2">
          <Button
            variant={value === true ? 'default' : 'outline'}
            onClick={() => onChange(true)}
            className={value === true ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'border-purple-600 text-white bg-transparent hover:bg-purple-600/20'}
          >
            {t('q.creditIssues.yes')}
          </Button>
          <Button
            variant={value === false ? 'default' : 'outline'}
            onClick={() => onChange(false)}
            className={value === false ? 'bg-purple-600 hover:bg-purple-700 text-white' : 'border-purple-600 text-white bg-transparent hover:bg-purple-600/20'}
          >
            {t('q.creditIssues.no')}
          </Button>
        </div>
        
        {value === true && (
          <div className="mt-6">
            <p className="text-sm text-gray-300 mb-4">
              {t('q.creditIssues.selectAll')}
            </p>
            
            <div className="max-h-[500px] overflow-y-auto pr-1 space-y-1 rounded-md">
              {renderIssueItem('bankruptcy', 'Bankruptcy')}
              {renderIssueItem('foreclosure', 'Foreclosure')}
              {renderIssueItem('collections', 'Collections')}
              {renderIssueItem('medical', 'Medical')}
              {renderIssueItem('other', 'Other')}
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-8 flex justify-between">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className="gap-1 border-purple-600 text-white bg-transparent hover:bg-purple-600/20"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('form.previous')}
        </Button>
        <Button 
          onClick={onNext} 
          disabled={value === null || (value === true && !isAnyIssueComplete())}
          className="gap-1 bg-purple-600 hover:bg-purple-700 text-white"
        >
          {t('form.next')}
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default CreditIssuesQuestion;
