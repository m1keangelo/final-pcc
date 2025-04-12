export type FormState = {
  timeline: 'immediately' | '3months' | '3to6months' | '6to12months' | 'exploring' | null;
  firstTimeBuyer: boolean | null;
  employmentType: 'W-2' | '1099' | 'retired' | 'unemployed' | 'other' | null;
  selfEmployedYears: number | null;
  incomeType: 'annual' | 'monthly';
  income: number | null;
  creditCategory: 'excellent' | 'good' | 'fair' | 'poor' | 'unknown' | null;
  creditScore: number | null;
  downPaymentSaved: boolean | null;
  downPaymentAmount: number | null;
  assistanceOpen: boolean | null;
  monthlyDebts: string;
  hasCreditIssues: boolean | null;
  creditIssueType: 'bankruptcy' | 'foreclosure' | 'collections' | 'other' | null;
  creditIssueYear: number | null;
  creditIssueAmount: number | null;
  idType: 'SSN' | 'ITIN' | 'none' | null;
  name: string;
  phone: string;
  email: string;
  comments: string;
};

export type FormStep = 
  | 'timeline'
  | 'firstTimeBuyer'
  | 'employment' 
  | 'selfEmployedYears'
  | 'income' 
  | 'credit' 
  | 'creditScore'
  | 'downPayment'
  | 'downPaymentAmount'
  | 'downPaymentAssistance'
  | 'monthlyDebts'
  | 'creditIssues'
  | 'creditIssueDetails'
  | 'idType'
  | 'contactInfo'
  | 'summary';

export const isQualified = (state: FormState): boolean => {
  if (state.idType === 'none') {
    return false;
  }
  
  if (state.employmentType === 'unemployed' && !state.income) {
    return false;
  }
  
  if (state.creditCategory === 'poor' && !state.downPaymentSaved) {
    return false;
  }
  
  if (
    (state.creditIssueType === 'bankruptcy' || state.creditIssueType === 'foreclosure') && 
    state.creditIssueYear && 
    (new Date().getFullYear() - state.creditIssueYear < 2)
  ) {
    return false;
  }
  
  return true;
};

export const getQualificationCategory = (state: FormState): 'ready' | 'fixesNeeded' | 'notReady' => {
  if (!isQualified(state)) {
    return 'notReady';
  }
  
  if (
    (state.creditCategory === 'poor' || state.creditCategory === 'fair') || 
    (state.employmentType === '1099' && state.selfEmployedYears && state.selfEmployedYears < 2) ||
    (state.hasCreditIssues && state.creditIssueType === 'collections' && (state.creditIssueAmount || 0) > 500)
  ) {
    return 'fixesNeeded';
  }
  
  return 'ready';
};
