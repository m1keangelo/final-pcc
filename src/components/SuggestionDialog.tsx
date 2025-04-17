
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import { ImagePlus } from "lucide-react";

interface SuggestionDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuggestionDialog = ({ isOpen, onClose }: SuggestionDialogProps) => {
  const { t } = useLanguage();
  const [suggestion, setSuggestion] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!suggestion.trim()) {
      toast({
        title: t('common.error'),
        description: t('suggestion.descriptionRequired'),
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
        title: t('suggestion.submitted'),
        description: t('suggestion.thankYou'),
      });
      
      // Reset form
      setSuggestion("");
      setSelectedImage(null);
      onClose();
    } catch (error) {
      toast({
        title: t('common.error'),
        description: t('suggestion.submitError'),
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
            {t('nav.suggestions')}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            {t('suggestion.description') || "Share your suggestions to help us improve the application."}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="suggestion" className="text-sm font-medium text-foreground">
              {t('suggestion.description') || "Your Suggestion"}
            </label>
            <Textarea
              id="suggestion"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              placeholder={t('suggestion.descriptionPlaceholder') || "Describe your suggestion..."}
              className="min-h-[120px] bg-background text-foreground border-border"
              required
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="screenshot" className="text-sm font-medium text-foreground">
              {t('suggestion.screenshot') || "Screenshot"}
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
                {t('suggestion.uploadImage') || "Upload Image"}
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

export default SuggestionDialog;
