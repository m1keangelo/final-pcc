
import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";

interface FeedbackBoxProps {
  message: string;
  messageKey?: string;
  variant?: 'default' | 'warning' | 'info' | 'success' | 'error';
}

const FeedbackBox = ({ message, messageKey, variant = 'default' }: FeedbackBoxProps) => {
  const { t } = useLanguage();
  
  // Base classes for consistent styling
  let baseClasses = "mt-4 p-4 rounded-md font-medium bg-black/50 border";
  
  // Variant-specific styling
  let variantClasses = "border-primary/20 text-primary-foreground";
  
  switch (variant) {
    case 'warning':
      variantClasses = "border-amber-400/30 text-amber-400";
      break;
    case 'info':
      variantClasses = "border-blue-400/30 text-blue-400";
      break;
    case 'success':
      variantClasses = "border-green-400/30 text-green-400";
      break;
    case 'error':
      variantClasses = "border-red-400/30 text-red-400";
      break;
    case 'default':
    default:
      variantClasses = "border-primary/20 text-primary-foreground";
      break;
  }
  
  // Use translation key if provided, otherwise use direct message
  const displayedMessage = messageKey ? t(messageKey) : message;
  
  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      <p className="text-[15px] leading-relaxed">{displayedMessage}</p>
    </div>
  );
};

export default FeedbackBox;
