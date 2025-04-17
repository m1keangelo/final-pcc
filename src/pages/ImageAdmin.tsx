
import React from 'react';
import ImageCMS from '@/components/login/ImageCMS';
import { LanguageProvider } from "@/contexts/LanguageContext";

const ImageAdmin = () => {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#1a1a2a] p-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Image Admin Dashboard</h1>
          <ImageCMS />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default ImageAdmin;
