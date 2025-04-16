
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import FormContainer from "@/components/form/FormContainer";
import { Skeleton } from '@/components/ui/skeleton';

const Form: React.FC = () => {
  return (
    <ErrorBoundary fallback={<div>Something went wrong with the form</div>}>
      <Suspense fallback={<Skeleton className="w-full h-[500px]" />}>
        <FormContainer />
      </Suspense>
    </ErrorBoundary>
  );
};

export default Form;

