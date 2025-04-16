
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
    <Card className="w-full max-w-[900px] mx-auto animate-fade-in shadow-lg border-t-4 border-t-purple-500 bg-black text-white">
      <CardHeader className="border-b border-purple-800/30">
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-medium text-white/70 bg-purple-900/30 px-3 py-1 rounded-full">
            {currentStep}/{totalSteps}
          </span>
          <div className="w-full max-w-[200px] bg-gray-800 rounded-full h-1.5 ml-4 mr-0">
            <div 
              className="bg-purple-600 h-1.5 rounded-full" 
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
            <p className="text-gray-300">{questionText}</p>
          </div>
          <QuestionHelp questionId={questionId} />
        </div>
      </CardHeader>
      <CardContent className="py-6 px-6 bg-black">
        {children}
      </CardContent>
    </Card>
  );
};

export default QuestionContainer;
