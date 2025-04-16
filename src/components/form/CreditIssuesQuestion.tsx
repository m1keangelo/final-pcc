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
      updatedIssues[detailsKey] = {
        amount: null,
        timeframe: null,
        inCollection: null
      };
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
      updatedIssues[detailsKey] = {
        ...currentDetails,
        [field]: value
      };
    } else {
      updatedIssues[detailsKey] = {
        amount: null,
        timeframe: null,
        inCollection: null,
        [field]: value
      };
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
      <div className="pl-6 py-3 space-y-4 border-l-2 border-muted-foreground/20">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor={`${issueType}-amount`}>Estimated Amount</Label>
            <Input
              id={`${issueType}-amount`}
              type="number"
              placeholder="$ Amount"
              value={details.amount || ''}
              onChange={e => handleIssueDetailChange(
                issueType, 
                'amount', 
                e.target.value ? Number(e.target.value) : null
              )}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${issueType}-timeframe`}>How long ago?</Label>
            <Select
              value={details.timeframe || ''}
              onValueChange={value => handleIssueDetailChange(issueType, 'timeframe', value)}
            >
              <SelectTrigger id={`${issueType}-timeframe`}>
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
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
          <Label>Collection Status</Label>
          <RadioGroup
            value={details.inCollection !== null ? details.inCollection.toString() : ''}
            onValueChange={value => handleIssueDetailChange(
              issueType, 
              'inCollection', 
              value === 'true'
            )}
            className="flex flex-row space-x-4 pt-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id={`${issueType}-in-collection`} />
              <Label htmlFor={`${issueType}-in-collection`}>In Collection</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="false" id={`${issueType}-not-in-collection`} />
              <Label htmlFor={`${issueType}-not-in-collection`}>Not in Collection</Label>
            </div>
          </RadioGroup>
        </div>
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
      <div className="grid gap-4">
        <Button
          variant={value === true ? 'default' : 'outline'}
          onClick={() => onChange(true)}
        >
          {t('q.creditIssues.yes')}
        </Button>
        <Button
          variant={value === false ? 'default' : 'outline'}
          onClick={() => onChange(false)}
        >
          {t('q.creditIssues.no')}
        </Button>
      </div>
      
      {value === true && (
        <div className="mt-6 space-y-4">
          <p className="text-sm text-muted-foreground mb-2">
            {t('q.creditIssues.selectAll')}
          </p>
          
          <div className="border rounded-lg overflow-hidden">
            <Collapsible 
              open={openIssues.bankruptcy} 
              onOpenChange={() => toggleIssue('bankruptcy')}
            >
              <div className="flex items-center p-3 bg-muted/30">
                <div className="flex items-center space-x-2 flex-1">
                  <Checkbox
                    id="bankruptcy-check" 
                    checked={!!creditIssues.bankruptcy}
                    onCheckedChange={(checked) => 
                      handleIssueToggle('bankruptcy', checked === true)
                    }
                  />
                  <Label htmlFor="bankruptcy-check" className="font-medium">Bankruptcy</Label>
                </div>
                {creditIssues.bankruptcy && (
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {openIssues.bankruptcy ? 
                        <ChevronUp className="h-4 w-4" /> : 
                        <ChevronDown className="h-4 w-4" />
                      }
                    </Button>
                  </CollapsibleTrigger>
                )}
              </div>
              
              {creditIssues.bankruptcy && (
                <CollapsibleContent>
                  {renderIssueDetails('bankruptcy')}
                </CollapsibleContent>
              )}
            </Collapsible>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <Collapsible 
              open={openIssues.foreclosure} 
              onOpenChange={() => toggleIssue('foreclosure')}
            >
              <div className="flex items-center p-3 bg-muted/30">
                <div className="flex items-center space-x-2 flex-1">
                  <Checkbox
                    id="foreclosure-check" 
                    checked={!!creditIssues.foreclosure}
                    onCheckedChange={(checked) => 
                      handleIssueToggle('foreclosure', checked === true)
                    }
                  />
                  <Label htmlFor="foreclosure-check" className="font-medium">Foreclosure</Label>
                </div>
                {creditIssues.foreclosure && (
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {openIssues.foreclosure ? 
                        <ChevronUp className="h-4 w-4" /> : 
                        <ChevronDown className="h-4 w-4" />
                      }
                    </Button>
                  </CollapsibleTrigger>
                )}
              </div>
              
              {creditIssues.foreclosure && (
                <CollapsibleContent>
                  {renderIssueDetails('foreclosure')}
                </CollapsibleContent>
              )}
            </Collapsible>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <Collapsible 
              open={openIssues.collections} 
              onOpenChange={() => toggleIssue('collections')}
            >
              <div className="flex items-center p-3 bg-muted/30">
                <div className="flex items-center space-x-2 flex-1">
                  <Checkbox
                    id="collections-check" 
                    checked={!!creditIssues.collections}
                    onCheckedChange={(checked) => 
                      handleIssueToggle('collections', checked === true)
                    }
                  />
                  <Label htmlFor="collections-check" className="font-medium">Collections</Label>
                </div>
                {creditIssues.collections && (
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {openIssues.collections ? 
                        <ChevronUp className="h-4 w-4" /> : 
                        <ChevronDown className="h-4 w-4" />
                      }
                    </Button>
                  </CollapsibleTrigger>
                )}
              </div>
              
              {creditIssues.collections && (
                <CollapsibleContent>
                  {renderIssueDetails('collections')}
                </CollapsibleContent>
              )}
            </Collapsible>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <Collapsible 
              open={openIssues.medical} 
              onOpenChange={() => toggleIssue('medical')}
            >
              <div className="flex items-center p-3 bg-muted/30">
                <div className="flex items-center space-x-2 flex-1">
                  <Checkbox
                    id="medical-check" 
                    checked={!!creditIssues.medical}
                    onCheckedChange={(checked) => 
                      handleIssueToggle('medical', checked === true)
                    }
                  />
                  <Label htmlFor="medical-check" className="font-medium">Medical</Label>
                </div>
                {creditIssues.medical && (
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {openIssues.medical ? 
                        <ChevronUp className="h-4 w-4" /> : 
                        <ChevronDown className="h-4 w-4" />
                      }
                    </Button>
                  </CollapsibleTrigger>
                )}
              </div>
              
              {creditIssues.medical && (
                <CollapsibleContent>
                  {renderIssueDetails('medical')}
                </CollapsibleContent>
              )}
            </Collapsible>
          </div>
          
          <div className="border rounded-lg overflow-hidden">
            <Collapsible 
              open={openIssues.other} 
              onOpenChange={() => toggleIssue('other')}
            >
              <div className="flex items-center p-3 bg-muted/30">
                <div className="flex items-center space-x-2 flex-1">
                  <Checkbox
                    id="other-check" 
                    checked={!!creditIssues.other}
                    onCheckedChange={(checked) => 
                      handleIssueToggle('other', checked === true)
                    }
                  />
                  <Label htmlFor="other-check" className="font-medium">Other</Label>
                </div>
                {creditIssues.other && (
                  <CollapsibleTrigger asChild>
                    <Button variant="ghost" size="sm">
                      {openIssues.other ? 
                        <ChevronUp className="h-4 w-4" /> : 
                        <ChevronDown className="h-4 w-4" />
                      }
                    </Button>
                  </CollapsibleTrigger>
                )}
              </div>
              
              {creditIssues.other && (
                <CollapsibleContent>
                  {renderIssueDetails('other')}
                </CollapsibleContent>
              )}
            </Collapsible>
          </div>
        </div>
      )}
      
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
          disabled={value === null || (value === true && !isAnyIssueComplete())}
        >
          {t('form.next')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default CreditIssuesQuestion;
