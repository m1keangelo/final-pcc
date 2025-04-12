export type FormState = {
  employmentType: 'W-2' | '1099' | null;
  incomeType: 'annual' | 'monthly';
  income: number | null;
  creditCategory: 'Poor' | 'Fair' | 'Good' | 'Excellent' | null;
  creditScore: number | null;
  downPaymentSaved: boolean | null;
  downPaymentAmount: number | null;
  legalStatus: 'US Citizen' | 'Permanent Resident' | 'Work Permit' | 'Undocumented' | null;
  name: string;
  phone: string;
  comments: string;
};

export type FormStep = 
  | 'employment' 
  | 'income' 
  | 'credit' 
  | 'creditScore'
  | 'downPayment'
  | 'downPaymentAmount'
  | 'legalStatus'
  | 'contactInfo'
  | 'summary';

export const isQualified = (state: FormState): boolean => {
  // Client is not qualified if they are undocumented
  if (state.legalStatus === 'Undocumented') {
    return false;
  }
  
  // Client is not qualified if they have poor credit AND no down payment
  if (state.creditCategory === 'Poor' && !state.downPaymentSaved) {
    return false;
  }
  
  // Otherwise qualified
  return true;
};
