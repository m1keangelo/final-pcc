
import { useState, useEffect } from 'react';

interface LocationInfo {
  country?: string;
  isInLatinAmerica: boolean;
  fromCache?: boolean;
  lastUpdated?: number;
  stale?: boolean; // Added stale property
  error?: string; // Added error property
  isMock?: boolean; // Added isMock property
}

// In-memory cache for location data
let locationCache: LocationInfo | null = null;
const CACHE_DURATION = 1000 * 60 * 60; // 1 hour in milliseconds

export const useLocationDetection = () => {
  const [locationInfo, setLocationInfo] = useState<LocationInfo>({
    isInLatinAmerica: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const detectLocation = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Check if we have a valid cache
        const now = Date.now();
        if (locationCache && locationCache.lastUpdated && 
            (now - locationCache.lastUpdated < CACHE_DURATION)) {
          console.info('🌍 Using cached location data');
          setLocationInfo({...locationCache, fromCache: true});
          setIsLoading(false);
          return;
        }

        // No valid cache, make a new request
        console.info('🌍 Fetching fresh location data');
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
        
        const response = await fetch('https://ipapi.co/json/', { 
          signal: controller.signal 
        });
        clearTimeout(timeoutId);
        
        if (!response.ok) {
          throw new Error(`Location API responded with status: ${response.status}`);
        }

        const data = await response.json();
        const latinAmericanCountries = [
          'MX', 'GT', 'BZ', 'SV', 'HN', 'NI', 
          'CR', 'PA', 'CO', 'VE', 'EC', 'PE', 
          'BO', 'CL', 'AR', 'UY', 'PY', 'BR'
        ];

        const newLocationInfo: LocationInfo = {
          country: data.country_code,
          isInLatinAmerica: latinAmericanCountries.includes(data.country_code),
          lastUpdated: now
        };
        
        // Update cache
        locationCache = newLocationInfo;
        
        setLocationInfo(newLocationInfo);
      } catch (error) {
        console.warn('Location detection failed:', error);
        
        // If we have a stale cache, use it as fallback
        if (locationCache) {
          console.info('🌍 Using stale location cache as fallback');
          setLocationInfo({...locationCache, fromCache: true, stale: true});
        } else {
          // No cache available, use defaults
          console.warn('Location detection failed, defaulting to non-Latin America');
          setLocationInfo({ 
            isInLatinAmerica: false, 
            error: error instanceof Error ? error.message : 'Unknown error'
          });
          
          if (error instanceof Error) {
            setError(error.message);
          } else {
            setError('Failed to detect location');
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    detectLocation();
  }, []);

  return {
    ...locationInfo,
    isLoading,
    error
  };
};

// Function to manually clear the location cache
export const clearLocationCache = () => {
  console.info('🌍 Location cache cleared');
  locationCache = null;
};

// Function to manually set location data (useful for testing)
export const setMockLocation = (countryCode: string) => {
  const latinAmericanCountries = [
    'MX', 'GT', 'BZ', 'SV', 'HN', 'NI', 
    'CR', 'PA', 'CO', 'VE', 'EC', 'PE', 
    'BO', 'CL', 'AR', 'UY', 'PY', 'BR'
  ];
  
  locationCache = {
    country: countryCode,
    isInLatinAmerica: latinAmericanCountries.includes(countryCode),
    lastUpdated: Date.now(),
    isMock: true
  };
  
  console.info(`🌍 Mock location set to: ${countryCode}`);
  return locationCache;
};
