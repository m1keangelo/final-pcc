
import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import QuestionHelp from "@/components/QuestionHelp";

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
  return (
    <Card className="w-full max-w-[900px] mx-auto animate-fade-in shadow-lg border-t-4 border-t-purple-500">
      <CardHeader className="border-b border-border">
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-muted-foreground bg-muted/30 px-3 py-1 rounded-full">
            {currentStep}/{totalSteps}
          </span>
          <div className="w-full max-w-[200px] bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 ml-4 mr-0">
            <div 
              className="bg-purple-600 h-1.5 rounded-full" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-foreground mb-1">{title}</h3>
            <p className="text-muted-foreground">{questionText}</p>
          </div>
          <QuestionHelp questionId={questionId} />
        </div>
      </CardHeader>
      <CardContent className="py-6 px-6">
        {children}
      </CardContent>
    </Card>
  );
};

export default QuestionContainer;
