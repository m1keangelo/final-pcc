
import React, { useEffect, useState } from 'react';

const roosterImages = [
  '/lovable-uploads/524015be-1f70-4615-8439-30dadb0fad2e.png',
  '/lovable-uploads/136b55d2-1bd5-4f8e-8fb3-4d0bbf8f0b34.png',
  '/lovable-uploads/02deb32f-a4e2-4cdc-9fcc-be416e1a6523.png',
  '/lovable-uploads/f53a4f4b-40a3-45bd-9576-b17e9033a854.png'
];

const randomAngle = () => Math.floor(Math.random() * 10) - 5; // Random angle between -5 and 5 degrees

const RotatingMascot: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    // Change image every 5 seconds
    const imageInterval = setInterval(() => {
      setCurrentImageIndex(prevIndex => (prevIndex + 1) % roosterImages.length);
      setRotation(randomAngle());
    }, 5000);

    return () => clearInterval(imageInterval);
  }, []);

  return (
    <div className="relative w-4/5 lg:w-2/3 mx-auto perspective">
      <div 
        className="relative transition-all duration-1000 ease-in-out"
        style={{ 
          transform: `rotate(${rotation}deg)`,
        }}
      >
        <img 
          src={roosterImages[currentImageIndex]} 
          alt="Gallo Avión Mascot" 
          className="w-full h-auto object-contain rounded-xl shadow-2xl transform hover:scale-[1.02] transition-all duration-500 animate-fade-in"
        />
        <div 
          className="absolute inset-0 rounded-xl border-4 border-[#690dac] pointer-events-none"
          style={{
            boxShadow: '0 0 20px rgba(105, 13, 172, 0.6), inset 0 0 10px rgba(105, 13, 172, 0.4)'
          }}
        />
      </div>
    </div>
  );
};

export default RotatingMascot;
