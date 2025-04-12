
import { useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { HelpCircle, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

interface QuestionHelpProps {
  questionId: string;
  helpLink?: string;
}

const QuestionHelp = ({ questionId, helpLink = "#" }: QuestionHelpProps) => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(helpLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 rounded-full text-gallopurple hover:text-gallopurple-dark hover:bg-gallopurple/10"
              onClick={() => setIsOpen(true)}
            >
              <HelpCircle size={18} />
              <span className="sr-only">Help</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>{t('help.title')}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {t('help.title')}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <p className="text-sm text-muted-foreground">
              {t(`help.${questionId}`)}
            </p>

            {/* Sample image for help content */}
            <div className="rounded-md overflow-hidden bg-secondary/50 p-4 flex justify-center">
              <img 
                src={`/help-${questionId}-${language}.png`} 
                alt="Help content"
                className="max-h-40 object-contain opacity-70"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
            </div>

            {/* Copy link button */}
            <div className="flex justify-end pt-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-2"
                onClick={handleCopyLink}
              >
                {copied ? (
                  <>
                    <Check size={16} />
                    {t('help.linkCopied')}
                  </>
                ) : (
                  <>
                    <Copy size={16} />
                    {t('help.copyLink')}
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuestionHelp;
