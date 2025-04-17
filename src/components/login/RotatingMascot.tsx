
import React, { useEffect, useState } from 'react';

// The array of available mascot images
const roosterImages = [
  '/lovable-uploads/524015be-1f70-4615-8439-30dadb0fad2e.png',
  '/lovable-uploads/136b55d2-1bd5-4f8e-8fb3-4d0bbf8f0b34.png',
  '/lovable-uploads/02deb32f-a4e2-4cdc-9fcc-be416e1a6523.png',
  '/lovable-uploads/f53a4f4b-40a3-45bd-9576-b17e9033a854.png'
];

// Define max dimensions to ensure the image never falls out of proportion
const MAX_WIDTH = 500; // pixels
const MAX_HEIGHT = 400; // pixels

const randomAngle = () => Math.floor(Math.random() * 10) - 5; // Random angle between -5 and 5 degrees

const RotatingMascot: React.FC = () => {
  // Get a random image at component mount (login time)
  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * roosterImages.length);
    return roosterImages[randomIndex];
  };

  const [currentImage, setCurrentImage] = useState(getRandomImage());
  const [rotation, setRotation] = useState(randomAngle());
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });

  // Handle image loading to apply size constraints
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    
    // Calculate constrained dimensions
    let width = img.naturalWidth;
    let height = img.naturalHeight;
    
    // Apply max width constraint
    if (width > MAX_WIDTH) {
      const ratio = MAX_WIDTH / width;
      width = MAX_WIDTH;
      height = height * ratio;
    }
    
    // Apply max height constraint
    if (height > MAX_HEIGHT) {
      const ratio = MAX_HEIGHT / height;
      height = MAX_HEIGHT;
      width = width * ratio;
    }
    
    setImageDimensions({ width, height });
  };

  useEffect(() => {
    // We already set a random image at component mount

    // Optionally, set a new random rotation occasionally
    const rotationInterval = setInterval(() => {
      setRotation(randomAngle());
    }, 10000);

    return () => clearInterval(rotationInterval);
  }, []);

  return (
    <div className="relative w-4/5 lg:w-2/3 mx-auto perspective">
      <div 
        className="relative transition-all duration-1000 ease-in-out"
        style={{ 
          transform: `rotate(${rotation}deg)`,
          maxWidth: `${MAX_WIDTH}px`,
          maxHeight: `${MAX_HEIGHT}px`,
        }}
      >
        <img 
          src={currentImage} 
          alt="Gallo Avión Mascot" 
          className="w-full h-auto object-contain rounded-xl shadow-2xl transform hover:scale-[1.02] transition-all duration-500 animate-fade-in"
          onLoad={handleImageLoad}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            width: imageDimensions.width > 0 ? `${imageDimensions.width}px` : 'auto',
            height: imageDimensions.height > 0 ? `${imageDimensions.height}px` : 'auto',
          }}
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
