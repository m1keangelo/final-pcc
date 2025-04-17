
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { ClientData, CAMPAIGNS } from '@/types/client';
import { MOCK_CLIENTS } from '@/data/mockClients';
import { determineUrgency, generateNextSteps } from '@/utils/clientUtils';

// Data context type
type DataContextType = {
  clients: ClientData[];
  campaigns: string[];
  addClient: (client: Omit<ClientData, 'id' | 'createdDate'>) => void;
  updateClient: (id: string, data: Partial<ClientData>) => void;
  deleteClient: (id: string) => void;
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
