
import { FormState } from "@/types/form";
import { ReactElement } from "react";
import { QuestionComponentProps } from "@/components/form/questionRouter/types";

export interface QuestionRouteConfig {
  initial: string;
  questions: {
    [key: string]: {
      id: string;
      component: (props: any) => ReactElement;
      nextQuestion: (formData: FormState) => string | null;
      skipLogic: (formData: FormState) => boolean | null;
    };
  };
}
