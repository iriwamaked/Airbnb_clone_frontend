import { Loader } from "@googlemaps/js-api-loader";

const loader = new Loader({
  apiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  version: "weekly",
  libraries: ["places"],
});

export const loadGoogleMaps = async () => {
  try {
    await loader.load();

    // Проверка, что всё загружено
    if (window.google && window.google.maps && window.google.maps.places) {
      console.log("✅ Google Maps и Places API загружены");
      return true;
    } else {
      throw new Error("❌ Google Maps API не полностью загружен");
    }
  } catch (err) {
    console.error("❌ Ошибка при загрузке Google Maps:", err);
    return false;
  }
};