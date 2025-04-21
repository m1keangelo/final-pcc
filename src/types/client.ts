
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
  
  // Client journey status
  journeyStatus?: 'docCollection' | 'searching' | 'underContract' | 'closed';
  anticipatedClosingDate?: string;
  
  // Trash management
  deletedAt?: string;
};

// Available campaigns
export const CAMPAIGNS = [
  'Facebook',
  'Instagram', 
  'WhatsApp',
  'Google Ads',
  'Referral'
];

// Available client table columns
export type ClientColumnId = 
  | 'name'
  | 'phone'
  | 'email'
  | 'agent'
  | 'campaign'
  | 'employmentType'
  | 'incomeAnnual'
  | 'creditCategory'
  | 'downPaymentSaved'
  | 'timeline'
  | 'firstTimeBuyer'
  | 'legalStatus'
  | 'qualified'
  | 'urgency'
  | 'journeyStatus'
  | 'anticipatedClosingDate'
  | 'nextSteps';

export interface ClientColumn {
  id: ClientColumnId;
  label: string;
  required?: boolean;
}

export const CLIENT_COLUMNS: ClientColumn[] = [
  { id: 'name', label: 'Name', required: true },
  { id: 'phone', label: 'Phone' },
  { id: 'email', label: 'Email' },
  { id: 'agent', label: 'Agent' },
  { id: 'campaign', label: 'Campaign' },
  { id: 'employmentType', label: 'Employment' },
  { id: 'incomeAnnual', label: 'Annual Income' },
  { id: 'creditCategory', label: 'Credit' },
  { id: 'downPaymentSaved', label: 'Down Payment' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'firstTimeBuyer', label: 'First Time Buyer' },
  { id: 'legalStatus', label: 'Legal Status' },
  { id: 'qualified', label: 'Qualified' },
  { id: 'urgency', label: 'Urgency', required: true },
  { id: 'journeyStatus', label: 'Status' },
  { id: 'anticipatedClosingDate', label: 'Closing Date' },
  { id: 'nextSteps', label: 'Next Steps' }
];
