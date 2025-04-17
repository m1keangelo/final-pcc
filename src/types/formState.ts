
export type FormState = {
  timeline: 'immediately' | '3months' | '3to6months' | '6to12months' | 'exploring' | null;
  firstTimeBuyer: boolean | null;
  employmentType: 'W-2' | '1099' | 'retired' | 'unemployed' | 'other' | null;
  otherEmploymentDetails?: string;
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
  creditIssues: {
    bankruptcy?: boolean;
    foreclosure?: boolean;
    collections?: boolean;
    medical?: boolean;
    other?: boolean;
    
    bankruptcyDetails?: {
      amount: number | null;
      timeframe: string | null;
      inCollection: boolean | null;
    };
    foreclosureDetails?: {
      amount: number | null;
      timeframe: string | null;
      inCollection: boolean | null;
    };
    collectionsDetails?: {
      amount: number | null;
      timeframe: string | null;
      inCollection: boolean | null;
    };
    medicalDetails?: {
      amount: number | null;
      timeframe: string | null;
      inCollection: boolean | null;
    };
    otherDetails?: {
      amount: number | null;
      timeframe: string | null;
      inCollection: boolean | null;
    };
    [key: string]: boolean | { amount: number | null; timeframe: string | null; inCollection: boolean | null; } | undefined;
  };
  idType: 'SSN' | 'ITIN' | 'none' | null;
  name: string;
  phone: string;
  email: string;
  comments: string;
  campaign?: string;
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
