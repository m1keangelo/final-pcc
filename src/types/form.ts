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

export type ClientRating = {
  overall: number;
  creditRating: number;
  incomeRating: number;
  downPaymentRating: number;
  documentationRating: number;
  readinessRating: number;
};

export type AnalyticMetric = {
  key: string;
  label: string;
  value: number | string;
  trend?: 'up' | 'down' | 'neutral';
  percentage?: number;
};

export const calculateClientRating = (state: FormState): ClientRating => {
  let creditRating = 0;
  if (state.creditCategory === 'excellent') creditRating = 10;
  else if (state.creditCategory === 'good') creditRating = 8;
  else if (state.creditCategory === 'fair') creditRating = 6;
  else if (state.creditCategory === 'poor') creditRating = 3;
  
  if (state.hasCreditIssues) {
    if (state.creditIssues?.bankruptcy) {
      const timeframe = state.creditIssues.bankruptcyDetails?.timeframe;
      if (timeframe && ['1-3months', '4-6months', '7-9months', '1year'].includes(timeframe)) {
        creditRating = Math.max(0, creditRating - 5);
      } else {
        creditRating = Math.max(0, creditRating - 2);
      }
    } 
    else if (state.creditIssues?.foreclosure) {
      const timeframe = state.creditIssues.foreclosureDetails?.timeframe;
      if (timeframe && ['1-3months', '4-6months', '7-9months', '1year'].includes(timeframe)) {
        creditRating = Math.max(0, creditRating - 5);
      } else {
        creditRating = Math.max(0, creditRating - 2);
      }
    }
    else if (state.creditIssues?.collections) {
      const amount = state.creditIssues.collectionsDetails?.amount || 0;
      if (amount > 1000) {
        creditRating = Math.max(0, creditRating - 3);
      } else {
        creditRating = Math.max(0, creditRating - 1);
      }
    }
    else if (state.creditIssueType === 'bankruptcy' || state.creditIssueType === 'foreclosure') {
      if (state.creditIssueYear && (new Date().getFullYear() - state.creditIssueYear < 3)) {
        creditRating = Math.max(0, creditRating - 5);
      } else {
        creditRating = Math.max(0, creditRating - 2);
      }
    } else if (state.creditIssueType === 'collections') {
      if (state.creditIssueAmount && state.creditIssueAmount > 1000) {
        creditRating = Math.max(0, creditRating - 3);
      } else {
        creditRating = Math.max(0, creditRating - 1);
      }
    }
  }
  
  let incomeRating = 0;
  if (state.income) {
    const annualIncome = state.incomeType === 'monthly' ? state.income * 12 : state.income;
    if (annualIncome >= 75000) incomeRating = 10;
    else if (annualIncome >= 50000) incomeRating = 8;
    else if (annualIncome >= 35000) incomeRating = 6;
    else if (annualIncome >= 25000) incomeRating = 4;
    else incomeRating = 2;
    
    if (state.employmentType === '1099' && state.selfEmployedYears && state.selfEmployedYears < 2) {
      incomeRating = Math.max(0, incomeRating - 3);
    }
  }
  
  let downPaymentRating = 0;
  if (state.downPaymentSaved) {
    if (state.downPaymentAmount) {
      if (state.downPaymentAmount >= 50000) downPaymentRating = 10;
      else if (state.downPaymentAmount >= 25000) downPaymentRating = 8;
      else if (state.downPaymentAmount >= 15000) downPaymentRating = 6;
      else if (state.downPaymentAmount >= 5000) downPaymentRating = 4;
      else downPaymentRating = 2;
    } else {
      downPaymentRating = 5;
    }
  } else if (state.assistanceOpen) {
    downPaymentRating = 3;
  } else {
    downPaymentRating = 0;
  }
  
  let documentationRating = 0;
  if (state.idType === 'SSN') documentationRating = 10;
  else if (state.idType === 'ITIN') documentationRating = 6;
  else documentationRating = 0;
  
  let readinessRating = 0;
  if (state.timeline === 'immediately') readinessRating = 10;
  else if (state.timeline === '3months') readinessRating = 8;
  else if (state.timeline === '3to6months') readinessRating = 6;
  else if (state.timeline === '6to12months') readinessRating = 4;
  else readinessRating = 2;
  
  const overall = Math.round(
    (creditRating * 0.3) +
    (incomeRating * 0.25) +
    (downPaymentRating * 0.2) +
    (documentationRating * 0.15) +
    (readinessRating * 0.1)
  );
  
  return {
    overall,
    creditRating,
    incomeRating,
    downPaymentRating,
    documentationRating,
    readinessRating
  };
};

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
  
  if (state.creditIssues?.bankruptcy || state.creditIssues?.foreclosure) {
    const bankruptcyTimeframe = state.creditIssues.bankruptcyDetails?.timeframe;
    const foreclosureTimeframe = state.creditIssues.foreclosureDetails?.timeframe;
    
    if (bankruptcyTimeframe && ['1-3months', '4-6months', '7-9months', '1year', '2years'].includes(bankruptcyTimeframe)) {
      return false;
    }
    
    if (foreclosureTimeframe && ['1-3months', '4-6months', '7-9months', '1year', '2years'].includes(foreclosureTimeframe)) {
      return false;
    }
  }
  else if (
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
  
  const needsFixes = [
    (state.creditCategory === 'poor' || state.creditCategory === 'fair'),
    (state.employmentType === '1099' && state.selfEmployedYears && state.selfEmployedYears < 2),
    (state.hasCreditIssues && state.creditIssues?.collections && 
     (state.creditIssues.collectionsDetails?.amount || 0) > 500),
    (state.hasCreditIssues && 
     state.creditIssueType === 'collections' && 
     (state.creditIssueAmount || 0) > 500),
    (!state.downPaymentSaved && !state.assistanceOpen),
    (state.idType === 'ITIN')
  ];
  
  if (needsFixes.some(condition => condition)) {
    return 'fixesNeeded';
  }
  
  return 'ready';
};
