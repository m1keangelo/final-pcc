
import React, { Suspense } from 'react';
import { ErrorBoundary } from "@/components/ErrorBoundary";
import FormContainer from "@/components/form/FormContainer";
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/lib/toast';

const Form: React.FC = () => {
  const handleError = (error: Error) => {
    console.error("Form error:", error);
    toast.error("An error occurred with the form. Please try again.");
  };

  return (
    <ErrorBoundary 
      fallback={<div className="p-8 text-center">
        <h3 className="text-xl font-bold">Something went wrong with the form</h3>
        <p className="mt-2 text-muted-foreground">Please try refreshing the page.</p>
      </div>}
      onError={handleError}
    >
      <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
        <FormContainer />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Form;
