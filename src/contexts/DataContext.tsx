
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { FormState } from '@/types/form';

// Client data type with expanded fields
export type ClientData = {
  id: string;
  name: string;
  phone: string;
  email: string;
  agent: string;
  campaign?: string; // Added campaign field
  
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

// Generate a random date between a start and end date
function randomDate(start: Date, end: Date): string {
  return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())).toISOString();
}

// Generate random phone number
function randomPhone(): string {
  return `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`;
}

// Generate random client data
function generateRandomClient(id: number): ClientData {
  // Random names
  const firstNames = ['Juan', 'Maria', 'Carlos', 'Sofia', 'Luis', 'Ana', 'Miguel', 'Gabriela', 'Jorge', 'Rosa', 
                     'Pedro', 'Isabella', 'Fernando', 'Valentina', 'Diego', 'Camila', 'Eduardo', 'Julieta', 'Roberto', 'Lucia',
                     'Manuel', 'Elena', 'Ricardo', 'Carmen', 'Victor', 'Julia', 'Javier', 'Patricia', 'Francisco', 'Laura'];
  const lastNames = ['Rodriguez', 'Garcia', 'Martinez', 'Lopez', 'Gonzalez', 'Perez', 'Sanchez', 'Ramirez', 'Torres', 'Flores',
                    'Rivera', 'Gomez', 'Diaz', 'Reyes', 'Morales', 'Cruz', 'Ortiz', 'Gutierrez', 'Chavez', 'Ramos',
                    'Hernandez', 'Vasquez', 'Mendoza', 'Vargas', 'Castillo', 'Jimenez', 'Romero', 'Alvarez', 'Ruiz', 'Suarez'];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  const name = `${firstName} ${lastName}`;
  
  // Random agents
  const agents = ['SoReal Estate', 'Tito Baptista', 'Dennis Lopez', 'Dens Taveras', 'Alvaro Terry'];
  const agent = agents[Math.floor(Math.random() * agents.length)];
  
  // Random employment type
  const employmentType = Math.random() > 0.3 ? 'W-2' : '1099';
  const selfEmployedYears = employmentType === '1099' ? Math.floor(Math.random() * 10) + 1 : undefined;
  
  // Random income
  const incomeAnnual = Math.floor(Math.random() * 80000) + 35000;
  
  // Random credit category and score
  const creditCategories = ['Poor', 'Fair', 'Good', 'Excellent'] as const;
  const creditCategory = creditCategories[Math.floor(Math.random() * creditCategories.length)];
  
  let creditScoreApprox;
  switch (creditCategory) {
    case 'Excellent':
      creditScoreApprox = Math.floor(Math.random() * 50) + 750;
      break;
    case 'Good':
      creditScoreApprox = Math.floor(Math.random() * 50) + 680;
      break;
    case 'Fair':
      creditScoreApprox = Math.floor(Math.random() * 80) + 580;
      break;
    case 'Poor':
      creditScoreApprox = Math.floor(Math.random() * 100) + 450;
      break;
  }
  
  // Random down payment
  const downPaymentSaved = Math.random() > 0.4;
  const downPaymentAmount = downPaymentSaved ? Math.floor(Math.random() * 40000) + 5000 : undefined;
  const assistanceInterested = !downPaymentSaved && Math.random() > 0.5;
  
  // Random timeline
  const timelines = ['immediately', '3months', '3to6months', '6to12months', 'exploring'] as const;
  const timeline = timelines[Math.floor(Math.random() * timelines.length)];
  
  // Random legal status
  const legalStatuses = ['US Citizen', 'Permanent Resident', 'Work Permit', 'Undocumented'] as const;
  const legalStatus = legalStatuses[Math.floor(Math.random() * legalStatuses.length)];
  
  // Random campaign
  const campaign = CAMPAIGNS[Math.floor(Math.random() * CAMPAIGNS.length)];
  
  // Random qualification (more likely to be qualified than not)
  const qualified = Math.random() > 0.2;
  
  // Random credit issues
  const hasCreditIssues = Math.random() > 0.7;
  let creditIssues;
  
  if (hasCreditIssues) {
    const issues = {
      bankruptcy: Math.random() > 0.8,
      foreclosure: Math.random() > 0.8,
      collections: Math.random() > 0.6,
      medical: Math.random() > 0.7,
      other: Math.random() > 0.9,
    };
    
    const details = [];
    if (issues.bankruptcy) details.push('Bankruptcy: $12,000, 3 years ago');
    if (issues.foreclosure) details.push('Foreclosure: $180,000, 4 years ago');
    if (issues.collections) details.push('Collections: $3,500, 2 years ago');
    if (issues.medical) details.push('Medical debt: $8,200, 1 year ago');
    if (issues.other) details.push('Other credit issues');
    
    creditIssues = {
      hasCreditIssues: true,
      ...issues,
      details: details.join('; ')
    };
  } else {
    creditIssues = { hasCreditIssues: false };
  }
  
  // Create date in the past year
  const endDate = new Date();
  const startDate = new Date();
  startDate.setFullYear(endDate.getFullYear() - 1);
  const createdDate = randomDate(startDate, endDate);
  
  // First time buyer
  const firstTimeBuyer = Math.random() > 0.4;
  
  // Generate comments
  const commentOptions = [
    'Looking for a family home in a good school district',
    'Interested in investment properties',
    'Wants to be close to public transportation',
    'Prefers a newly built home',
    'Needs a home office space',
    'Looking for a fixer-upper',
    'Wants a property with land',
    'Looking to downsize',
    'Relocating for work',
    'Wants to be close to family',
  ];
  
  const comments = Math.random() > 0.3 ? commentOptions[Math.floor(Math.random() * commentOptions.length)] : undefined;
  
  // Generate email
  const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}${Math.floor(Math.random() * 100)}@example.com`;
  
  // Determine urgency based on timeline
  let urgency: 'low' | 'medium' | 'high';
  if (timeline === 'immediately' || timeline === '3months') {
    urgency = 'high';
  } else if (timeline === '3to6months') {
    urgency = 'medium';
  } else {
    urgency = 'low';
  }
  
  // Generate next steps
  let nextSteps;
  if (!qualified) {
    nextSteps = 'Review qualifications and contact for credit counseling';
  } else if (hasCreditIssues) {
    nextSteps = 'Address credit issues';
  } else if (timeline === 'immediately') {
    nextSteps = 'Schedule pre-approval meeting immediately';
  } else if (!downPaymentSaved && assistanceInterested) {
    nextSteps = 'Discuss down payment assistance programs';
  } else {
    nextSteps = 'Schedule follow-up consultation';
  }
  
  return {
    id: id.toString(),
    name,
    phone: randomPhone(),
    email,
    agent,
    campaign,
    employmentType,
    selfEmployedYears,
    incomeAnnual,
    creditCategory,
    creditScoreApprox,
    creditIssues,
    downPaymentSaved,
    downPaymentAmount,
    assistanceInterested,
    timeline,
    firstTimeBuyer,
    legalStatus,
    qualified,
    createdDate,
    consentGiven: true,
    comments,
    urgency,
    nextSteps
  };
}

// Generate 50 random clients
const generateRandomClients = (count: number): ClientData[] => {
  const clients: ClientData[] = [];
  for (let i = 1; i <= count; i++) {
    clients.push(generateRandomClient(i));
  }
  return clients;
};

// Sample mock data with 50 random clients plus original 10 clients
const MOCK_CLIENTS: ClientData[] = [
  // Original 10 clients
  {
    id: '1',
    name: 'Juan Perez',
    phone: '555-123-4567',
    email: 'juan@example.com',
    agent: 'SoReal Estate',
    campaign: 'Spring Home Buyer',
    employmentType: 'W-2',
    incomeAnnual: 52000,
    creditCategory: 'Good',
    downPaymentSaved: true,
    downPaymentAmount: 15000,
    legalStatus: 'Permanent Resident',
    qualified: true,
    createdDate: '2025-01-15T15:30:00Z',
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
    campaign: 'First-Time Homeowner',
    employmentType: '1099',
    selfEmployedYears: 3,
    incomeAnnual: 65000,
    creditCategory: 'Fair',
    creditScoreApprox: 610,
    downPaymentSaved: true,
    downPaymentAmount: 8000,
    legalStatus: 'US Citizen',
    qualified: true,
    createdDate: '2025-02-10T10:15:00Z',
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
    campaign: 'Default Campaign',
    employmentType: '1099',
    selfEmployedYears: 1,
    incomeAnnual: 45000,
    creditCategory: 'Poor',
    creditScoreApprox: 550,
    downPaymentSaved: false,
    assistanceInterested: true,
    legalStatus: 'Work Permit',
    qualified: false,
    createdDate: '2025-02-28T14:45:00Z',
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
    campaign: 'Refinance Special',
    employmentType: 'W-2',
    incomeAnnual: 48000,
    creditCategory: 'Good',
    downPaymentSaved: false,
    assistanceInterested: true,
    legalStatus: 'US Citizen',
    qualified: true,
    createdDate: '2025-03-07T09:30:00Z',
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
    campaign: 'Investor Program',
    employmentType: 'W-2',
    incomeAnnual: 59000,
    creditCategory: 'Excellent',
    downPaymentSaved: true,
    downPaymentAmount: 25000,
    legalStatus: 'US Citizen',
    qualified: true,
    createdDate: '2025-03-18T11:20:00Z',
    consentGiven: true,
    timeline: 'exploring',
    comments: 'Pre-approved with another lender but shopping rates',
    firstTimeBuyer: false,
    urgency: 'medium',
    nextSteps: 'Schedule home tour'
  },
  {
    id: '6',
    name: 'Roberto Mendez',
    phone: '555-222-1717',
    email: 'roberto@example.com',
    agent: 'SoReal Estate',
    campaign: 'Default Campaign',
    employmentType: 'W-2',
    incomeAnnual: 47500,
    creditCategory: 'Good',
    downPaymentSaved: true,
    downPaymentAmount: 12000,
    legalStatus: 'US Citizen',
    qualified: true,
    createdDate: '2025-03-22T16:45:00Z',
    consentGiven: true,
    timeline: '3to6months',
    firstTimeBuyer: true,
    urgency: 'medium',
    nextSteps: 'Schedule financial planning meeting'
  },
  {
    id: '7',
    name: 'Gabriela Fuentes',
    phone: '555-333-8989',
    email: 'gabriela@example.com',
    agent: 'Tito Baptista',
    campaign: 'Spring Home Buyer',
    employmentType: 'W-2',
    incomeAnnual: 68000,
    creditCategory: 'Excellent',
    creditScoreApprox: 780,
    downPaymentSaved: true,
    downPaymentAmount: 30000,
    legalStatus: 'US Citizen',
    qualified: true,
    createdDate: '2025-04-01T10:00:00Z',
    consentGiven: true,
    timeline: 'immediately',
    comments: 'Ready to make an offer',
    firstTimeBuyer: false,
    urgency: 'high',
    nextSteps: 'Schedule home viewing'
  },
  {
    id: '8',
    name: 'Jorge Ramirez',
    phone: '555-111-4455',
    email: 'jorge@example.com',
    agent: 'Dennis Lopez',
    campaign: 'First-Time Homeowner',
    employmentType: '1099',
    selfEmployedYears: 4,
    incomeAnnual: 72000,
    creditCategory: 'Good',
    creditScoreApprox: 710,
    downPaymentSaved: true,
    downPaymentAmount: 18000,
    legalStatus: 'US Citizen',
    qualified: true,
    createdDate: '2025-04-05T13:15:00Z',
    consentGiven: true,
    timeline: '3months',
    firstTimeBuyer: true,
    urgency: 'medium',
    nextSteps: 'Review pre-approval options'
  },
  {
    id: '9',
    name: 'Sofia Vargas',
    phone: '555-999-7272',
    email: 'sofia@example.com',
    agent: 'Dens Taveras',
    campaign: 'Refinance Special',
    employmentType: 'W-2',
    incomeAnnual: 54000,
    creditCategory: 'Good',
    creditScoreApprox: 680,
    downPaymentSaved: false,
    assistanceInterested: true,
    legalStatus: 'Permanent Resident',
    qualified: true,
    createdDate: '2025-04-10T09:45:00Z',
    consentGiven: true,
    timeline: '3months',
    firstTimeBuyer: true,
    urgency: 'medium',
    nextSteps: 'Schedule call to discuss assistance programs'
  },
  {
    id: '10',
    name: 'Eduardo Torres',
    phone: '555-666-2323',
    email: 'eduardo@example.com',
    agent: 'Alvaro Terry',
    campaign: 'Investor Program',
    employmentType: 'W-2',
    incomeAnnual: 88000,
    creditCategory: 'Excellent',
    creditScoreApprox: 790,
    downPaymentSaved: true,
    downPaymentAmount: 45000,
    legalStatus: 'US Citizen',
    qualified: true,
    createdDate: '2025-04-15T15:00:00Z',
    consentGiven: true,
    timeline: 'immediately',
    firstTimeBuyer: false,
    urgency: 'high',
    nextSteps: 'Review investment property options',
    comments: 'Looking for multi-unit property as investment'
  },
  // Add 50 more random clients
  ...generateRandomClients(50).map((client, index) => ({
    ...client,
    id: (index + 11).toString() // Start IDs after the original 10
  }))
];

// Data context type
type DataContextType = {
  clients: ClientData[];
  campaigns: string[];
  addClient: (client: Omit<ClientData, 'id' | 'createdDate'>) => void;
  updateClient: (id: string, data: Partial<ClientData>) => void;
  deleteClient: (id: string) => void; // New delete client function
};

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Provider component
export const DataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [clients, setClients] = useState<ClientData[]>(MOCK_CLIENTS);

  // Add a new client with expanded form data
  const addClient = (clientData: Omit<ClientData, 'id' | 'createdDate'>) => {
    console.log('Adding new client:', clientData);
    const newClient: ClientData = {
      ...clientData,
      id: Date.now().toString(),
      createdDate: new Date().toISOString(),
      urgency: determineUrgency(clientData),
      nextSteps: generateNextSteps(clientData),
      campaign: clientData.campaign || 'Default Campaign'
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

  // Delete a client
  const deleteClient = (id: string) => {
    setClients(prev => prev.filter(client => client.id !== id));
  };

  return (
    <DataContext.Provider value={{ clients, campaigns: CAMPAIGNS, addClient, updateClient, deleteClient }}>
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
