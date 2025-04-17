
import { QuestionRouteConfig } from "@/types/questionRouter";
import IdTypeQuestion from "@/components/form/IdTypeQuestion";
import TimelineQuestion from "@/components/form/TimelineQuestion";
import CreditScoreQuestion from "@/components/form/CreditScoreQuestion";
import CreditIssuesQuestion from "@/components/form/CreditIssuesQuestion";
import IncomeQuestion from "@/components/form/IncomeQuestion";
import DownPaymentQuestion from "@/components/form/DownPaymentQuestion";

export const regularRoute: QuestionRouteConfig = {
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
      nextQuestion: (formData) => {
        return 'timeline';
      },
      skipLogic: (formData) => false,
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
      nextQuestion: () => 'creditScore',
      skipLogic: (formData) => false,
    },
    
    creditScore: {
      id: 'creditScore',
      component: (props) => (
        <CreditScoreQuestion
          value={props.formData.creditScore}
          onChange={(newValue) => props.updateField('creditScore', newValue)}
          onNext={props.onNext}
          onBack={props.onBack}
          currentStep={props.currentStep}
          totalSteps={props.totalSteps}
        />
      ),
      nextQuestion: () => 'creditIssues',
      skipLogic: (formData) => false,
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
      nextQuestion: () => 'income',
      skipLogic: (formData) => false,
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
      skipLogic: (formData) => false,
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
      nextQuestion: () => null,
      skipLogic: (formData) => false,
    }
  }
};

export default regularRoute;
