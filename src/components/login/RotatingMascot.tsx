import React, { useState, useEffect } from 'react';

// The array of available mascot images
const roosterImages = [
  '/lovable-uploads/c9f77875-7ae2-48a9-a691-e44f5d39747f.png', // First uploaded rooster
  '/lovable-uploads/8c370aa8-ff4f-4e64-8faf-ecc4a1081402.png', // Second uploaded rooster 
  '/lovable-uploads/d53b68ce-4019-46c4-91c9-e82e34d344da.png', // Third uploaded rooster
  '/lovable-uploads/524015be-1f70-4615-8439-30dadb0fad2e.png',
  '/lovable-uploads/136b55d2-1bd5-4f8e-8fb3-4d0bbf8f0b34.png',
  '/lovable-uploads/02deb32f-a4e2-4cdc-9fcc-be416e1a6523.png',
  '/lovable-uploads/f53a4f4b-40a3-45bd-9576-b17e9033a854.png',
  '/lovable-uploads/b5c4d691-1912-41c1-b915-671cc1ac17da.png',
  '/lovable-uploads/564fb992-62a9-4f81-b6b7-aa7025d8e37f.png',
  '/lovable-uploads/63f6be98-6952-450e-9edd-4a9df671daac.png'
];

// Define container dimensions
const CONTAINER_WIDTH = 400;  // pixels
const CONTAINER_HEIGHT = 400; // pixels

// Define max dimensions for the actual image
const MAX_WIDTH = 380;  // pixels
const MAX_HEIGHT = 380; // pixels

const randomAngle = () => Math.floor(Math.random() * 10) - 5; // Random angle between -5 and 5 degrees

// Function to get a random image from the array
const getRandomImage = () => {
  // Force a truly random selection each time
  const randomIndex = Math.floor(Math.random() * roosterImages.length);
  console.log("Selected random image index:", randomIndex);
  return roosterImages[randomIndex];
};

const RotatingMascot: React.FC = () => {
  // Force a random image on component creation - no need for useState initialization
  const [currentImage, setCurrentImage] = useState(() => {
    const img = getRandomImage();
    console.log("Initial random image selected:", img);
    return img;
  });
  
  const [rotation, setRotation] = useState(() => randomAngle());
  const [imageDimensions, setImageDimensions] = useState({ width: 0, height: 0 });
  
  // Use useEffect to set a random image when the component mounts
  useEffect(() => {
    console.log("RotatingMascot mounted or remounted, selecting new random image");
    // This ensures a fresh image on mount/remount
    setCurrentImage(getRandomImage());
    setRotation(randomAngle());
  }, []);
  
  // Handle image loading to apply size constraints
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;
    
    // Get natural dimensions
    const naturalWidth = img.naturalWidth;
    const naturalHeight = img.naturalHeight;
    
    // Calculate aspect ratio
    const aspectRatio = naturalWidth / naturalHeight;
    
    let width = naturalWidth;
    let height = naturalHeight;
    
    // First check if the image exceeds max width
    if (width > MAX_WIDTH) {
      width = MAX_WIDTH;
      height = width / aspectRatio;
    }
    
    // Then check if the adjusted height exceeds max height
    if (height > MAX_HEIGHT) {
      height = MAX_HEIGHT;
      width = height * aspectRatio;
    }
    
    setImageDimensions({ width, height });
  };

  return (
    <div 
      className="relative mx-auto perspective flex items-center justify-center"
      style={{
        width: `${CONTAINER_WIDTH}px`,
        height: `${CONTAINER_HEIGHT}px`,
      }}
    >
      <div 
        className="relative transition-all duration-1000 ease-in-out"
        style={{ 
          transform: `rotate(${rotation}deg)`,
          maxWidth: `${MAX_WIDTH}px`,
          maxHeight: `${MAX_HEIGHT}px`,
        }}
      >
        {currentImage && (
          <img 
            src={currentImage} 
            alt="Gallo Avión Mascot" 
            className="w-auto h-auto object-contain rounded-xl shadow-2xl transform hover:scale-[1.02] transition-all duration-500 animate-fade-in"
            onLoad={handleImageLoad}
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
              width: imageDimensions.width > 0 ? `${imageDimensions.width}px` : 'auto',
              height: imageDimensions.height > 0 ? `${imageDimensions.height}px` : 'auto',
            }}
          />
        )}
        <div 
          className="absolute inset-0 rounded-xl border-4 border-gallopurple pointer-events-none"
          style={{
            boxShadow: '0 0 20px rgba(105, 13, 172, 0.6), inset 0 0 10px rgba(105, 13, 172, 0.4)'
          }}
        />
      </div>
    </div>
  );
};

export default RotatingMascot;
