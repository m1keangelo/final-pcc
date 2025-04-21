
import React from 'react';

interface FeedbackBoxProps {
  message: string;
}

const FeedbackBox = ({ message }: FeedbackBoxProps) => {
  return (
    <div 
      className="mt-4 p-4 bg-black/75 border border-[#FEF7CD]/30 rounded-lg text-[#FEF7CD] shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        borderColor: "rgba(254, 247, 205, 0.3)",
        color: "#FEF7CD",
      }}
    >
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default FeedbackBox;
