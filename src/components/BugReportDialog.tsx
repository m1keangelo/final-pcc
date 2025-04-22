import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/lib/toast";
import { ImagePlus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface BugReportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const BugReportDialog = ({ isOpen, onClose }: BugReportDialogProps) => {
  const { t } = useLanguage();
  const { addFeedbackItem } = useAuth();
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim()) {
      toast(`${t('common.error')} - ${t('bugReport.descriptionRequired')}`);
      return;
    }

    try {
      setIsSubmitting(true);
      
      let imageUrl = undefined;
      if (selectedImage) {
        imageUrl = URL.createObjectURL(selectedImage);
        console.log("Image prepared for upload:", imageUrl);
      }
      
      const user = {
        name: 'John Doe',
        avatar: 'https://api.dicebear.com/7.x/avatars/svg?seed=John'
      };
      
      await addFeedbackItem('bug', description, imageUrl, user);
      
      toast(`${t('bugReport.submitted')} - ${t('bugReport.thankYou')}`);
      
      setDescription("");
      setSelectedImage(null);
      onClose();
    } catch (error) {
      toast(`${t('common.error')} - ${t('bugReport.submitError')}`);
      console.error("Error submitting bug report:", error);
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
          <DialogDescription className="text-gray-400">
            {t('bugReport.description')}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder={t('bugReport.descriptionPlaceholder')}
              className="min-h-[120px] bg-black/50 border-purple-500/30 focus:border-purple-400"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="screenshot-bug" className="text-sm font-medium">
              {t('bugReport.screenshot')}
            </label>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                className="relative overflow-hidden bg-black/30 border-purple-500/30 hover:bg-purple-900/20"
                onClick={() => document.getElementById('screenshot-bug')?.click()}
              >
                <input
                  id="screenshot-bug"
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                  onChange={handleImageChange}
                />
                <ImagePlus className="mr-2 h-4 w-4" />
                {t('bugReport.uploadImage')}
              </Button>
              {selectedImage && (
                <span className="text-sm text-gray-300">
                  {selectedImage.name}
                </span>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="bg-black/30 border-purple-500/30 hover:bg-purple-900/20"
            >
              {t('common.cancel')}
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-gradient-to-r from-purple-700 to-blue-500 hover:from-purple-600 hover:to-blue-400"
            >
              {isSubmitting ? t('common.submitting') : t('common.submit')}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default BugReportDialog;
