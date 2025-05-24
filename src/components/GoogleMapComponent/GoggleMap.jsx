import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

const GoogleMap = () => {
    const mapRef = useRef(null);
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    // const inputRef = useRef(null);
    useEffect(() => {
        const loader = new Loader({
            apiKey,
            version: "weekly",
            libraries: ["places"],
        });

        loader.load().then((google) => {
            const map = new google.maps.Map(mapRef.current, {
                center: { lat: 50.4501, lng: 30.5234 },
                zoom: 13,
            });

            // Изначальный маркер
            let startMarker = new google.maps.Marker({
                map,
                position: { lat: 50.4501, lng: 30.5234 },
                title: "Центр Киева",
                icon: {
                    url: "/testDataProperty/img/hfuGoogleMaps.png",
                    scaledSize: new google.maps.Size(55, 55)
                },
                label: {
                    text: "HFU",          // ваша буква
                    color: "#FFFFFF",   // цвет текста
                    fontSize: "16px",
                    fontWeight: "700",
                    fontFamily: "Nunito Sans, sans-serif"
                },
            });

            // if (inputRef.current) {
            //     const autocomplete = new google.maps.places.Autocomplete(inputRef.current);
            //     autocomplete.addListener("place_changed", () => {
            //         const place = autocomplete.getPlace();
            //         if (place.geometry) {
            //             const location = place.geometry.location;
            //             map.setCenter(location);
            //             map.setZoom(15);

            //             // Обновляем положение маркера
            //             startMarker.setPosition(location);
            //         }
            //     });
            // }
        });
    }, [apiKey]);

    return (
        <div>
            {/* Автокомплит 
      <gmpx-place-autocomplete
        style={{ width: "100%", height: "40px", marginBottom: "10px" }}
        placeholder="Введите адрес"
      ></gmpx-place-autocomplete>*/}

            {/* Простой input для автокомплита 
            <input
                ref={inputRef}
                type="text"
                placeholder="Введите адрес"
                style={{
                    width: "100%",
                    height: "40px",
                    marginBottom: "10px",
                    padding: "0 10px",
                }}
            />*/}

            {/* Карта */}
            <div
                ref={mapRef}
                style={{ width: "100%", height: "500px", borderRadius: "10px" }}
            ></div>

            {/* Подключаем скрипты Google Maps и компоненты */}
            <script
                src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=maps,marker&v=beta&region=UA`}
                defer
            ></script>
            <script
                src="https://unpkg.com/@googlemaps/extended-component-library@latest"
                type="module"
            ></script>
        </div>
    );
};

export default GoogleMap;

