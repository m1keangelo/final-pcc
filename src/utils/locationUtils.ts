
import { useState, useEffect } from 'react';

interface LocationInfo {
  country?: string;
  isInLatinAmerica: boolean;
}

export const useLocationDetection = () => {
  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    isInLatinAmerica: false
  });

  useEffect(() => {
    const detectLocation = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/', { 
          signal: AbortSignal.timeout(3000) 
        });
        
        if (!response.ok) {
          throw new Error('Location fetch failed');
        }

        const data = await response.json();
        const latinAmericanCountries = [
          'MX', 'GT', 'BZ', 'SV', 'HN', 'NI', 
          'CR', 'PA', 'CO', 'VE', 'EC', 'PE', 
          'BO', 'CL', 'AR', 'UY', 'PY', 'BR'
        ];

        setLocationInfo({
          country: data.country_code,
          isInLatinAmerica: latinAmericanCountries.includes(data.country_code)
        });
      } catch (error) {
        console.warn('Location detection failed, defaulting to non-Latin America');
        setLocationInfo({ isInLatinAmerica: false });
      }
    };

    detectLocation();
  }, []);

  return locationInfo;
};
