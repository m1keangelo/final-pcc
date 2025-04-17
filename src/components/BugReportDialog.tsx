
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { ImagePlus } from "lucide-react";

interface BugReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const BugReportDialog = ({ isOpen, onClose }: BugReportDialogProps) => {
  const { t } = useLanguage();
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      toast({
        title: t('common.error'),
        description: t('bugReport.descriptionRequired'),
        variant: "destructive"
      });
      return;
    }

    try {
      setIsSubmitting(true);
      
      // Here would be the code to submit to a database
      // For now we'll just simulate a submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: t('bugReport.submitted'),
        description: t('bugReport.thankYou'),
      });
      
      // Reset form
      setDescription("");
      setSelectedImage(null);
      onClose();
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('bugReport.submitError'),
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-card border-border text-foreground">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-foreground">
            {t('nav.reportBug')}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {t('bugReport.description') || "Report any issues you've encountered while using the application."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium text-foreground">
              {t('bugReport.description')}
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('bugReport.descriptionPlaceholder') || "Describe the issue you encountered..."}
              className="min-h-[120px] bg-background text-foreground border-border"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="screenshot" className="text-sm font-medium text-foreground">
              {t('bugReport.screenshot') || "Screenshot"}
            </label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="relative overflow-hidden"
                onClick={() => document.getElementById('screenshot')?.click()}
              >
                <input
                  id="screenshot"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
                <ImagePlus className="mr-2 h-4 w-4" />
                {t('bugReport.uploadImage') || "Upload Image"}
              </Button>
              {selectedImage && (
                <span className="text-sm text-muted-foreground">
                  {selectedImage.name}
                </span>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              {t('common.cancel')}
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? t('common.submitting') : t('common.submit')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BugReportDialog;
