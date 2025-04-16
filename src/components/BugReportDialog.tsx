
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { ImageUpload } from "lucide-react";

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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">{t('bugReport.title')}</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              {t('bugReport.description')}
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('bugReport.descriptionPlaceholder')}
              className="min-h-[120px]"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="screenshot" className="text-sm font-medium">
              {t('bugReport.screenshot')}
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
                <ImageUpload className="mr-2 h-4 w-4" />
                {t('bugReport.uploadImage')}
              </Button>
              {selectedImage && (
                <span className="text-sm text-gray-500">
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
