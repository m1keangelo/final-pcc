
import React from 'react';
import RotatingMascot from './RotatingMascot';

interface BrandImageryProps {
  key?: React.Key;
}

const BrandImagery: React.FC<BrandImageryProps> = ({ key }) => {
  return (
    <div className="flex-1 bg-black p-6 flex flex-col justify-center items-center">
      <div className="w-full flex justify-center mb-6">
        <img 
          src="/lovable-uploads/b9619f78-7281-46a1-93d2-c7c8123e5e56.png" 
          alt="Gallo Avión Logo" 
          className="w-56 md:w-64"
        />
      </div>

      <div className="w-full flex items-center justify-center py-4">
        <RotatingMascot key={key} />
      </div>
    </div>
  );
};

export default BrandImagery;
