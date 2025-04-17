
import { FormState } from "@/types/form";

export const formatPhoneNumber = (value: string): string => {
  const cleaned = value.replace(/\D/g, '');
  const truncated = cleaned.slice(0, 10);
  
  if (truncated.length <= 3) {
    return truncated;
  } else if (truncated.length <= 6) {
    return `(${truncated.slice(0, 3)}) ${truncated.slice(3)}`;
  } else {
    return `(${truncated.slice(0, 3)}) ${truncated.slice(3, 6)}-${truncated.slice(6)}`;
  }
};

export const transformFormData = (data: FormState, selectedAgent: string) => {
  const incomeAnnual = data.income 
    ? (data.incomeType === 'monthly' ? data.income * 12 : data.income) 
    : 0;
  
  const incomeMonthly = data.income
    ? (data.incomeType === 'annual' ? data.income / 12 : data.income)
    : 0;

  let legalStatus: 'US Citizen' | 'Permanent Resident' | 'Work Permit' | 'Undocumented';
  switch (data.idType) {
    case 'SSN':
      legalStatus = 'US Citizen';
      break;
    case 'ITIN':
      legalStatus = 'Permanent Resident';
      break;
    default:
      legalStatus = 'Undocumented';
  }

  const creditCategoryMap: Record<string, 'Excellent' | 'Good' | 'Fair' | 'Poor'> = {
    'excellent': 'Excellent',
    'good': 'Good',
    'fair': 'Fair',
    'poor': 'Poor',
    'unknown': 'Fair',
  };

  const employmentTypeMap: Record<string, 'W-2' | '1099'> = {
    'W-2': 'W-2',
    '1099': '1099',
    'retired': 'W-2',
    'unemployed': 'W-2',
    'other': 'W-2',
  };
  
  const creditIssueComments = [];
  const hasCreditIssues = data.hasCreditIssues === true;
  
  const creditIssueDetails: {
    hasCreditIssues: boolean;
    bankruptcy?: boolean;
    foreclosure?: boolean;
    collections?: boolean;
    medical?: boolean;
    other?: boolean;
    details?: string;
  } = {
    hasCreditIssues: hasCreditIssues
  };
  
  if (hasCreditIssues && data.creditIssues) {
    if (data.creditIssues.bankruptcy) creditIssueDetails.bankruptcy = true;
    if (data.creditIssues.foreclosure) creditIssueDetails.foreclosure = true;
    if (data.creditIssues.collections) creditIssueDetails.collections = true;
    if (data.creditIssues.medical) creditIssueDetails.medical = true;
    if (data.creditIssues.other) creditIssueDetails.other = true;
    
    if (data.creditIssues.bankruptcy) {
      const details = data.creditIssues.bankruptcyDetails;
      creditIssueComments.push(`Bankruptcy: $${details?.amount || 'unknown'}, ${details?.timeframe || 'unknown'} ago, ${details?.inCollection ? 'In collection' : 'Not in collection'}`);
    }
    
    if (data.creditIssues.foreclosure) {
      const details = data.creditIssues.foreclosureDetails;
      creditIssueComments.push(`Foreclosure: $${details?.amount || 'unknown'}, ${details?.timeframe || 'unknown'} ago, ${details?.inCollection ? 'In collection' : 'Not in collection'}`);
    }
    
    if (data.creditIssues.collections) {
      const details = data.creditIssues.collectionsDetails;
      creditIssueComments.push(`Collections: $${details?.amount || 'unknown'}, ${details?.timeframe || 'unknown'} ago, ${details?.inCollection ? 'In collection' : 'Not in collection'}`);
    }
    
    if (data.creditIssues.medical) {
      const details = data.creditIssues.medicalDetails;
      creditIssueComments.push(`Medical: $${details?.amount || 'unknown'}, ${details?.timeframe || 'unknown'} ago, ${details?.inCollection ? 'In collection' : 'Not in collection'}`);
    }
    
    if (data.creditIssues.other) {
      const details = data.creditIssues.otherDetails;
      creditIssueComments.push(`Other credit issue: $${details?.amount || 'unknown'}, ${details?.timeframe || 'unknown'} ago, ${details?.inCollection ? 'In collection' : 'Not in collection'}`);
    }
  }
  
  if (creditIssueComments.length > 0) {
    creditIssueDetails.details = creditIssueComments.join('; ');
  }
  
  const combinedComments = [
    data.comments || '',
    creditIssueComments.length > 0 ? 'Credit Issues: ' + creditIssueComments.join('; ') : ''
  ].filter(Boolean).join('\n\n');

  return {
    name: data.name,
    phone: data.phone,
    email: data.email,
    agent: selectedAgent,
    campaign: data.campaign || 'Default Campaign', // Added campaign field to the returned object
    employmentType: employmentTypeMap[data.employmentType || 'W-2'],
    selfEmployedYears: data.selfEmployedYears || undefined,
    incomeAnnual,
    incomeMonthly,
    creditCategory: creditCategoryMap[data.creditCategory || 'unknown'],
    creditScoreApprox: data.creditScore || undefined,
    creditIssues: creditIssueDetails,
    downPaymentSaved: !!data.downPaymentSaved,
    downPaymentAmount: data.downPaymentAmount || undefined,
    assistanceInterested: data.assistanceOpen !== null ? !!data.assistanceOpen : undefined,
    monthlyDebts: data.monthlyDebts || undefined,
    timeline: data.timeline || undefined,
    firstTimeBuyer: data.firstTimeBuyer !== null ? data.firstTimeBuyer : undefined,
    legalStatus,
    qualified: true,
    consentGiven: true,
    comments: combinedComments,
  };
};
