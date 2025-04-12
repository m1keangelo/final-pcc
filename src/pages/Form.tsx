import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { FormQuestions } from "@/components/form/FormQuestions";
import { SummaryOutcome } from "@/components/form/SummaryOutcome";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const Form = () => {
  const { t } = useLanguage();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formStage, setFormStage] = useState<'questions' | 'summary'>('questions');

  return (
    <div className="space-y-8 animate-fade-in max-w-[1200px] mx-auto px-4 md:px-6">
      <div>
        <h1 className="text-4xl font-bold mb-2">{t('form.title')}</h1>
        <p className="text-xl text-muted-foreground">
          {t('form.subtitle')}
        </p>
      </div>

      <Card className="w-full">
        {formStage === 'questions' ? (
          <FormQuestions onComplete={() => setFormStage('summary')} />
        ) : (
          <SummaryOutcome onRestart={() => setFormStage('questions')} />
        )}
      </Card>
    </div>
  );
};

export default Form;
