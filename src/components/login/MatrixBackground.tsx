
import React, { useEffect, useState } from 'react';

const MatrixBackground = () => {
  const [matrixElements, setMatrixElements] = useState<JSX.Element[]>([]);
  
  useEffect(() => {
    // Create matrix code elements with staggered animation
    const elements = Array.from({ length: 30 }).map((_, i) => (
      <div 
        key={i} 
        className="matrix-code text-xs absolute animate-fade-in"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 2}s`,
          opacity: 0.4 + Math.random() * 0.4,
          animationDuration: `${10 + Math.random() * 20}s`,
          filter: `blur(${Math.random() < 0.3 ? '1px' : '0px'})`
        }}
      >
        {Array.from({ length: Math.floor(10 + Math.random() * 15) }).map((_, j) => (
          <div 
            key={j}
            style={{ 
              color: `rgba(155, 135, 245, ${0.4 + Math.random() * 0.6})`,
              textShadow: '0 0 8px rgba(105, 13, 172, 0.8)',
              transform: `scale(${0.8 + Math.random() * 0.5})`
            }}
          >
            {String.fromCharCode(33 + Math.floor(Math.random() * 94))}
          </div>
        ))}
      </div>
    ));
    
    setMatrixElements(elements);
  }, []);
  
  return (
    <div className="absolute inset-0 overflow-hidden opacity-90 pointer-events-none">
      {matrixElements}
    </div>
  );
};

export default MatrixBackground;
