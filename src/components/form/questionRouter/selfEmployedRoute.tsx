import { QuestionRouteConfig } from "@/types/questionRouter";
import { FormState } from "@/types/form";
import TimelineQuestion from "@/components/form/TimelineQuestion";
import IncomeQuestion from "@/components/form/IncomeQuestion";
import CreditIssuesQuestion from "@/components/form/CreditIssuesQuestion";
import PropertyTypeQuestion from "@/components/form/PropertyTypeQuestion";
import PropertyDetailsQuestion from "@/components/form/PropertyDetailsQuestion";
import DownPaymentQuestion from "@/components/form/DownPaymentQuestion";
import IdTypeQuestion from "@/components/form/IdTypeQuestion";
import ContactQuestion from "@/components/form/ContactQuestion";
import Summary from "@/components/form/Summary";
import Start from "@/components/form/Start";
import LoanPurposeQuestion from "@/components/form/LoanPurposeQuestion";
import BusinessDetailsQuestion from "@/components/form/BusinessDetailsQuestion";
import BusinessAgeQuestion from "@/components/form/BusinessAgeQuestion";
import IndustryQuestion from "@/components/form/IndustryQuestion";
import ExpensesQuestion from "@/components/form/ExpensesQuestion";

export const selfEmployedRoute: QuestionRouteConfig = {
  initial: 'start',
  questions: {
    start: {
      id: 'start',
      component: (props) => (
        <Start
          onNext={props.onNext}
          currentStep={props.currentStep}
          totalSteps={Number(props.totalSteps)}
        />
      ),
      nextQuestion: () => 'idType',
      skipLogic: () => null,
    },
    idType: {
      id: 'idType',
      component: (props) => (
        <IdTypeQuestion
          value={props.formData.idType}
          onChange={(newValue) => props.updateField('idType', newValue)}
          onNext={props.onNext}
          onBack={props.onBack}
          currentStep={props.currentStep}
          totalSteps={Number(props.totalSteps)}
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
          totalSteps={Number(props.totalSteps)}
        />
      ),
      nextQuestion: (formData: FormState) => {
        if (formData.timeline === 'immediately') {
          return 'loanPurpose';
        } else {
          return 'propertyType';
        }
      },
      skipLogic: () => null,
    },
    loanPurpose: {
      id: 'loanPurpose',
      component: (props) => (
        <LoanPurposeQuestion
          value={props.formData.loanPurpose}
          onChange={(newValue) => props.updateField('loanPurpose', newValue)}
          onNext={props.onNext}
          onBack={props.onBack}
          currentStep={props.currentStep}
          totalSteps={Number(props.totalSteps)}
        />
      ),
      nextQuestion: () => 'propertyType',
      skipLogic: () => null,
    },
    propertyType: {
      id: 'propertyType',
      component: (props) => (
        <PropertyTypeQuestion
          value={props.formData.propertyType}
          onChange={(newValue) => props.updateField('propertyType', newValue)}
          onNext={props.onNext}
          onBack={props.onBack}
          currentStep={props.currentStep}
          totalSteps={Number(props.totalSteps)}
        />
      ),
      nextQuestion: (formData: FormState) => {
        if (formData.propertyType === 'other') {
          return 'propertyDetails';
        } else {
          return 'downPayment';
        }
      },
      skipLogic: () => null,
    },
    propertyDetails: {
      id: 'propertyDetails',
      component: (props) => (
        <PropertyDetailsQuestion
          value={props.formData.propertyDetails}
          onChange={(newValue) => props.updateField('propertyDetails', newValue)}
          onNext={props.onNext}
          onBack={props.onBack}
          currentStep={props.currentStep}
          totalSteps={Number(props.totalSteps)}
        />
      ),
      nextQuestion: () => 'downPayment',
      skipLogic: () => null,
    },
    downPayment: {
      id: 'downPayment',
      component: (props) => (
        <DownPaymentQuestion
          value={props.formData.downPayment}
          onChange={(newValue) => props.updateField('downPayment', newValue)}
          onNext={props.onNext}
          onBack={props.onBack}
          currentStep={props.currentStep}
          totalSteps={Number(props.totalSteps)}
        />
      ),
      nextQuestion: () => 'businessDetails',
      skipLogic: () => null,
    },
    businessDetails: {
      id: 'businessDetails',
      component: (props) => (
        <BusinessDetailsQuestion
          value={props.formData.businessDetails}
          onChange={(newValue) => props.updateField('businessDetails', newValue)}
          onNext={props.onNext}
          onBack={props.onBack}
          currentStep={props.currentStep}
          totalSteps={Number(props.totalSteps)}
        />
      ),
      nextQuestion: () => 'businessAge',
      skipLogic: () => null,
    },
    businessAge: {
      id: 'businessAge',
      component: (props) => (
        <BusinessAgeQuestion
          value={props.formData.businessAge}
          onChange={(newValue) => props.updateField('businessAge', newValue)}
          onNext={props.onNext}
          onBack={props.onBack}
          currentStep={props.currentStep}
          totalSteps={Number(props.totalSteps)}
        />
      ),
      nextQuestion: () => 'industry',
      skipLogic: () => null,
    },
    industry: {
      id: 'industry',
      component: (props) => (
        <IndustryQuestion
          value={props.formData.industry}
          onChange={(newValue) => props.updateField('industry', newValue)}
          onNext={props.onNext}
          onBack={props.onBack}
          currentStep={props.currentStep}
          totalSteps={Number(props.totalSteps)}
        />
      ),
      nextQuestion: () => 'income',
      skipLogic: () => null,
    },
    income: {
      id: 'income',
      component: (props) => (
        <IncomeQuestion
          value={props.formData.income}
          onChange={(newValue) => props.updateField('income', newValue)}
          onNext={props.onNext}
          onBack={props.onBack}
          currentStep={props.currentStep}
          totalSteps={Number(props.totalSteps)}
        />
      ),
      nextQuestion: () => 'expenses',
      skipLogic: () => null,
    },
    expenses: {
      id: 'expenses',
      component: (props) => (
        <ExpensesQuestion
          value={props.formData.expenses}
          onChange={(newValue) => props.updateField('expenses', newValue)}
          onNext={props.onNext}
          onBack={props.onBack}
          currentStep={props.currentStep}
          totalSteps={Number(props.totalSteps)}
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
          totalSteps={Number(props.totalSteps)}
        />
      ),
      nextQuestion: (formData: FormState) => {
        if (formData.hasCreditIssues === 'yes') {
          return 'contact';
        } else {
          return 'contact';
        }
      },
      skipLogic: () => null,
    },
    contact: {
      id: 'contact',
      component: (props) => (
        <ContactQuestion
          value={props.formData.contact}
          onChange={(newValue) => props.updateField('contact', newValue)}
          onNext={props.onNext}
          onBack={props.onBack}
          currentStep={props.currentStep}
          totalSteps={Number(props.totalSteps)}
        />
      ),
      nextQuestion: () => 'summary',
      skipLogic: () => null,
    },
    summary: {
      id: 'summary',
      component: (props) => (
        <Summary
          formData={props.formData}
          onBack={props.onBack}
          currentStep={props.currentStep}
          totalSteps={Number(props.totalSteps)}
        />
      ),
      nextQuestion: () => null,
      skipLogic: () => null,
    },
  },
};

export default selfEmployedRoute;
