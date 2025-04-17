
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { FileDown, Trash2 } from "lucide-react";
import { ClientData, CAMPAIGNS } from "@/types/client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/lib/toast";

// Import the refactored components
import { ClientsTable } from "@/components/clients/ClientsTable";
import { ClientDetails } from "@/components/clients/ClientDetails";
import { ClientPagination } from "@/components/clients/ClientPagination";
import { ClientFilters } from "@/components/clients/ClientFilters";
import { ClientActionsBar } from "@/components/clients/ClientActionsBar";

const Clients = () => {
  const { t } = useLanguage();
  const { clients, campaigns, deleteClient, trashedClients, visibleColumns } = useData();
  const { hasPermission, isAdmin, isSuperAdmin } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<string>("all");
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const itemsPerPage = 10;
  
  const canDeleteClients = hasPermission('DELETE_CLIENTS') || isAdmin || isSuperAdmin;
  
  // Filter clients based on search and campaign
  const filteredClients = clients.filter(client => {
    const searchTerm = search.toLowerCase();
    const matchesSearch = client.name.toLowerCase().includes(searchTerm) || 
           client.phone.toLowerCase().includes(searchTerm) ||
           (client.email?.toLowerCase().includes(searchTerm) || false) ||
           (client.comments?.toLowerCase().includes(searchTerm) || false);
           
    const matchesCampaign = selectedCampaign === "all" || client.campaign === selectedCampaign;
    
    return matchesSearch && matchesCampaign;
  });
  
  // Calculate pagination
  const totalPages = Math.max(1, Math.ceil(filteredClients.length / itemsPerPage));
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  // Filter clients by urgency
  const highUrgencyClients = filteredClients.filter(c => c.urgency === 'high');
  const mediumUrgencyClients = filteredClients.filter(c => c.urgency === 'medium');
  const lowUrgencyClients = filteredClients.filter(c => c.urgency === 'low');
  
  // Handle client selection
  const handleSelectClient = (clientId: string) => {
    setSelectedClients(prev => {
      if (prev.includes(clientId)) {
        return prev.filter(id => id !== clientId);
      } else {
        return [...prev, clientId];
      }
    });
  };
  
  // Handle "select all" checkbox
  const handleSelectAllInPage = () => {
    if (selectedClients.length === paginatedClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(paginatedClients.map(client => client.id));
    }
  };
  
  // Handle deleting selected clients
  const handleDeleteSelected = () => {
    selectedClients.forEach(id => deleteClient(id));
    toast(`${selectedClients.length} clients were deleted`);
    setSelectedClients([]);
  };
  
  // Export to CSV
  const exportToCSV = () => {
    const headers = [
      "Name", 
      "Email",
      "Phone", 
      "Agent",
      "Campaign",
      "Employment Type",
      "Self Employed Years",
      "Income (Annual)",
      "Income (Monthly)",
      "Credit Category",
      "Credit Score", 
      "Credit Issues",
      "Down Payment", 
      "Down Payment Amount",
      "Assistance Interested",
      "Monthly Debts", 
      "Timeline",
      "First Time Buyer",
      "Legal Status", 
      "Qualified", 
      "Date", 
      "Comments",
      "Next Steps",
      "Urgency"
    ];
    
    const rows = filteredClients.map(c => [
      c.name,
      c.email || 'N/A',
      c.phone,
      c.agent || 'N/A',
      c.campaign || 'Default Campaign',
      c.employmentType,
      c.selfEmployedYears || 'N/A',
      `$${c.incomeAnnual.toLocaleString()}`,
      c.incomeMonthly ? `$${Math.round(c.incomeMonthly).toLocaleString()}` : 'N/A',
      c.creditCategory,
      c.creditScoreApprox || 'N/A',
      c.creditIssues?.hasCreditIssues ? 'Yes' : 'No',
      c.downPaymentSaved ? 'Yes' : 'No',
      c.downPaymentAmount ? `$${c.downPaymentAmount.toLocaleString()}` : 'N/A',
      c.assistanceInterested ? 'Yes' : 'No',
      c.monthlyDebts || 'N/A',
      c.timeline || 'N/A',
      c.firstTimeBuyer ? 'Yes' : c.firstTimeBuyer === false ? 'No' : 'N/A',
      c.legalStatus,
      c.qualified ? 'Yes' : 'No',
      new Date(c.createdDate).toLocaleDateString(),
      c.comments || '',
      c.nextSteps || '',
      c.urgency || 'medium'
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'gallo-avion-clients.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('clients.title')}</h1>
        <div className="flex gap-3">
          {selectedClient && (
            <Button 
              variant="outline"
              onClick={() => setSelectedClient(null)}
            >
              Back to Client List
            </Button>
          )}
          {canDeleteClients && (
            <Link to="/trash">
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
              >
                <Trash2 size={16} />
                Trash ({trashedClients.length})
              </Button>
            </Link>
          )}
          <Button 
            variant="outline" 
            onClick={exportToCSV} 
            className="flex items-center gap-2"
          >
            <FileDown size={16} />
            {t('clients.export')}
          </Button>
        </div>
      </div>
      
      {!selectedClient ? (
        <>
          <ClientFilters
            search={search}
            onSearchChange={setSearch}
            selectedCampaign={selectedCampaign}
            onCampaignChange={setSelectedCampaign}
            campaigns={CAMPAIGNS}
          />
          
          {canDeleteClients && selectedClients.length > 0 && (
            <ClientActionsBar
              selectedCount={selectedClients.length}
              onDeleteSelected={handleDeleteSelected}
            />
          )}
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Clients ({filteredClients.length})</TabsTrigger>
              <TabsTrigger value="high" className="flex gap-1 items-center">
                High Priority ({highUrgencyClients.length})
              </TabsTrigger>
              <TabsTrigger value="medium">Medium ({mediumUrgencyClients.length})</TabsTrigger>
              <TabsTrigger value="low">Low Priority ({lowUrgencyClients.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <ClientsTable
                clients={paginatedClients}
                selectedClients={selectedClients}
                visibleColumns={visibleColumns}
                onSelectClient={setSelectedClient}
                onSelectClientToggle={handleSelectClient}
                onSelectAllInPage={handleSelectAllInPage}
              />
              
              <ClientPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </TabsContent>
            
            <TabsContent value="high">
              <ClientsTable
                clients={highUrgencyClients}
                selectedClients={selectedClients}
                visibleColumns={visibleColumns}
                onSelectClient={setSelectedClient}
                onSelectClientToggle={handleSelectClient}
                onSelectAllInPage={handleSelectAllInPage}
              />
            </TabsContent>
            
            <TabsContent value="medium">
              <ClientsTable
                clients={mediumUrgencyClients}
                selectedClients={selectedClients}
                visibleColumns={visibleColumns}
                onSelectClient={setSelectedClient}
                onSelectClientToggle={handleSelectClient}
                onSelectAllInPage={handleSelectAllInPage}
              />
            </TabsContent>
            
            <TabsContent value="low">
              <ClientsTable
                clients={lowUrgencyClients}
                selectedClients={selectedClients}
                visibleColumns={visibleColumns}
                onSelectClient={setSelectedClient}
                onSelectClientToggle={handleSelectClient}
                onSelectAllInPage={handleSelectAllInPage}
              />
            </TabsContent>
          </Tabs>
        </>
      ) : (
        <ClientDetails 
          client={selectedClient} 
          onClose={() => setSelectedClient(null)}
          onDelete={deleteClient}
        />
      )}
    </div>
  );
};

export default Clients;
