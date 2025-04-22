
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trash2, Mail, Check, Search, Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import FeedbackDetailDialog from "./FeedbackDetailDialog";

export interface FeedbackItem {
  id: string;
  type: 'bug' | 'suggestion';
  description: string;
  timestamp: string;
  status: 'new' | 'read' | 'resolved';
  imageUrl?: string;
  user?: {
    name: string;
    avatar?: string;
  };
}

interface FeedbackManagementProps {
  feedbackItems: FeedbackItem[];
  onMarkAsRead: (id: string) => void;
  onResolve: (id: string) => void;
  onDelete: (id: string) => void;
}

const FeedbackManagement: React.FC<FeedbackManagementProps> = ({
  feedbackItems,
  onMarkAsRead,
  onResolve,
  onDelete
}) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFeedback, setSelectedFeedback] = useState<FeedbackItem | null>(null);
  
  const filteredItems = feedbackItems.filter(item => 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  const bugs = filteredItems.filter(item => item.type === 'bug');
  const suggestions = filteredItems.filter(item => item.type === 'suggestion');

  const renderFeedbackTable = (items: FeedbackItem[]) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>From</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="w-[120px]">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.length > 0 ? (
          items.map(item => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {item.user?.name || 'Unknown User'}
              </TableCell>
              <TableCell className="max-w-md truncate">
                {item.description}
              </TableCell>
              <TableCell>
                {new Date(item.timestamp).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Badge variant={
                  item.status === 'new' ? 'outline' :
                  item.status === 'read' ? 'secondary' : 'success'
                }>
                  {item.status}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button 
                    size="sm" 
                    variant="ghost"
                    title="View Details"
                    onClick={() => setSelectedFeedback(item)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  {item.status === 'new' && (
                    <Button 
                      size="sm" 
                      variant="ghost"
                      title="Mark as Read"
                      onClick={() => onMarkAsRead(item.id)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                  )}
                  {item.status !== 'resolved' && (
                    <Button 
                      size="sm" 
                      variant="ghost"
                      title="Mark as Resolved"
                      onClick={() => onResolve(item.id)}
                    >
                      <Check className="h-4 w-4" />
                    </Button>
                  )}
                  <Button 
                    size="sm" 
                    variant="ghost"
                    title="Delete"
                    onClick={() => onDelete(item.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center py-4 text-muted-foreground">
              No items found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle>Feedback Management</CardTitle>
          <div className="flex gap-2">
            <Badge variant="destructive">
              {bugs.filter(item => item.status === 'new').length} new bugs
            </Badge>
            <Badge variant="default">
              {suggestions.filter(item => item.status === 'new').length} new suggestions
            </Badge>
          </div>
        </div>
        <CardDescription>
          Manage bug reports and feature suggestions
        </CardDescription>
        <div className="relative max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search feedback..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="bugs" className="w-full">
          <TabsList className="w-full max-w-md mb-4">
            <TabsTrigger value="bugs" className="flex-1">Bug Reports</TabsTrigger>
            <TabsTrigger value="suggestions" className="flex-1">Suggestions</TabsTrigger>
          </TabsList>
          <TabsContent value="bugs">
            {renderFeedbackTable(bugs)}
          </TabsContent>
          <TabsContent value="suggestions">
            {renderFeedbackTable(suggestions)}
          </TabsContent>
        </Tabs>
      </CardContent>

      <FeedbackDetailDialog 
        isOpen={!!selectedFeedback}
        onClose={() => setSelectedFeedback(null)}
        feedback={selectedFeedback}
      />
    </Card>
  );
};

export default FeedbackManagement;
