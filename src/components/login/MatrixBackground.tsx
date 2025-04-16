
import React from 'react';

const MatrixBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden opacity-100">
      {Array.from({ length: 20 }).map((_, i) => (
        <div 
          key={i} 
          className="matrix-code text-xs absolute animate-fade-in"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 2}s`,
            color: '#690dac',
            textShadow: '0 0 5px #690dac',
            opacity: 1
          }}
        >
          {Array.from({ length: 20 }).map((_, j) => (
            <div key={j}>
              {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default MatrixBackground;
