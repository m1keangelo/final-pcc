import { QuestionRouteConfig } from "@/types/questionRouter";
import { IdTypeQuestion } from "@/components/form/IdTypeQuestion";
import { TimelineQuestion } from "@/components/form/TimelineQuestion";
import { EmailQuestion } from "@/components/form/EmailQuestion";
import { NameQuestion } from "@/components/form/NameQuestion";
import { PhoneQuestion } from "@/components/form/PhoneQuestion";
import { ZipCodeQuestion } from "@/components/form/ZipCodeQuestion";
import { AddressQuestion } from "@/components/form/AddressQuestion";
import { IncomeQuestion } from "@/components/form/IncomeQuestion";
import { RentOrOwnQuestion } from "@/components/form/RentOrOwnQuestion";
import { RentQuestion } from "@/components/form/RentQuestion";
import { CreditScoreQuestion } from "@/components/form/CreditScoreQuestion";
import { CreditIssuesQuestion } from "@/components/form/CreditIssuesQuestion";
import { Submit } from "@/components/form/Submit";

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
          totalSteps={Number(props.totalSteps)}
        />
      ),
      nextQuestion: (formData) => {
        if (formData.idType === 'none') {
          return 'timeline';
        }
        return 'timeline';
      },
      skipLogic: (formData) => false,
    },
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
    nextQuestion: () => 'email',
    skipLogic: (formData) => false,
  },

  email: {
    id: 'email',
    component: (props) => (
      <EmailQuestion
        value={props.formData.email}
        onChange={(newValue) => props.updateField('email', newValue)}
        onNext={props.onNext}
        onBack={props.onBack}
        currentStep={props.currentStep}
        totalSteps={Number(props.totalSteps)}
      />
    ),
    nextQuestion: () => 'name',
    skipLogic: (formData) => false,
  },

  name: {
    id: 'name',
    component: (props) => (
      <NameQuestion
        firstName={props.formData.firstName}
        lastName={props.formData.lastName}
        onChange={(firstName, lastName) => {
          props.updateField('firstName', firstName);
          props.updateField('lastName', lastName);
        }}
        onNext={props.onNext}
        onBack={props.onBack}
        currentStep={props.currentStep}
        totalSteps={Number(props.totalSteps)}
      />
    ),
    nextQuestion: () => 'phone',
    skipLogic: (formData) => false,
  },

  phone: {
    id: 'phone',
    component: (props) => (
      <PhoneQuestion
        value={props.formData.phone}
        onChange={(newValue) => props.updateField('phone', newValue)}
        onNext={props.onNext}
        onBack={props.onBack}
        currentStep={props.currentStep}
        totalSteps={Number(props.totalSteps)}
      />
    ),
    nextQuestion: () => 'zipCode',
    skipLogic: (formData) => false,
  },

  zipCode: {
    id: 'zipCode',
    component: (props) => (
      <ZipCodeQuestion
        value={props.formData.zipCode}
        onChange={(newValue) => props.updateField('zipCode', newValue)}
        onNext={props.onNext}
        onBack={props.onBack}
        currentStep={props.currentStep}
        totalSteps={Number(props.totalSteps)}
      />
    ),
    nextQuestion: () => 'address',
    skipLogic: (formData) => false,
  },

  address: {
    id: 'address',
    component: (props) => (
      <AddressQuestion
        value={props.formData.address}
        onChange={(newValue) => props.updateField('address', newValue)}
        onNext={props.onNext}
        onBack={props.onBack}
        currentStep={props.currentStep}
        totalSteps={Number(props.totalSteps)}
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
        onChange={(newValue) => props.updateField('income', newValue)}
        onNext={props.onNext}
        onBack={props.onBack}
        currentStep={props.currentStep}
        totalSteps={Number(props.totalSteps)}
      />
    ),
    nextQuestion: () => 'rentOrOwn',
    skipLogic: (formData) => false,
  },

  rentOrOwn: {
    id: 'rentOrOwn',
    component: (props) => (
      <RentOrOwnQuestion
        value={props.formData.rentOrOwn}
        onChange={(newValue) => props.updateField('rentOrOwn', newValue)}
        onNext={props.onNext}
        onBack={props.onBack}
        currentStep={props.currentStep}
        totalSteps={Number(props.totalSteps)}
      />
    ),
    nextQuestion: (formData) => formData.rentOrOwn === 'rent' ? 'rent' : 'creditScore',
    skipLogic: (formData) => false,
  },

  rent: {
    id: 'rent',
    component: (props) => (
      <RentQuestion
        value={props.formData.rent}
        onChange={(newValue) => props.updateField('rent', newValue)}
        onNext={props.onNext}
        onBack={props.onBack}
        currentStep={props.currentStep}
        totalSteps={Number(props.totalSteps)}
      />
    ),
    nextQuestion: () => 'creditScore',
    skipLogic: (formData) => formData.rentOrOwn !== 'rent',
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
        totalSteps={Number(props.totalSteps)}
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
        totalSteps={Number(props.totalSteps)}
      />
    ),
    nextQuestion: () => 'submit',
    skipLogic: (formData) => false,
  },
  
  submit: {
    id: 'submit',
    component: (props) => (
      <Submit
        formData={props.formData}
        onBack={props.onBack}
        currentStep={props.currentStep}
        totalSteps={Number(props.totalSteps)}
      />
    ),
    nextQuestion: () => null,
    skipLogic: (formData) => false,
  },
};

export default regularRoute;
