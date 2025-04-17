import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { Search, FileDown, CheckCircle, XCircle, Clock, AlertTriangle, Phone, ChevronLeft, ChevronRight, Trash2, Check, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ClientData, CAMPAIGNS } from "@/types/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
  PaginationEllipsis
} from "@/components/ui/pagination";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "@/lib/toast";
import { Checkbox } from "@/components/ui/checkbox";

const Clients = () => {
  const { t } = useLanguage();
  const { clients, campaigns, deleteClient } = useData();
  const { hasPermission, isAdmin, isSuperAdmin } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedCampaign, setSelectedCampaign] = useState<string>("all");
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const itemsPerPage = 10;
  
  const canDeleteClients = hasPermission('DELETE_CLIENTS') || isAdmin || isSuperAdmin;
  
  const filteredClients = clients.filter(client => {
    const searchTerm = search.toLowerCase();
    const matchesSearch = client.name.toLowerCase().includes(searchTerm) || 
           client.phone.toLowerCase().includes(searchTerm) ||
           (client.email?.toLowerCase().includes(searchTerm) || false) ||
           (client.comments?.toLowerCase().includes(searchTerm) || false);
           
    const matchesCampaign = selectedCampaign === "all" || client.campaign === selectedCampaign;
    
    return matchesSearch && matchesCampaign;
  });
  
  const totalPages = Math.max(1, Math.ceil(filteredClients.length / itemsPerPage));
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
  const highUrgencyClients = filteredClients.filter(c => c.urgency === 'high');
  const mediumUrgencyClients = filteredClients.filter(c => c.urgency === 'medium');
  const lowUrgencyClients = filteredClients.filter(c => c.urgency === 'low');
  
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
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  const getUrgencyBadge = (urgency?: string) => {
    switch(urgency) {
      case 'high':
        return <Badge variant="destructive" className="flex items-center gap-1"><AlertTriangle size={12} /> High Priority</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="flex items-center gap-1"><Clock size={12} /> Medium</Badge>;
      case 'low':
      default:
        return <Badge variant="outline">Low</Badge>;
    }
  };
  
  const handleSelectClient = (clientId: string) => {
    setSelectedClients(prev => {
      if (prev.includes(clientId)) {
        return prev.filter(id => id !== clientId);
      } else {
        return [...prev, clientId];
      }
    });
  };
  
  const handleSelectAllInPage = () => {
    if (selectedClients.length === paginatedClients.length) {
      setSelectedClients([]);
    } else {
      setSelectedClients(paginatedClients.map(client => client.id));
    }
  };
  
  const handleDeleteSelected = () => {
    selectedClients.forEach(id => deleteClient(id));
    toast(`${selectedClients.length} clients were deleted`);
    setSelectedClients([]);
  };
  
  const renderPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <PaginationItem key={i}>
          <PaginationLink 
            isActive={i === currentPage}
            onClick={() => setCurrentPage(i)}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return pages;
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
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input 
                placeholder={t('clients.search')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="w-full md:w-64">
              <Select 
                value={selectedCampaign} 
                onValueChange={setSelectedCampaign}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by Campaign" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Campaigns</SelectItem>
                  {CAMPAIGNS.map(campaign => (
                    <SelectItem key={campaign} value={campaign}>
                      {campaign}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {canDeleteClients && selectedClients.length > 0 && (
            <div className="flex justify-between items-center bg-slate-800 p-3 rounded-md">
              <span className="text-white">{selectedClients.length} clients selected</span>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive" size="sm" className="flex items-center gap-2">
                    <Trash2 size={16} />
                    Delete Selected
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Multiple Clients</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete {selectedClients.length} clients? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDeleteSelected}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          )}
          
          <Tabs defaultValue="all">
            <TabsList className="mb-4">
              <TabsTrigger value="all">All Clients ({filteredClients.length})</TabsTrigger>
              <TabsTrigger value="high" className="flex gap-1 items-center">
                <AlertTriangle size={14} /> High Priority ({highUrgencyClients.length})
              </TabsTrigger>
              <TabsTrigger value="medium">Medium ({mediumUrgencyClients.length})</TabsTrigger>
              <TabsTrigger value="low">Low Priority ({lowUrgencyClients.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              {renderClientTable(paginatedClients)}
              {totalPages > 1 && (
                <Pagination className="mt-4">
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationFirst
                        onClick={() => setCurrentPage(1)}
                        className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                      />
                    </PaginationItem>
                    
                    <PaginationItem>
                      <PaginationPrevious
                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                        className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                      />
                    </PaginationItem>
                    
                    {currentPage > 3 && (
                      <>
                        <PaginationItem>
                          <PaginationLink onClick={() => setCurrentPage(1)}>
                            1
                          </PaginationLink>
                        </PaginationItem>
                        
                        {currentPage > 4 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                      </>
                    )}
                    
                    {renderPageNumbers()}
                    
                    {currentPage < totalPages - 2 && (
                      <>
                        {currentPage < totalPages - 3 && (
                          <PaginationItem>
                            <PaginationEllipsis />
                          </PaginationItem>
                        )}
                        
                        <PaginationItem>
                          <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                            {totalPages}
                          </PaginationLink>
                        </PaginationItem>
                      </>
                    )}
                    
                    <PaginationItem>
                      <PaginationNext
                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                        className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                      />
                    </PaginationItem>
                    
                    <PaginationItem>
                      <PaginationLast
                        onClick={() => setCurrentPage(totalPages)}
                        className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              )}
            </TabsContent>
            <TabsContent value="high">
              {renderClientTable(highUrgencyClients)}
            </TabsContent>
            <TabsContent value="medium">
              {renderClientTable(mediumUrgencyClients)}
            </TabsContent>
            <TabsContent value="low">
              {renderClientTable(lowUrgencyClients)}
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
  
  function renderClientTable(clients: ClientData[]) {
    if (clients.length === 0) {
      return (
        <div className="text-center py-8">
          <p className="text-muted-foreground">{t('clients.noResults')}</p>
        </div>
      );
    }
    
    return (
      <div className="border rounded-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                {canDeleteClients && (
                  <TableHead className="w-12">
                    <Checkbox 
                      checked={
                        clients.length > 0 && 
                        clients.every(client => selectedClients.includes(client.id))
                      }
                      onCheckedChange={handleSelectAllInPage}
                      aria-label="Select all clients"
                    />
                  </TableHead>
                )}
                <TableHead>{t('clients.column.name')}</TableHead>
                <TableHead>{t('clients.column.phone')}</TableHead>
                <TableHead>{t('clients.column.credit')}</TableHead>
                <TableHead>{t('clients.column.status')}</TableHead>
                <TableHead>Campaign</TableHead>
                <TableHead>{t('clients.column.timeline')}</TableHead>
                <TableHead>{t('clients.column.urgency')}</TableHead>
                <TableHead className="w-1/6">{t('clients.column.nextSteps')}</TableHead>
                {canDeleteClients && <TableHead className="w-12">Actions</TableHead>}
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow 
                  key={client.id} 
                  className={`hover:bg-muted/50 ${selectedClients.includes(client.id) ? 'bg-muted' : ''}`}
                >
                  {canDeleteClients && (
                    <TableCell>
                      <Checkbox 
                        checked={selectedClients.includes(client.id)}
                        onCheckedChange={() => handleSelectClient(client.id)}
                        aria-label={`Select ${client.name}`}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </TableCell>
                  )}
                  <TableCell 
                    className="font-medium flex items-center gap-2 cursor-pointer"
                    onClick={() => setSelectedClient(client)}
                  >
                    {client.qualified ? 
                      <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> : 
                      <XCircle size={16} className="text-red-500 flex-shrink-0" />
                    }
                    {client.name}
                  </TableCell>
                  <TableCell 
                    className="cursor-pointer"
                    onClick={() => setSelectedClient(client)}
                  >
                    {client.phone}
                  </TableCell>
                  <TableCell 
                    className="cursor-pointer"
                    onClick={() => setSelectedClient(client)}
                  >
                    <Badge variant={
                      client.creditCategory === 'Excellent' ? 'default' :
                      client.creditCategory === 'Good' ? 'outline' :
                      client.creditCategory === 'Fair' ? 'secondary' : 'destructive'
                    }>
                      {client.creditCategory}
                      {client.creditScoreApprox && ` (${client.creditScoreApprox})`}
                    </Badge>
                  </TableCell>
                  <TableCell 
                    className="cursor-pointer"
                    onClick={() => setSelectedClient(client)}
                  >
                    {client.legalStatus}
                  </TableCell>
                  <TableCell 
                    className="cursor-pointer"
                    onClick={() => setSelectedClient(client)}
                  >
                    {client.campaign || "Default Campaign"}
                  </TableCell>
                  <TableCell 
                    className="cursor-pointer"
                    onClick={() => setSelectedClient(client)}
                  >
                    {client.timeline === 'immediately' ? 'Immediately' :
                     client.timeline === '3months' ? '< 3 months' :
                     client.timeline === '3to6months' ? '3-6 months' :
                     client.timeline === '6to12months' ? '6-12 months' :
                     client.timeline === 'exploring' ? 'Exploring' : 'Unknown'}
                  </TableCell>
                  <TableCell 
                    className="cursor-pointer"
                    onClick={() => setSelectedClient(client)}
                  >
                    {getUrgencyBadge(client.urgency)}
                  </TableCell>
                  <TableCell 
                    className="max-w-xs truncate cursor-pointer"
                    onClick={() => setSelectedClient(client)}
                  >
                    {client.nextSteps || '-'}
                  </TableCell>
                  {canDeleteClients && (
                    <TableCell>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Trash2 size={16} />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Delete Client</AlertDialogTitle>
                            <AlertDialogDescription>
                              Are you sure you want to delete {client.name}? This action cannot be undone.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction 
                              onClick={() => {
                                deleteClient(client.id);
                                toast(`Client ${client.name} was deleted.`);
                              }}
                              className="bg-red-600 hover:bg-red-700 text-white"
                            >
                              Delete
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  )}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  }
};

interface ClientDetailsProps {
  client: ClientData;
  onClose: () => void;
  onDelete: (id: string) => void;
}

const ClientDetails = ({ client, onClose, onDelete }: ClientDetailsProps) => {
  const { hasPermission } = useAuth();
  const canDelete = hasPermission('DELETE_CLIENTS');
  
  const handleDelete = () => {
    onDelete(client.id);
    toast.success(`Client ${client.name} was deleted.`);
    onClose();
  };
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-2xl font-bold">{client.name}</CardTitle>
          <div className="flex items-center gap-3">
            {client.urgency && (
              <Badge variant={
                client.urgency === 'high' ? 'destructive' : 
                client.urgency === 'medium' ? 'secondary' : 
                'outline'
              }>
                {client.urgency === 'high' ? 'High Priority' : 
                 client.urgency === 'medium' ? 'Medium Priority' : 
                 'Low Priority'}
              </Badge>
            )}
            {client.qualified ? 
              <Badge variant="outline" className="bg-green-600/10 text-green-600 border-green-600">Qualified</Badge> :
              <Badge variant="outline" className="bg-red-600/10 text-red-600 border-red-600">Not Qualified</Badge>
            }
            
            {canDelete && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="ml-2 h-9 w-9 text-red-500 hover:text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Client</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete {client.name}? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction 
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-muted-foreground" />
                  <p>{client.phone}</p>
                </div>
                <p><strong>Email:</strong> {client.email || 'Not provided'}</p>
                <p><strong>Agent:</strong> {client.agent || 'Not assigned'}</p>
                <p><strong>Campaign:</strong> {client.campaign || 'Default Campaign'}</p>
                <p><strong>Added:</strong> {new Date(client.createdDate).toLocaleDateString()}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Financial Profile</h3>
              <div className="space-y-2">
                <p><strong>Employment:</strong> {client.employmentType} 
                  {client.selfEmployedYears ? ` (Self-employed ${client.selfEmployedYears} years)` : ''}
                </p>
                <p><strong>Annual Income:</strong> ${client.incomeAnnual.toLocaleString()}</p>
                <p><strong>Monthly Debts:</strong> {client.monthlyDebts || 'Not provided'}</p>
                <p>
                  <strong>Credit:</strong> {client.creditCategory} 
                  {client.creditScoreApprox ? ` (Score: ~${client.creditScoreApprox})` : ''}
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Home Buying Profile</h3>
              <div className="space-y-2">
                <p><strong>Timeline:</strong> {
                  client.timeline === 'immediately' ? 'Immediately' :
                  client.timeline === '3months' ? 'Within 3 months' :
                  client.timeline === '3to6months' ? '3-6 months' :
                  client.timeline === '6to12months' ? '6-12 months' :
                  client.timeline === 'exploring' ? 'Just exploring' : 'Not specified'
                }</p>
                <p><strong>First Time Buyer:</strong> {
                  client.firstTimeBuyer === true ? 'Yes' :
                  client.firstTimeBuyer === false ? 'No' : 'Not specified'
                }</p>
                <p><strong>Down Payment:</strong> {
                  client.downPaymentSaved ? 
                    (client.downPaymentAmount ? `$${client.downPaymentAmount.toLocaleString()} saved` : 'Has savings') : 
                    'No savings'
                }</p>
                {!client.downPaymentSaved && <p><strong>Assistance Interest:</strong> {client.assistanceInterested ? 'Yes' : 'No'}</p>}
              </div>
            </div>
          </div>
          
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-medium">Action Items</h3>
            <div className="p-4 bg-muted rounded-lg">
              <p className="font-medium text-foreground">Next Steps:</p>
              <p className="mt-1">{client.nextSteps || 'No specific actions defined'}</p>
            </div>
          </div>
          
          {client.creditIssues?.hasCreditIssues && (
            <div className="mt-6 p-4 bg-red-500/10 border border-red-300 rounded-lg">
              <h3 className="text-lg font-medium text-red-600">Credit Issues</h3>
              <p className="mt-2">{client.creditIssues.details || 'Credit issues reported, details not available'}</p>
            </div>
          )}
          
          {client.comments && (
            <div className="mt-6 space-y-2">
              <h3 className="text-lg font-medium">Comments</h3>
              <div className="p-4 bg-muted rounded-lg whitespace-pre-line">
                {client.comments}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Clients;
