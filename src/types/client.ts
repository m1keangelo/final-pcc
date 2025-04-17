// Client data type with expanded fields
export type ClientData = {
  id: string;
  name: string;
  phone: string;
  email: string;
  agent: string;
  campaign?: string;
  
  // Employment & Income
  employmentType: 'W-2' | '1099';
  selfEmployedYears?: number;
  incomeAnnual: number;
  incomeMonthly?: number;
  
  // Credit related
  creditCategory: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  creditScoreApprox?: number;
  creditIssues?: {
    hasCreditIssues: boolean;
    bankruptcy?: boolean;
    foreclosure?: boolean;
    collections?: boolean;
    medical?: boolean;
    other?: boolean;
    details?: string;
  };
  
  // Down payment
  downPaymentSaved: boolean;
  downPaymentAmount?: number;
  assistanceInterested?: boolean;
  
  // Other financial info
  monthlyDebts?: string;
  
  // Home buying journey
  timeline?: 'immediately' | '3months' | '3to6months' | '6to12months' | 'exploring';
  firstTimeBuyer?: boolean;
  
  // Status & documentation
  legalStatus: 'US Citizen' | 'Permanent Resident' | 'Work Permit' | 'Undocumented';
  qualified: boolean;
  createdDate: string;
  docPaystubsUrl?: string;
  docTaxreturnsUrl?: string;
  docIdUrl?: string;
  consentGiven: boolean;
  comments?: string;
  clientNotes?: string;
  urgency?: 'low' | 'medium' | 'high';
  nextSteps?: string;
  lastContact?: string;
};

// Available campaigns
export const CAMPAIGNS = [
  'Default Campaign',
  'Spring Home Buyer',
  'First-Time Homeowner',
  'Refinance Special', 
  'Investor Program'
];
