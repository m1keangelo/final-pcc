
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ClientData, CAMPAIGNS, ClientColumnId, CLIENT_COLUMNS } from '@/types/client';
import { MOCK_CLIENTS } from '@/data/mockClients';
import { determineUrgency, generateNextSteps } from '@/utils/clientUtils';

// Extended Data context type to include trash functionality
type DataContextType = {
  clients: ClientData[];
  trashedClients: ClientData[];
  campaigns: string[];
  visibleColumns: ClientColumnId[];
  setVisibleColumns: (columns: ClientColumnId[]) => void;
  resetColumnPreferences: () => void;
  addClient: (client: Omit<ClientData, 'id' | 'createdDate'>) => void;
  updateClient: (id: string, data: Partial<ClientData>) => void;
  deleteClient: (id: string) => void;
  restoreClient: (id: string) => void;
  emptyTrash: () => void;
  permanentlyDeleteClient: (id: string) => void;
};

// Create the context
const DataContext = createContext<DataContextType | undefined>(undefined);

// Number of days to keep clients in trash before auto-deletion
const TRASH_RETENTION_DAYS = 30;

// Default visible columns
const DEFAULT_VISIBLE_COLUMNS: ClientColumnId[] = [
  'name', 'phone', 'creditCategory', 'legalStatus', 
  'campaign', 'timeline', 'urgency', 'journeyStatus', 'nextSteps'
];

// Local storage key for column preferences
const COLUMN_PREFS_STORAGE_KEY = 'gallo-avion-column-prefs';

// Provider component
export const DataProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [clients, setClients] = useState<ClientData[]>(MOCK_CLIENTS);
  const [trashedClients, setTrashedClients] = useState<ClientData[]>([]);
  const [visibleColumns, setVisibleColumns] = useState<ClientColumnId[]>(() => {
    // Try to load from localStorage
    const savedColumns = localStorage.getItem(COLUMN_PREFS_STORAGE_KEY);
    if (savedColumns) {
      try {
        return JSON.parse(savedColumns);
      } catch (e) {
        console.error("Error parsing saved column preferences", e);
      }
    }
    return DEFAULT_VISIBLE_COLUMNS;
  });

  // Save column preferences to localStorage when they change
  useEffect(() => {
    localStorage.setItem(COLUMN_PREFS_STORAGE_KEY, JSON.stringify(visibleColumns));
  }, [visibleColumns]);

  // Reset column preferences to default
  const resetColumnPreferences = () => {
    setVisibleColumns(DEFAULT_VISIBLE_COLUMNS);
  };

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

  // Soft delete a client (move to trash)
  const deleteClient = (id: string) => {
    const clientToDelete = clients.find(client => client.id === id);
    if (clientToDelete) {
      // Add deleted timestamp for auto-cleanup
      const clientWithDeletedAt = {
        ...clientToDelete,
        deletedAt: new Date().toISOString()
      };
      
      // Move to trash
      setTrashedClients(prev => [...prev, clientWithDeletedAt]);
      
      // Remove from active clients
      setClients(prev => prev.filter(client => client.id !== id));
    }
  };

  // Restore a client from trash
  const restoreClient = (id: string) => {
    const clientToRestore = trashedClients.find(client => client.id === id);
    if (clientToRestore) {
      // Remove deletedAt property before restoring
      const { deletedAt, ...restoredClient } = clientToRestore;
      
      // Add back to active clients
      setClients(prev => [...prev, restoredClient as ClientData]);
      
      // Remove from trash
      setTrashedClients(prev => prev.filter(client => client.id !== id));
    }
  };

  // Permanently delete a single client from trash
  const permanentlyDeleteClient = (id: string) => {
    setTrashedClients(prev => prev.filter(client => client.id !== id));
  };

  // Empty the entire trash
  const emptyTrash = () => {
    setTrashedClients([]);
  };

  // Auto-cleanup effect that runs daily to check for expired trash items
  useEffect(() => {
    const checkTrash = () => {
      const now = new Date();
      const updatedTrash = trashedClients.filter(client => {
        if (!client.deletedAt) return true;
        
        const deletedDate = new Date(client.deletedAt);
        const daysSinceDeleted = Math.floor((now.getTime() - deletedDate.getTime()) / (1000 * 60 * 60 * 24));
        
        return daysSinceDeleted < TRASH_RETENTION_DAYS;
      });

      if (updatedTrash.length !== trashedClients.length) {
        setTrashedClients(updatedTrash);
      }
    };

    // Run cleanup check once a day
    const interval = setInterval(checkTrash, 1000 * 60 * 60 * 24);
    
    // Initial check on mount
    checkTrash();
    
    return () => clearInterval(interval);
  }, [trashedClients]);

  return (
    <DataContext.Provider value={{ 
      clients, 
      trashedClients, 
      campaigns: CAMPAIGNS, 
      visibleColumns,
      setVisibleColumns,
      resetColumnPreferences,
      addClient, 
      updateClient, 
      deleteClient,
      restoreClient,
      emptyTrash,
      permanentlyDeleteClient
    }}>
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
