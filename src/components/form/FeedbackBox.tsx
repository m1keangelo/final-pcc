
import React from 'react';

interface FeedbackBoxProps {
  message: string;
}

const FeedbackBox = ({ message }: FeedbackBoxProps) => {
  return (
    <div className="feedback-box">
      <p className="font-medium">{message}</p>
    </div>
  );
};

export default FeedbackBox;
