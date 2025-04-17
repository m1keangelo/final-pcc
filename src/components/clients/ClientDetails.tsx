
import React from "react";
import { ClientData } from "@/types/client";
import { useAuth } from "@/contexts/AuthContext";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, Trash2 } from "lucide-react";
import { toast } from "@/lib/toast";
import { StatusTracker } from "@/components/StatusTracker";

interface ClientDetailsProps {
  client: ClientData;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export const ClientDetails = ({ client, onClose, onDelete }: ClientDetailsProps) => {
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
          
          <div className="mt-8">
            <StatusTracker client={client} />
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
