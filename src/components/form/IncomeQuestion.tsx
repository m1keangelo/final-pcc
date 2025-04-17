
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import QuestionContainer from "@/components/form/QuestionContainer";
import { FormState } from "@/types/form";
import { useLanguage } from "@/contexts/LanguageContext";
import { ArrowLeft, ArrowRight } from "lucide-react";

const IncomeQuestion = ({
  value,
  incomeType,
  onChange,
  onChangeIncomeType,
  onNext,
  onBack,
  currentStep,
  totalSteps
}: {
  value: FormState['income'];
  incomeType: FormState['incomeType'];
  onChange: (value: string) => void;
  onChangeIncomeType: (value: 'annual' | 'monthly') => void;
  onNext: () => void;
  onBack: () => void;
  currentStep: number;
  totalSteps: number;
}) => {
  const { t, language } = useLanguage();
  const [inputValue, setInputValue] = useState(value?.toString() || "");

  const getFeedbackMessage = () => {
    if (language === 'es') {
      // Any income
      if (inputValue) {
        return "No importa cuánto ganas hoy, lo que vale es lo que podemos construir. Muchos que empezaron con poco lograron comprar. Buscamos programas que se ajusten a ti — y a donde vas.";
      }
      return "";
    } else {
      // Any income
      if (inputValue) {
        return "Doesn't matter where you start — it's about what we build with it. Some of the strongest approvals came from humble beginnings. We'll tailor programs to match where you're at — and where you're headed.";
      }
      return "";
    }
  };

  const getIncomeTypeFeedbackMessage = () => {
    if (language === 'es') {
      if (incomeType === 'annual') {
        return "Entendido. Lo convertimos a mensual, lo comparamos con tus deudas y lo optimizamos. Es un buen comienzo.";
      } else { // monthly
        return "Perfecto. Estás pensando como los bancos piensan. Vamos a ver con ese ingreso cuánto puedes calificar hoy.";
      }
    } else {
      if (incomeType === 'annual') {
        return "Got it — we'll convert it to monthly, match to your DTI, and optimize from there. Solid start.";
      } else { // monthly
        return "Perfect — you're already thinking how lenders think. Let's plug it in and check what you qualify for today.";
      }
    }
  };

  return (
    <QuestionContainer
      title={t('q.income.title')}
      questionText={t('q.income.question')}
      questionId="income"
      currentStep={currentStep}
      totalSteps={totalSteps}
    >
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <div className="w-1/2">
            <label htmlFor="income" className="block text-sm font-medium leading-6 text-white">{t('q.income.amountLabel')}</label>
            <div className="relative mt-2 rounded-md shadow-sm">
              <Input
                type="number"
                name="income"
                id="income"
                className="text-black"
                placeholder={t('q.income.placeholder')}
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  onChange(e.target.value);
                }}
              />
            </div>
          </div>

          <div className="w-1/2">
            <Select onValueChange={onChangeIncomeType} defaultValue={incomeType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={t('q.income.typeLabel')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="annual">{t('q.income.annual')}</SelectItem>
                <SelectItem value="monthly">{t('q.income.monthly')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {inputValue && (
          <div className="mt-4 p-4 border border-[#fef9be] rounded-md bg-black text-[#fef9be]">
            <p className="font-medium">{getFeedbackMessage()}</p>
          </div>
        )}

        {incomeType && (
          <div className="mt-4 p-4 border border-[#fef9be] rounded-md bg-black text-[#fef9be]">
            <p className="font-medium">{getIncomeTypeFeedbackMessage()}</p>
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
          <Button onClick={onNext}>
            {t('form.next')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </QuestionContainer>
  );
};

export default IncomeQuestion;
