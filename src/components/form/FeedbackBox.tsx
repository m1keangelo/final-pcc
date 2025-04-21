
import React from 'react';

interface FeedbackBoxProps {
  message: string;
}

const FeedbackBox = ({ message }: FeedbackBoxProps) => {
  return (
    <div 
      className="mt-4 bg-[#1A1F2C] border border-[#FEF7CD]/30 rounded-lg p-4 text-[#FEF7CD] shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
      style={{
        backgroundColor: "#1A1F2C",
        borderColor: "rgba(254, 247, 205, 0.3)",
        color: "#FEF7CD",
        borderWidth: "1px",
        borderRadius: "0.5rem",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3)"
      }}
    >
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default FeedbackBox;
