import { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";
import "./GoogleMap.css";
import PropTypes from "prop-types";

const GoogleMap = ({ lat=46.4825, lng=30.7233}) => {
    const mapRef = useRef(null);
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

    useEffect(() => {
        const loader = new Loader({
            apiKey,
            version: "weekly",
            libraries: ["places"],
        });

        loader.load().then((google) => {
            const map = new google.maps.Map(mapRef.current, {
                center: { lat, lng},
                zoom: 13,
                streetViewControl: true,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.TOP_RIGHT,
                },
            });

             // Создаем InfoWindow
      const infoWindow = new google.maps.InfoWindow({
        content: "Точне місцерозположення буде повідомлено після бронювання.",
      });

            // Маркер
            let startMarker = new google.maps.Marker({
                map,
                position: { lat, lng },
                // title: "Центр Киева",
                icon: {
                    url: "/testDataProperty/img/hfuGoogleMaps.png",
                    scaledSize: new google.maps.Size(55, 55),
                },
                label: {
                    text: "HFU",
                    color: "#FFFFFF",
                    fontSize: "16px",
                    fontWeight: "700",
                    fontFamily: "Nunito Sans, sans-serif",
                },
            });

// Показать infoWindow при наведении
      startMarker.addListener("mouseover", () => {
        infoWindow.open(map, startMarker);
      });

      // Скрыть infoWindow при уходе мыши
      startMarker.addListener("mouseout", () => {
        infoWindow.close();
      });

            // Транспортный слой
            const transitLayer = new google.maps.TransitLayer();

            // Контейнер чекбокса
            const checkboxContainer = document.createElement("div");
            checkboxContainer.style.margin = "2px";
            checkboxContainer.style.marginTop = "10px";
            checkboxContainer.style.background = "#fff";
            checkboxContainer.style.border = "2px solid #ccc";
            checkboxContainer.style.padding = "4px 8px";
            checkboxContainer.style.borderRadius = "4px";
            checkboxContainer.style.fontFamily = "Nunito Sans, sans-serif";
            checkboxContainer.style.fontSize = "16px";
            checkboxContainer.style.display = "flex";
            checkboxContainer.style.alignItems = "center";
            checkboxContainer.style.gap = "6px";

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.id = "transit-toggle";
            checkbox.style.width = "auto";
            checkbox.style.width = "16px";    // ширина
            checkbox.style.height = "16px";   // высота
            // checkbox.style.marginRight = "8px";  // расстояние справа от чекбокса (чтобы текст не был слишком близко)
            // checkbox.style.verticalAlign = "middle"; // чтобы немного поднять по вертикали (альтернатива marginTop)
            checkbox.style.marginTop = "-3px"; // приподнимает вверх
            // Можно убрать marginRight, если используешь gap:
            // checkbox.style.marginRight = "6px";

            const label = document.createElement("label");
            label.htmlFor = "transit-toggle";
            label.innerText = "Громадський транспорт";
            label.style.fontFamily = "Nunito Sans, sans-serif";
            label.style.fontSize = "16px";
            label.style.marginLeft = "5px"

            checkbox.addEventListener("change", () => {
                if (checkbox.checked) {
                    transitLayer.setMap(map);
                } else {
                    transitLayer.setMap(null);
                }
            });

            checkboxContainer.appendChild(checkbox);
            checkboxContainer.appendChild(label);

            map.controls[google.maps.ControlPosition.TOP_RIGHT].push(checkboxContainer);
        });
    }, [apiKey]);

    return (
        
        <div>
            <div
                ref={mapRef}
                style={{ width: "100%", height: "500px", borderRadius: "10px" }}
            ></div>
        </div>
    );
};


GoogleMap.propTypes={
    lat: PropTypes.number,
    lng: PropTypes.number
}

export default GoogleMap;
