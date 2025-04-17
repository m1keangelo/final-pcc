import React, { Suspense } from 'react';
import { ErrorBoundary } from "@/components/ErrorBoundary";
import FormContainer from "@/components/form/FormContainer";
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/lib/toast';

type ErrorBoundaryProps = {
  children: React.ReactNode;
  fallback: React.ReactNode;
  onError?: (error: Error) => void;
};

const Form: React.FC = () => {
  const handleError = (error: Error) => {
    console.error("Form error:", error);
    toast.error("An error occurred with the form. Please try again.");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2 text-gallomodern-50">Loan Prequalification Form</h1>
      <p className="text-muted-foreground mb-8">Fill out the form below to prequalify</p>

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
    </div>
  );
};

export default Form;
