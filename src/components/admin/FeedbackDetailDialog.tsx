
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FeedbackItem } from "./FeedbackManagement";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

interface FeedbackDetailDialogProps {
  isOpen: boolean;
  onClose: () => void;
  feedback: FeedbackItem | null;
}

const FeedbackDetailDialog = ({ isOpen, onClose, feedback }: FeedbackDetailDialogProps) => {
  if (!feedback) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold">
              {feedback.type === 'bug' ? 'Bug Report' : 'Suggestion'}
            </DialogTitle>
            <Badge variant={feedback.type === 'bug' ? 'destructive' : 'default'}>
              {feedback.type}
            </Badge>
          </div>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Sender Info */}
          <div className="flex items-center space-x-3 pb-4 border-b border-purple-500/30">
            <Avatar>
              <AvatarFallback>{feedback.user?.name?.[0] || 'U'}</AvatarFallback>
              <AvatarImage src={feedback.user?.avatar} />
            </Avatar>
            <div>
              <p className="font-medium">{feedback.user?.name || 'Unknown User'}</p>
              <p className="text-sm text-gray-400">{format(new Date(feedback.timestamp), 'PPP p')}</p>
            </div>
          </div>
          
          {/* Message Content */}
          <div className="space-y-4">
            <p className="text-gray-200 whitespace-pre-wrap">{feedback.description}</p>
            
            {/* Image Preview */}
            {feedback.imageUrl && (
              <div className="mt-4 rounded-lg overflow-hidden border border-purple-500/30">
                <img 
                  src={feedback.imageUrl} 
                  alt="Feedback attachment" 
                  className="w-full max-h-[400px] object-contain bg-black/50"
                />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FeedbackDetailDialog;
