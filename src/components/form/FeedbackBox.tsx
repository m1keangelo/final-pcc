
import React from 'react';

interface FeedbackBoxProps {
  message: string;
  variant?: 'default' | 'warning' | 'info' | 'success' | 'error';
}

const FeedbackBox = ({ message, variant = 'default' }: FeedbackBoxProps) => {
  // Base classes for consistent styling
  let baseClasses = "mt-4 p-4 border rounded-md font-medium";
  
  // Variant-specific styling
  let variantClasses = "";
  
  switch (variant) {
    case 'warning':
      variantClasses = "bg-black border-amber-400/30 text-amber-400";
      break;
    case 'info':
      variantClasses = "bg-black border-blue-400/30 text-blue-400";
      break;
    case 'success':
      variantClasses = "bg-black border-green-400/30 text-green-400";
      break;
    case 'error':
      variantClasses = "bg-black border-red-400/30 text-red-400";
      break;
    case 'default':
    default:
      variantClasses = "bg-black border-[#fcf8c4]/30 text-[#fcf8c4]";
      break;
  }
  
  return (
    <div className={`${baseClasses} ${variantClasses}`}>
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default FeedbackBox;
