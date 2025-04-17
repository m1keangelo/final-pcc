
import React from 'react';
import RotatingMascot from './RotatingMascot';

const BrandImagery: React.FC = () => {
  return (
    <div className="flex-1 bg-black p-6 flex flex-col justify-between items-center">
      <div className="w-full flex justify-center mt-8 mb-12">
        <img 
          src="/lovable-uploads/b9619f78-7281-46a1-93d2-c7c8123e5e56.png" 
          alt="Gallo Avión Logo" 
          className="w-56 md:w-64"
        />
      </div>

      <div className="flex-1 w-full flex items-center justify-center py-4">
        <RotatingMascot />
      </div>
      
      <div className="mt-auto w-full">
        <div className="text-center text-white mb-6">
          <h2 className="text-2xl font-semibold mb-2">Gallo Avión CMS</h2>
          <p className="text-gray-400">Controlling your financial future</p>
        </div>
      </div>
    </div>
  );
};

export default BrandImagery;
