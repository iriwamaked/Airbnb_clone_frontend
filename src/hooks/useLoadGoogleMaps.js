import { useState, useEffect } from 'react';

const useLoadGoogleMaps = () => {
  const [loaded, setLoaded] = useState(false);
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      setLoaded(true);
      return;
    }

    const existingScript = document.querySelector(`script[src*="maps.googleapis.com/maps/api/js"]`);

    if (existingScript) {
      const onLoad = () => setLoaded(true);
      existingScript.addEventListener('load', onLoad);

      return () => {
        existingScript.removeEventListener('load', onLoad);
      };
    }

    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.defer = true;

    const onLoad = () => setLoaded(true);
    script.addEventListener('load', onLoad);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener('load', onLoad);
    };
  }, [apiKey]);

  return loaded;
};

export default useLoadGoogleMaps;
