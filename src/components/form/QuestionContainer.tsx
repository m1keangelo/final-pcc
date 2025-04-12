
import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import QuestionHelp from "@/components/QuestionHelp";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuestionContainerProps {
  children: ReactNode;
  title: string;
  questionText: string;
  questionId: string;
  currentStep: number;
  totalSteps: number;
}

const QuestionContainer = ({
  children,
  title,
  questionText,
  questionId,
  currentStep,
  totalSteps
}: QuestionContainerProps) => {
  const { language } = useLanguage();
  
  return (
    <Card className="w-full max-w-[1200px] mx-auto animate-fade-in shadow-lg">
      <CardHeader className="border-b border-border">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            {currentStep}/{totalSteps}
          </span>
        </div>
        
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-muted-foreground mt-1">{questionText}</p>
          </div>
          <QuestionHelp questionId={questionId} />
        </div>
      </CardHeader>
      <CardContent className="py-6">
        {children}
      </CardContent>
    </Card>
  );
};

export default QuestionContainer;
