// hooks/useLoadGoogleMaps.js
import { useEffect, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export const useLoadGoogleMaps = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loader = new Loader({
      apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
      libraries: ["places"],
    });

    loader.load()
      .then(() => setLoaded(true))
      .catch(err => {
        console.error("❌ Не удалось загрузить Google Maps API:", err);
        setLoaded(false);
      });
  }, []);

  return loaded;
};
