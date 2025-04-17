
import React, { useState, useEffect } from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { useImageCMS } from './ImageCMS';

const BrandImagery = () => {
  const { t } = useLanguage();
  const { getActiveImages } = useImageCMS();
  const [currentImage, setCurrentImage] = useState<{url: string, alt: string} | null>(null);
  const [imageKey, setImageKey] = useState(Date.now());

  useEffect(() => {
    const activeImages = getActiveImages();
    if (activeImages.length > 0) {
      // Randomly select an image from active images
      const randomIndex = Math.floor(Math.random() * activeImages.length);
      const selectedImage = activeImages[randomIndex];
      setCurrentImage({
        url: selectedImage.url,
        alt: selectedImage.alt
      });
      console.log("Selected image:", selectedImage);
    } else {
      // Fallback to default image if no active images
      setCurrentImage({
        url: "/lovable-uploads/b9619f78-7281-46a1-93d2-c7c8123e5e56.png",
        alt: "Gallo Avión Cyberpunk"
      });
      console.log("Using default image");
    }
  }, [imageKey]);

  // Force re-render and new image selection every 20 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      setImageKey(Date.now());
    }, 20000);
    
    return () => clearInterval(intervalId);
  }, []);

  if (!currentImage) {
    return <div className="w-full h-full flex items-center justify-center p-6">Loading...</div>;
  }

  return (
    <div className="w-full h-full flex items-center justify-center p-6 relative">
      <img 
        src={currentImage.url} 
        alt={currentImage.alt} 
        className="w-3/5 lg:w-[52.5%] object-contain rounded-xl shadow-2xl transform hover:scale-[1.02] transition-all duration-500 border-2 border-solid border-[#690dac]/70"
        style={{
          filter: "drop-shadow(0 0 20px rgba(105, 13, 172, 0.4))"
        }}
        onLoad={() => {
          // Get image dimensions on load
          const img = new Image();
          img.onload = () => {
            console.log(`Loaded image dimensions: ${img.width} × ${img.height} pixels`);
          };
          img.src = currentImage.url;
        }}
      />
    </div>
  );
};

export default BrandImagery;
