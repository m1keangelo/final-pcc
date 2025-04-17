
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
    <Card className="w-full max-w-[900px] mx-auto animate-fade-in shadow-lg bg-gradient-to-b from-card/90 to-card border-t-4 border-t-gallomodern-400 border-white/5 backdrop-blur-md">
      <CardHeader className="border-b border-gallomodern-900/20">
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-white/80 bg-gallomodern-500/20 px-3 py-1 rounded-full backdrop-blur-sm border border-gallomodern-400/20 shadow-sm">
            {currentStep}/{totalSteps}
          </span>
          <div className="w-full max-w-[200px] bg-muted/50 rounded-full h-2 ml-4 mr-0 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-gallomodern-300 to-gallomodern-500 h-2 rounded-full transition-all duration-500 animate-pulse-subtle" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold mb-1 text-gradient">{title}</h3>
            <p className="text-gray-300">{questionText}</p>
          </div>
          <QuestionHelp questionId={questionId} />
        </div>
      </CardHeader>
      <CardContent className="py-6 px-6 backdrop-blur-sm">
        {children}
      </CardContent>
    </Card>
  );
};

export default QuestionContainer;
