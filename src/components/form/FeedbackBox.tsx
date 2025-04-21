
import React from 'react';

interface FeedbackBoxProps {
  message: string;
  variant?: 'default' | 'warning' | 'info';
}

const FeedbackBox = ({ message, variant = 'default' }: FeedbackBoxProps) => {
  // Choose background color based on variant
  let bgColorClass = 'bg-black';
  let borderColorClass = 'border-[#fcf8c4]';
  let textColorClass = 'text-[#fcf8c4]';
  
  if (variant === 'warning') {
    bgColorClass = 'bg-black';
    borderColorClass = 'border-amber-400/30';
    textColorClass = 'text-amber-400';
  } else if (variant === 'info') {
    bgColorClass = 'bg-black';
    borderColorClass = 'border-blue-400/30';
    textColorClass = 'text-blue-400';
  }
  
  return (
    <div className={`mt-4 p-4 border rounded-md ${bgColorClass} ${borderColorClass} ${textColorClass}`}>
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default FeedbackBox;
