
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Client data type
export type ClientData = {
  id: string;
  name: string;
  phone: string;
  employmentType: 'W-2' | '1099';
  incomeAnnual: number;
  creditCategory: 'Poor' | 'Fair' | 'Good' | 'Excellent';
  creditScoreApprox?: number;
  downPaymentSaved: boolean;
  downPaymentAmount?: number;
  legalStatus: 'US Citizen' | 'Permanent Resident' | 'Work Permit' | 'Undocumented';
  qualified: boolean;
  createdDate: string;
  docPaystubsUrl?: string;
  docTaxreturnsUrl?: string;
  docIdUrl?: string;
  consentGiven: boolean;
  comments?: string;
};

// Sample mock data
const MOCK_CLIENTS: ClientData[] = [
  {
    id: '1',
    name: 'Juan Perez',
    phone: '555-123-4567',
    employmentType: 'W-2',
    incomeAnnual: 52000,
    creditCategory: 'Good',
    downPaymentSaved: true,
    downPaymentAmount: 15000,
    legalStatus: 'Permanent Resident',
    qualified: true,
    createdDate: '2025-04-01T15:30:00Z',
    consentGiven: true,
    comments: 'Looking to buy in the next 3 months'
  },
  {
    id: '2',
    name: 'Maria Rodriguez',
    phone: '555-987-6543',
    employmentType: '1099',
    incomeAnnual: 65000,
    creditCategory: 'Fair',
    creditScoreApprox: 610,
    downPaymentSaved: true,
    downPaymentAmount: 8000,
    legalStatus: 'US Citizen',
    qualified: true,
    createdDate: '2025-04-02T10:15:00Z',
    consentGiven: true,
    comments: 'Self-employed for 3 years'
  },
  {
    id: '3',
    name: 'Luis Gonzalez',
    phone: '555-555-1212',
    employmentType: '1099',
    incomeAnnual: 45000,
    creditCategory: 'Poor',
    creditScoreApprox: 550,
    downPaymentSaved: false,
    legalStatus: 'Work Permit',
    qualified: false,
    createdDate: '2025-04-03T14:45:00Z',
    consentGiven: true,
    comments: 'Needs credit repair'
  },
  {
    id: '4',
    name: 'Ana Martinez',
    phone: '555-777-8888',
    employmentType: 'W-2',
    incomeAnnual: 48000,
    creditCategory: 'Good',
    downPaymentSaved: false,
    legalStatus: 'US Citizen',
    qualified: true,
    createdDate: '2025-04-05T09:30:00Z',
    consentGiven: true,
  },
  {
    id: '5',
    name: 'Carlos Vega',
    phone: '555-444-3333',
    employmentType: 'W-2',
    incomeAnnual: 59000,
    creditCategory: 'Excellent',
    downPaymentSaved: true,
    downPaymentAmount: 25000,
    legalStatus: 'US Citizen',
    qualified: true,
    createdDate: '2025-04-08T11:20:00Z',
    consentGiven: true,
    comments: 'Pre-approved with another lender but shopping rates'
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

  // Add a new client
  const addClient = (clientData: Omit<ClientData, 'id' | 'createdDate'>) => {
    const newClient: ClientData = {
      ...clientData,
      id: Date.now().toString(),
      createdDate: new Date().toISOString()
    };
    
    setClients(prev => [...prev, newClient]);
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
