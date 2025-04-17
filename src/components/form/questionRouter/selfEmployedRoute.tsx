
import { QuestionRouteConfig } from "@/types/questionRouter";
import { FormState } from "@/types/form";
import TimelineQuestion from "@/components/form/TimelineQuestion";
import IncomeQuestion from "@/components/form/IncomeQuestion";
import CreditIssuesQuestion from "@/components/form/CreditIssuesQuestion";
import DownPaymentQuestion from "@/components/form/DownPaymentQuestion";
import IdTypeQuestion from "@/components/form/IdTypeQuestion";

export const selfEmployedRoute: QuestionRouteConfig = {
  initial: 'idType',
  questions: {
    idType: {
      id: 'idType',
      component: (props) => (
        <IdTypeQuestion
          value={props.formData.idType}
          onChange={(newValue) => props.updateField('idType', newValue)}
          onNext={props.onNext}
          onBack={props.onBack}
          currentStep={props.currentStep}
          totalSteps={props.totalSteps}
        />
      ),
      nextQuestion: () => 'timeline',
      skipLogic: () => null,
    },
    timeline: {
      id: 'timeline',
      component: (props) => (
        <TimelineQuestion
          value={props.formData.timeline}
          onChange={(newValue) => props.updateField('timeline', newValue)}
          onNext={props.onNext}
          onBack={props.onBack}
          currentStep={props.currentStep}
          totalSteps={props.totalSteps}
        />
      ),
      nextQuestion: (formData: FormState) => {
        if (formData.timeline === 'immediately') {
          return 'income';
        } else {
          return 'income';
        }
      },
      skipLogic: () => null,
    },
    income: {
      id: 'income',
      component: (props) => (
        <IncomeQuestion
          value={props.formData.income}
          incomeType={props.formData.incomeType || 'annual'}
          onChange={(newValue) => props.updateField('income', newValue)}
          onChangeIncomeType={(value) => props.updateField('incomeType', value)}
          onNext={props.onNext}
          onBack={props.onBack}
          currentStep={props.currentStep}
          totalSteps={props.totalSteps}
        />
      ),
      nextQuestion: () => 'downPayment',
      skipLogic: () => null,
    },
    downPayment: {
      id: 'downPayment',
      component: (props) => (
        <DownPaymentQuestion
          value={props.formData.downPaymentSaved}
          onChange={(newValue) => props.updateField('downPaymentSaved', newValue)}
          onNext={props.onNext}
          onBack={props.onBack}
          currentStep={props.currentStep}
          totalSteps={props.totalSteps}
        />
      ),
      nextQuestion: () => 'creditIssues',
      skipLogic: () => null,
    },
    creditIssues: {
      id: 'creditIssues',
      component: (props) => (
        <CreditIssuesQuestion
          value={props.formData.hasCreditIssues}
          creditIssues={props.formData.creditIssues || {
            bankruptcy: false,
            foreclosure: false,
            collections: false,
            medical: false,
            other: false
          }}
          onChange={(newValue) => props.updateField('hasCreditIssues', newValue)}
          onCreditIssuesChange={(issues) => props.updateField('creditIssues', issues)}
          onNext={props.onNext}
          onBack={props.onBack}
          currentStep={props.currentStep}
          totalSteps={props.totalSteps}
        />
      ),
      nextQuestion: (formData: FormState) => {
        return null;
      },
      skipLogic: () => null,
    }
  },
};

export default selfEmployedRoute;
