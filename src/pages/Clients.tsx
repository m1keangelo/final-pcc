
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useData } from "@/contexts/DataContext";
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
import { Search, FileDown, CheckCircle, XCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Clients = () => {
  const { t } = useLanguage();
  const { clients } = useData();
  const [search, setSearch] = useState("");
  
  // Filter clients by search term
  const filteredClients = clients.filter(client => {
    const searchTerm = search.toLowerCase();
    return client.name.toLowerCase().includes(searchTerm) || 
           client.phone.toLowerCase().includes(searchTerm) ||
           (client.comments?.toLowerCase().includes(searchTerm) || false);
  });
  
  // Export to CSV function
  const exportToCSV = () => {
    const headers = [
      "Name", 
      "Phone", 
      "Employment Type", 
      "Income", 
      "Credit", 
      "Credit Score", 
      "Down Payment", 
      "Down Payment Amount", 
      "Legal Status", 
      "Qualified", 
      "Date", 
      "Comments"
    ];
    
    const rows = filteredClients.map(c => [
      c.name,
      c.phone,
      c.employmentType,
      `$${c.incomeAnnual.toLocaleString()}`,
      c.creditCategory,
      c.creditScoreApprox || 'N/A',
      c.downPaymentSaved ? 'Yes' : 'No',
      c.downPaymentAmount ? `$${c.downPaymentAmount.toLocaleString()}` : 'N/A',
      c.legalStatus,
      c.qualified ? 'Yes' : 'No',
      new Date(c.createdDate).toLocaleDateString(),
      c.comments || ''
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
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };
  
  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">{t('clients.title')}</h1>
        <Button 
          variant="outline" 
          onClick={exportToCSV} 
          className="flex items-center gap-2"
        >
          <FileDown size={16} />
          {t('clients.export')}
        </Button>
      </div>
      
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input 
          placeholder={t('clients.search')}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {filteredClients.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-muted-foreground">{t('clients.noResults')}</p>
        </div>
      ) : (
        <div className="border rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('clients.column.name')}</TableHead>
                  <TableHead>{t('clients.column.phone')}</TableHead>
                  <TableHead>{t('clients.column.credit')}</TableHead>
                  <TableHead>{t('clients.column.status')}</TableHead>
                  <TableHead>{t('clients.column.downpayment')}</TableHead>
                  <TableHead>{t('clients.column.date')}</TableHead>
                  <TableHead className="w-1/4">{t('clients.column.comments')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium flex items-center gap-2">
                      {client.qualified ? 
                        <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> : 
                        <XCircle size={16} className="text-red-500 flex-shrink-0" />
                      }
                      {client.name}
                    </TableCell>
                    <TableCell>{client.phone}</TableCell>
                    <TableCell>
                      <Badge variant={
                        client.creditCategory === 'Excellent' ? 'default' :
                        client.creditCategory === 'Good' ? 'outline' :
                        client.creditCategory === 'Fair' ? 'secondary' : 'destructive'
                      }>
                        {client.creditCategory}
                        {client.creditScoreApprox && ` (${client.creditScoreApprox})`}
                      </Badge>
                    </TableCell>
                    <TableCell>{client.legalStatus}</TableCell>
                    <TableCell>
                      {client.downPaymentSaved ? (
                        client.downPaymentAmount ? 
                          `$${client.downPaymentAmount.toLocaleString()}` : 
                          'Yes'
                      ) : 'No'}
                    </TableCell>
                    <TableCell>{formatDate(client.createdDate)}</TableCell>
                    <TableCell className="max-w-xs truncate">
                      {client.comments || '-'}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clients;
