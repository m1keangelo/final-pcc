
import { FormState } from '../types/formState';

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
