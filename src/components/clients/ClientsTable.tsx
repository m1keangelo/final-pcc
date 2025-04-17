
import { useState } from "react";
import { ClientData, ClientColumnId } from "@/types/client";
import { useAuth } from "@/contexts/AuthContext";
import { useData } from "@/contexts/DataContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  Table, 
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow 
} from "@/components/ui/table";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Trash2, CheckCircle, XCircle, AlertTriangle, Clock, Search, Home, FileCheck } from "lucide-react";
import { toast } from "@/lib/toast";
import { format } from "date-fns";

interface ClientsTableProps {
  clients: ClientData[];
  selectedClients: string[];
  visibleColumns: ClientColumnId[];
  onSelectClient: (client: ClientData) => void;
  onSelectClientToggle: (clientId: string) => void;
  onSelectAllInPage: () => void;
}

export const ClientsTable = ({ 
  clients, 
  selectedClients, 
  visibleColumns, 
  onSelectClient,
  onSelectClientToggle,
  onSelectAllInPage
}: ClientsTableProps) => {
  const { t } = useLanguage();
  const { hasPermission, isAdmin, isSuperAdmin } = useAuth();
  const { deleteClient } = useData();
  
  const canDeleteClients = hasPermission('DELETE_CLIENTS') || isAdmin || isSuperAdmin;
  
  if (clients.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">{t('clients.noResults')}</p>
      </div>
    );
  }
  
  const getColumnValue = (client: ClientData, columnId: ClientColumnId) => {
    switch(columnId) {
      case 'name':
        return (
          <div className="font-medium flex items-center gap-2 cursor-pointer">
            {client.qualified ? 
              <CheckCircle size={16} className="text-green-500 flex-shrink-0" /> : 
              <XCircle size={16} className="text-red-500 flex-shrink-0" />
            }
            {client.name}
          </div>
        );
      case 'phone':
        return client.phone;
      case 'email':
        return client.email || 'N/A';
      case 'agent':
        return client.agent || 'Not assigned';
      case 'campaign':
        return client.campaign || 'Default Campaign';
      case 'employmentType':
        return client.employmentType;
      case 'incomeAnnual':
        return `$${client.incomeAnnual.toLocaleString()}`;
      case 'creditCategory':
        return (
          <Badge variant={
            client.creditCategory === 'Excellent' ? 'default' :
            client.creditCategory === 'Good' ? 'outline' :
            client.creditCategory === 'Fair' ? 'secondary' : 'destructive'
          }>
            {client.creditCategory}
            {client.creditScoreApprox && ` (${client.creditScoreApprox})`}
          </Badge>
        );
      case 'downPaymentSaved':
        return client.downPaymentSaved ? 'Yes' : 'No';
      case 'timeline':
        return client.timeline === 'immediately' ? 'Immediately' :
               client.timeline === '3months' ? '< 3 months' :
               client.timeline === '3to6months' ? '3-6 months' :
               client.timeline === '6to12months' ? '6-12 months' :
               client.timeline === 'exploring' ? 'Exploring' : 'Unknown';
      case 'firstTimeBuyer':
        return client.firstTimeBuyer === true ? 'Yes' : 
               client.firstTimeBuyer === false ? 'No' : 'Unknown';
      case 'legalStatus':
        return client.legalStatus;
      case 'qualified':
        return client.qualified ? 'Yes' : 'No';
      case 'urgency':
        return getUrgencyBadge(client.urgency);
      case 'nextSteps':
        return (
          <span className="max-w-xs truncate block">
            {client.nextSteps || '-'}
          </span>
        );
      case 'journeyStatus':
        return getJourneyStatusBadge(client.journeyStatus);
      case 'anticipatedClosingDate':
        return client.anticipatedClosingDate ? 
          format(new Date(client.anticipatedClosingDate), "MMM d, yyyy") : 
          'Not set';
      default:
        return 'N/A';
    }
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
  
  const getJourneyStatusBadge = (status?: string) => {
    switch(status) {
      case 'docCollection':
        return <Badge variant="outline" className="flex items-center gap-1"><FileCheck size={12} /> Doc Collection</Badge>;
      case 'searching':
        return <Badge variant="secondary" className="flex items-center gap-1"><Search size={12} /> Searching</Badge>;
      case 'underContract':
        return <Badge variant="default" className="flex items-center gap-1"><Home size={12} /> Under Contract</Badge>;
      case 'closed':
        return <Badge variant="success" className="bg-green-600 text-white flex items-center gap-1"><CheckCircle size={12} /> Closed</Badge>;
      default:
        return <Badge variant="outline">Not Started</Badge>;
    }
  };
  
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
                    onCheckedChange={onSelectAllInPage}
                    aria-label="Select all clients"
                  />
                </TableHead>
              )}
              
              {visibleColumns.map(columnId => {
                const column = CLIENT_COLUMNS.find(col => col.id === columnId);
                return (
                  <TableHead key={columnId}>
                    {column?.label || columnId}
                  </TableHead>
                );
              })}

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
                      onCheckedChange={() => onSelectClientToggle(client.id)}
                      aria-label={`Select ${client.name}`}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </TableCell>
                )}
                
                {visibleColumns.map(columnId => (
                  <TableCell 
                    key={`${client.id}-${columnId}`}
                    className="cursor-pointer"
                    onClick={() => onSelectClient(client)}
                  >
                    {getColumnValue(client, columnId)}
                  </TableCell>
                ))}
                
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
};

import { CLIENT_COLUMNS } from "@/types/client";
