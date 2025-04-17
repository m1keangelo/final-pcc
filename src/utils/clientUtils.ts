
import { ClientData } from "../types/client";

// Determine urgency based on timeline and other factors
export const determineUrgency = (data: Omit<ClientData, 'id' | 'createdDate'>): 'low' | 'medium' | 'high' => {
  if (data.timeline === 'immediately' || data.timeline === '3months') {
    return 'high';
  } else if (data.timeline === '3to6months') {
    return 'medium';
  } else {
    return 'low';
  }
};

// Generate next steps based on client data
export const generateNextSteps = (data: Omit<ClientData, 'id' | 'createdDate'>): string => {
  if (!data.qualified) {
    return 'Review qualifications and contact for credit counseling';
  }
  
  if (data.creditIssues?.hasCreditIssues) {
    return 'Address credit issues';
  }
  
  if (data.timeline === 'immediately') {
    return 'Schedule pre-approval meeting immediately';
  }
  
  if (!data.downPaymentSaved && data.assistanceInterested) {
    return 'Discuss down payment assistance programs';
  }
  
  return 'Schedule follow-up consultation';
};
