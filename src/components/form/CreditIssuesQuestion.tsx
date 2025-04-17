
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Define the issue types for better type safety
const issueTypes = [
  { id: "bankruptcy", label: "Bankruptcy" },
  { id: "foreclosure", label: "Foreclosure" },
  { id: "collections", label: "Collections" },
  { id: "medical", label: "Medical" },
  { id: "other", label: "Other" }
] as const;

type IssueId = (typeof issueTypes)[number]['id'];
type IssueFlags = Partial<Record<IssueId, boolean>>;

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
  const { t, language } = useLanguage();
  
  // Initialize selected issues from creditIssues
  const [selectedIssues, setSelectedIssues] = useState<IssueFlags>(() => {
    const issueFlags: IssueFlags = {};
    
    // Only extract boolean values for our known issue types
    issueTypes.forEach(({ id }) => {
      const value = creditIssues[id as keyof typeof creditIssues];
      if (typeof value === 'boolean') {
        issueFlags[id as IssueId] = value;
      }
    });
    
    return issueFlags;
  });
  
  useEffect(() => {
    // Update parent form state while preserving details
    const newCreditIssues = { ...creditIssues };
    
    // Update boolean flags
    Object.entries(selectedIssues).forEach(([key, value]) => {
      if (value !== undefined) {
        newCreditIssues[key] = value;
      }
    });
    
    onCreditIssuesChange(newCreditIssues);
  }, [selectedIssues, onCreditIssuesChange, creditIssues]);
  
  const handleIssueToggle = (issueId: IssueId, checked: boolean) => {
    setSelectedIssues(prev => ({
      ...prev,
      [issueId]: checked
    }));
  };
  
  const getFeedbackMessage = (type: string) => {
    if (language === 'es') {
      switch(type) {
        case 'bankruptcy':
          return "Ya pasó. FHA, VA y otros bancos aceptan después de 2 o 3 años. Usamos tu recuperación como un punto a favor.";
        case 'foreclosure':
          return "Pasa. Tú no eres tu pasado. Muchos han vuelto a comprar después de 3 años. Veamos lo que ha mejorado desde entonces.";
        case 'collections':
          return "Nos encargamos de eso. Las deudas médicas casi no cuentan y otras se pueden negociar. Tenemos formas de ayudarte.";
        case 'medical':
          return "Las reglas nuevas te ayudan — la mayoría de deudas médicas menores a $500 ni se toman en cuenta. Podemos revisar y limpiarlo.";
        case 'other':
          return "Cuéntanos lo que pasó — sin juicios. Todo tiene solución. Buscamos ideas legales y creativas para ayudarte.";
        default:
          return "";
      }
    } else {
      switch(type) {
        case 'bankruptcy':
          return "You're past it. FHA, VA, and even some conventional lenders are open after 2–3 years. Let's use your bounce back to your advantage.";
        case 'foreclosure':
          return "It happens. You're not your past. We've helped buyers get approved again after 3 years. Let's focus on what's changed.";
        case 'collections':
          return "We'll tackle them — medical debts are often ignored now, and others can be settled or removed. We've got scripts and pros.";
        case 'medical':
          return "New rules protect you — most medical collections under $500 don't even count. Let's verify and clean it up fast.";
        case 'other':
          return "Share what happened — no judgment. Everything has a fix. We'll get creative, legal, and aggressive where needed.";
        default:
          return "";
      }
    }
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
          <div className="mt-6">
            <p className="text-base mb-4">
              {t('q.creditIssues.followUp')}
            </p>
            <div className="grid gap-3">
              {issueTypes.map((issue) => {
                const isSelected = selectedIssues[issue.id as IssueId] || false;
                return (
                  <div key={issue.id}>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`issue-${issue.id}`} 
                        checked={isSelected}
                        onCheckedChange={(checked) => 
                          handleIssueToggle(issue.id as IssueId, checked === true)
                        }
                      />
                      <Label htmlFor={`issue-${issue.id}`}>{issue.label}</Label>
                    </div>
                    
                    {isSelected && (
                      <div className="mt-2 ml-6 p-3 border border-[#fef9be] rounded-md bg-black text-[#fef9be]">
                        <p className="text-sm">{getFeedbackMessage(issue.id)}</p>
                      </div>
                    )}
                  </div>
                );
              })}
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
        <Button onClick={onNext} disabled={value === null}>
          {t('form.next')}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </QuestionContainer>
  );
};

export default CreditIssuesQuestion;
