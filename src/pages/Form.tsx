
import React from 'react';
import { ErrorBoundary } from "@/components/ErrorBoundary";
import FormContainer from "@/components/form/FormContainer";
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Card } from '@/components/ui/card';
import { useLanguage } from "@/contexts/LanguageContext";

// Use React.memo to prevent unnecessary re-renders
const Form: React.FC = React.memo(() => {
  const { t } = useLanguage();
  
  const handleError = (error: Error) => {
    console.error("Form error:", error);
    toast.error(t('form.errorOccurred') || "An error occurred with the form. Please try again.");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gallomodern-50">{t('form.title') || 'Loan Prequalification Form'}</h1>
      <p className="text-muted-foreground mb-8">{t('form.subtitle') || 'Fill out the form below to prequalify'}</p>

      <Card className="overflow-hidden border-gallomodern-200/30">
        <ErrorBoundary 
          fallback={<div className="p-8 text-center">
            <h3 className="text-xl font-bold">{t('form.errorTitle') || 'Something went wrong with the form'}</h3>
            <p className="mt-2 text-muted-foreground">{t('form.errorMessage') || 'Please try refreshing the page.'}</p>
          </div>}
          onError={handleError}
        >
          <React.Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
            <FormContainer />
          </React.Suspense>
        </ErrorBoundary>
      </Card>
    </div>
  );
});

Form.displayName = "Form";
export default Form;
