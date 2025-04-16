import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FormState } from '@/types/form';

// Client data type with expanded fields
export type ClientData = {
  id: string;
  name: string;
  phone: string;
  email: string;
  agent: string;
  
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

// Sample mock data
const MOCK_CLIENTS: ClientData[] = [
  {
    id: '1',
    name: 'Juan Perez',
    phone: '555-123-4567',
    email: 'juan@example.com',
    agent: 'SoReal Estate',
    employmentType: 'W-2',
    incomeAnnual: 52000,
    creditCategory: 'Good',
    downPaymentSaved: true,
    downPaymentAmount: 15000,
    legalStatus: 'Permanent Resident',
    qualified: true,
    createdDate: '2025-04-01T15:30:00Z',
    consentGiven: true,
    comments: 'Looking to buy in the next 3 months',
    timeline: '3months',
    firstTimeBuyer: true,
    urgency: 'medium',
    nextSteps: 'Schedule pre-approval meeting'
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    phone: '555-987-6543',
    email: 'maria@example.com',
    agent: 'Tito Baptista',
    employmentType: '1099',
    selfEmployedYears: 3,
    incomeAnnual: 65000,
    creditCategory: 'Fair',
    creditScoreApprox: 610,
    downPaymentSaved: true,
    downPaymentAmount: 8000,
    legalStatus: 'US Citizen',
    qualified: true,
    createdDate: '2025-04-02T10:15:00Z',
    consentGiven: true,
    timeline: 'immediately',
    comments: 'Self-employed for 3 years',
    urgency: 'high',
    nextSteps: 'Send pre-approval documents'
  },
  {
    id: '3',
    name: 'Luis Gonzalez',
    phone: '555-555-1212',
    email: 'luis@example.com',
    agent: 'Dennis Lopez',
    employmentType: '1099',
    selfEmployedYears: 1,
    incomeAnnual: 45000,
    creditCategory: 'Poor',
    creditScoreApprox: 550,
    downPaymentSaved: false,
    assistanceInterested: true,
    legalStatus: 'Work Permit',
    qualified: false,
    createdDate: '2025-04-03T14:45:00Z',
    consentGiven: true,
    timeline: '6to12months',
    comments: 'Needs credit repair',
    urgency: 'low',
    creditIssues: {
      hasCreditIssues: true,
      collections: true,
      details: 'Collections: $3,500, 2 years ago, In collection'
    },
    nextSteps: 'Refer to credit counseling'
  },
  {
    id: '4',
    name: 'Ana Martinez',
    phone: '555-777-8888',
    email: 'ana@example.com',
    agent: 'Dens Taveras',
    employmentType: 'W-2',
    incomeAnnual: 48000,
    creditCategory: 'Good',
    downPaymentSaved: false,
    assistanceInterested: true,
    legalStatus: 'US Citizen',
    qualified: true,
    createdDate: '2025-04-05T09:30:00Z',
    consentGiven: true,
    timeline: '3to6months',
    urgency: 'medium',
    nextSteps: 'Research down payment assistance programs'
  },
  {
    id: '5',
    name: 'Carlos Vega',
    phone: '555-444-3333',
    email: 'carlos@example.com',
    agent: 'Alvaro Terry',
    employmentType: 'W-2',
    incomeAnnual: 59000,
    creditCategory: 'Excellent',
    downPaymentSaved: true,
    downPaymentAmount: 25000,
    legalStatus: 'US Citizen',
    qualified: true,
    createdDate: '2025-04-08T11:20:00Z',
    consentGiven: true,
    timeline: 'exploring',
    comments: 'Pre-approved with another lender but shopping rates',
    firstTimeBuyer: false,
    urgency: 'medium',
    nextSteps: 'Schedule home tour'
  }
];

// Data context type
type DataContextType = {
  clients: ClientData[];
  addClient: (client: Omit<ClientData, 'id' | 'createdDate'>) => void;
  updateClient: (id: string, data: Partial<ClientData>) => void;
};

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider component
export const DataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [clients, setClients] = useState<ClientData[]>(MOCK_CLIENTS);

  // Add a new client with expanded form data
  const addClient = (clientData: Omit<ClientData, 'id' | 'createdDate'>) => {
    const newClient: ClientData = {
      ...clientData,
      id: Date.now().toString(),
      createdDate: new Date().toISOString(),
      urgency: determineUrgency(clientData),
      nextSteps: generateNextSteps(clientData)
    };
    
    setClients(prev => [...prev, newClient]);
  };

  // Determine urgency based on timeline and other factors
  const determineUrgency = (data: Omit<ClientData, 'id' | 'createdDate'>): 'low' | 'medium' | 'high' => {
    if (data.timeline === 'immediately' || data.timeline === '3months') {
      return 'high';
    } else if (data.timeline === '3to6months') {
      return 'medium';
    } else {
      return 'low';
    }
  };

  // Generate next steps based on client data
  const generateNextSteps = (data: Omit<ClientData, 'id' | 'createdDate'>): string => {
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

  // Update an existing client
  const updateClient = (id: string, data: Partial<ClientData>) => {
    setClients(prev => 
      prev.map(client => 
        client.id === id ? { ...client, ...data } : client
      )
    );
  };

  return (
    <DataContext.Provider value={{ clients, addClient, updateClient }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to use the data context
export const useData = (): DataContextType => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
