import { useCallback } from "react";

export function usePlaceDetails() {
    const getPlaceDetails = useCallback((placeId) => {
        return new Promise((resolve, reject) => {
            if (!window.google) return reject("Google API не завантажено");

            const service = new window.google.maps.places.PlacesService(document.createElement("div"));

            service.getDetails({ placeId }, (place, status) => {
                if (status !== window.google.maps.places.PlacesServiceStatus.OK || !place) {
                    return reject("Не вдалося отримати дані місцерозташування");
                }

                const components = place.address_components;

                const get = (type) => {
                    const comp = components.find(c => c.types.includes(type));
                    return comp ? comp.long_name : "";
                };

                const city = get("locality") || get("administrative_area_level_1");
                const region = get("administrative_area_level_1");
                const country = get("country");
                const street = get("route");
                const houseNumber = get("street_number");

                const lat = place.geometry?.location?.lat();
                const lng = place.geometry?.location.lng();

                // const fullAddress = `${street} ${houseNumber}, ${city}, ${country}`.trim();

                resolve({ country, region, city, street, houseNumber, lat, lng });
            });
        });
    }, []);

    return { getPlaceDetails };
}
