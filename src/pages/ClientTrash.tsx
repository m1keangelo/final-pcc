
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
import { Search, Trash2, RefreshCcw, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ClientData } from "@/types/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
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
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

const ClientTrash = () => {
  const { t } = useLanguage();
  const { trashedClients, restoreClient, permanentlyDeleteClient, emptyTrash } = useData();
  const { hasPermission, isAdmin, isSuperAdmin } = useAuth();
  const [search, setSearch] = useState("");
  const [selectedClients, setSelectedClients] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  
  const canManageTrash = hasPermission('DELETE_CLIENTS') || isAdmin || isSuperAdmin;
  
  const filteredClients = trashedClients.filter(client => {
    const searchTerm = search.toLowerCase();
    return client.name.toLowerCase().includes(searchTerm) || 
           client.phone.toLowerCase().includes(searchTerm) ||
           (client.email?.toLowerCase().includes(searchTerm) || false);
  });
  
  const totalPages = Math.max(1, Math.ceil(filteredClients.length / itemsPerPage));
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  
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
  
  const handleRestoreSelected = () => {
    selectedClients.forEach(id => restoreClient(id));
    toast(`${selectedClients.length} clients were restored`);
    setSelectedClients([]);
  };
  
  const handlePermanentDeleteSelected = () => {
    selectedClients.forEach(id => permanentlyDeleteClient(id));
    toast(`${selectedClients.length} clients were permanently deleted`);
    setSelectedClients([]);
  };
  
  const getDaysRemaining = (deletedAt?: string) => {
    if (!deletedAt) return "Unknown";
    
    const deletedDate = new Date(deletedAt);
    const now = new Date();
    const daysSinceDeleted = Math.floor((now.getTime() - deletedDate.getTime()) / (1000 * 60 * 60 * 24));
    const daysRemaining = 30 - daysSinceDeleted;
    
    return daysRemaining <= 0 ? "Expiring soon" : `${daysRemaining} days`;
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
        <h1 className="text-3xl font-bold">Trash Bin</h1>
        <div className="flex gap-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
              >
                <Trash2 size={16} />
                Empty Trash
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Empty Trash</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to permanently delete all {trashedClients.length} clients in the trash? This action cannot be undone.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={() => {
                    emptyTrash();
                    toast("Trash has been emptied");
                  }}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Empty Trash
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">
            Clients in trash will be permanently deleted after 30 days
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            <p>Items in the trash can be restored or permanently deleted. After 30 days, they will be automatically removed.</p>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input 
            placeholder="Search deleted clients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>
      
      {canManageTrash && selectedClients.length > 0 && (
        <div className="flex justify-between items-center bg-slate-800 p-3 rounded-md">
          <span className="text-white">{selectedClients.length} clients selected</span>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-2"
              onClick={handleRestoreSelected}
            >
              <RefreshCcw size={16} />
              Restore Selected
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" size="sm" className="flex items-center gap-2">
                  <Trash2 size={16} />
                  Delete Permanently
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete Multiple Clients Permanently</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to permanently delete {selectedClients.length} clients? This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handlePermanentDeleteSelected}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Delete Permanently
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}
      
      {trashedClients.length > 0 ? (
        <>
          <div className="border rounded-md overflow-hidden">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox 
                        checked={
                          paginatedClients.length > 0 && 
                          paginatedClients.every(client => selectedClients.includes(client.id))
                        }
                        onCheckedChange={handleSelectAllInPage}
                        aria-label="Select all clients"
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Date Deleted</TableHead>
                    <TableHead>Days Remaining</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedClients.map((client) => (
                    <TableRow 
                      key={client.id} 
                      className={`hover:bg-muted/50 ${selectedClients.includes(client.id) ? 'bg-muted' : ''}`}
                    >
                      <TableCell>
                        <Checkbox 
                          checked={selectedClients.includes(client.id)}
                          onCheckedChange={() => handleSelectClient(client.id)}
                          aria-label={`Select ${client.name}`}
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {client.name}
                      </TableCell>
                      <TableCell>
                        {client.phone}
                      </TableCell>
                      <TableCell>
                        {client.email || '-'}
                      </TableCell>
                      <TableCell>
                        {client.deletedAt ? new Date(client.deletedAt).toLocaleDateString() : 'Unknown'}
                      </TableCell>
                      <TableCell>
                        <Badge variant={
                          getDaysRemaining(client.deletedAt) === "Expiring soon" ? "destructive" : "outline"
                        }>
                          {getDaysRemaining(client.deletedAt)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-green-500 hover:text-green-600 hover:bg-green-50"
                            onClick={() => {
                              restoreClient(client.id);
                              toast(`Client ${client.name} was restored.`);
                            }}
                            title="Restore client"
                          >
                            <RefreshCcw size={16} />
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                title="Delete permanently"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Client Permanently</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to permanently delete {client.name}? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction 
                                  onClick={() => {
                                    permanentlyDeleteClient(client.id);
                                    toast(`Client ${client.name} was permanently deleted.`);
                                  }}
                                  className="bg-red-600 hover:bg-red-700 text-white"
                                >
                                  Delete Permanently
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          
          {totalPages > 1 && (
            <Pagination className="mt-4">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className={currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}
                  />
                </PaginationItem>
                
                {renderPageNumbers()}
                
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className={currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </>
      ) : (
        <div className="text-center py-12 border rounded-lg">
          <AlertCircle className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Trash is Empty</h3>
          <p className="mt-2 text-muted-foreground">No deleted clients found.</p>
        </div>
      )}
    </div>
  );
};

export default ClientTrash;
