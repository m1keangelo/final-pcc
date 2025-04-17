
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/sonner";

// Define the ImageData interface
export interface ImageData {
  id: string;
  url: string;
  alt: string;
  active: boolean;
}

// Mock database - in a real app this would connect to a backend
const STORAGE_KEY = 'login_cms_images';

// Default image from the current app
const defaultImages: ImageData[] = [
  {
    id: '1',
    url: '/lovable-uploads/b9619f78-7281-46a1-93d2-c7c8123e5e56.png',
    alt: 'Gallo Avión Cyberpunk',
    active: true
  }
];

export const useImageCMS = () => {
  const [images, setImages] = useState<ImageData[]>([]);
  
  useEffect(() => {
    // Load images from localStorage on component mount
    const savedImages = localStorage.getItem(STORAGE_KEY);
    if (savedImages) {
      try {
        setImages(JSON.parse(savedImages));
      } catch (e) {
        console.error("Failed to parse saved images:", e);
        setImages(defaultImages);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultImages));
      }
    } else {
      setImages(defaultImages);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultImages));
    }
  }, []);

  const saveImages = (updatedImages: ImageData[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
    setImages(updatedImages);
  };

  const addImage = (url: string, alt: string) => {
    const newImage: ImageData = {
      id: Date.now().toString(),
      url,
      alt,
      active: true
    };
    
    const updatedImages = [...images, newImage];
    saveImages(updatedImages);
    return newImage;
  };

  const updateImage = (id: string, data: Partial<Omit<ImageData, 'id'>>) => {
    const updatedImages = images.map(img => 
      img.id === id ? { ...img, ...data } : img
    );
    saveImages(updatedImages);
  };

  const removeImage = (id: string) => {
    const updatedImages = images.filter(img => img.id !== id);
    saveImages(updatedImages);
  };

  const getActiveImages = () => {
    return images.filter(img => img.active);
  };

  return { 
    images, 
    addImage, 
    updateImage, 
    removeImage,
    getActiveImages
  };
};

const ImageCMS: React.FC = () => {
  const { images, addImage, updateImage, removeImage } = useImageCMS();
  const [newImageUrl, setNewImageUrl] = useState('');
  const [newImageAlt, setNewImageAlt] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState('');
  
  // Image dimensions display
  const [dimensions, setDimensions] = useState<{width: number, height: number} | null>(null);

  // Function to handle image file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setPreviewUrl(event.target.result as string);
          
          // Get image dimensions
          const img = new Image();
          img.onload = () => {
            setDimensions({
              width: img.naturalWidth,
              height: img.naturalHeight
            });
          };
          img.src = event.target.result as string;
        }
      };
      reader.readAsDataURL(file);
      
      // Auto-fill the alt text with filename
      const fileName = file.name.split('.')[0].replace(/_/g, ' ');
      setNewImageAlt(fileName);
    }
  };

  // In a real app, this would upload to a server
  const handleUpload = () => {
    if (imageFile && previewUrl) {
      // In a real app, this would be the URL returned after upload
      // For now, we're using the data URL
      const imageUrl = previewUrl;
      addImage(imageUrl, newImageAlt || imageFile.name);
      
      // Reset form
      setNewImageUrl('');
      setNewImageAlt('');
      setImageFile(null);
      setPreviewUrl('');
      setDimensions(null);
      
      toast("Image uploaded successfully");
    } else if (newImageUrl && newImageAlt) {
      // Add external image URL
      addImage(newImageUrl, newImageAlt);
      
      // Reset form
      setNewImageUrl('');
      setNewImageAlt('');
      
      toast("Image added successfully");
    } else {
      toast("Please select a file or enter an image URL", {
        description: "You need to provide an image before uploading",
      });
    }
  };

  const toggleImageActive = (id: string, currentActive: boolean) => {
    updateImage(id, { active: !currentActive });
    toast(`Image ${!currentActive ? 'activated' : 'deactivated'}`);
  };

  const handleRemove = (id: string) => {
    removeImage(id);
    toast("Image removed successfully");
  };

  return (
    <div className="bg-[#2a2a3a] p-6 rounded-lg border border-[#9b87f5]/30">
      <h2 className="text-2xl font-bold mb-6 text-white">Login Image Manager</h2>
      
      <div className="mb-8 p-4 bg-[#3a3a4a] rounded-md">
        <h3 className="text-lg font-medium mb-4 text-white">Add New Image</h3>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="image-file" className="text-gray-300">Upload Image</Label>
            <Input 
              id="image-file" 
              type="file" 
              onChange={handleFileChange}
              accept="image/*"
              className="bg-[#4a4a5a] text-gray-200 border-[#5a5a6a] mt-1"
            />
            
            {dimensions && (
              <p className="mt-2 text-sm text-gray-400">
                Dimensions: {dimensions.width} × {dimensions.height} pixels
              </p>
            )}
            
            {previewUrl && (
              <div className="mt-4 relative">
                <h4 className="text-sm font-medium mb-2 text-gray-300">Preview:</h4>
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="max-h-40 rounded-md object-contain border border-[#5a5a6a]" 
                />
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-1">
            <Label htmlFor="image-alt" className="text-gray-300">Image Alt Text</Label>
            <Input 
              id="image-alt" 
              value={newImageAlt}
              onChange={(e) => setNewImageAlt(e.target.value)}
              placeholder="Description of the image"
              className="bg-[#4a4a5a] text-gray-200 border-[#5a5a6a]"
            />
          </div>
          
          <div className="pt-2">
            <Button 
              onClick={handleUpload}
              className="bg-[#690dac] hover:bg-[#7a2dac]"
            >
              {imageFile ? "Upload Image" : "Add Image"}
            </Button>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4 text-white">Manage Images</h3>
        
        {images.length === 0 ? (
          <p className="text-gray-400">No images available. Add one above.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.map((image) => (
              <div 
                key={image.id}
                className={`bg-[#3a3a4a] p-3 rounded-md border ${
                  image.active ? 'border-[#9b87f5]' : 'border-gray-600'
                }`}
              >
                <div className="aspect-square relative mb-2 overflow-hidden rounded-md">
                  <img 
                    src={image.url} 
                    alt={image.alt}
                    className="absolute inset-0 w-full h-full object-contain"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-gray-300 truncate">{image.alt}</p>
                  
                  <div className="flex justify-between">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => toggleImageActive(image.id, image.active)}
                      className={image.active ? 'bg-green-800/20 text-green-400' : 'bg-gray-800/20 text-gray-400'}
                    >
                      {image.active ? 'Active' : 'Inactive'}
                    </Button>
                    
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemove(image.id)}
                      className="bg-red-900/20 text-red-400 hover:bg-red-900/40"
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageCMS;
