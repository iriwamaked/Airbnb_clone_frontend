import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";

const GoogleMap = ({ lat = 46.4825, lng = 30.7233 }) => {
  const mapRef = useRef(null);
  const [mapInitialized, setMapInitialized] = useState(false);

  useEffect(() => {
    // Функция инициализации карты
    const initializeMap = () => {
      if (window.google && window.google.maps && mapRef.current && !mapInitialized) {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat, lng },
          zoom: 13,
          streetViewControl: true,
          streetViewControlOptions: {
            position: window.google.maps.ControlPosition.TOP_RIGHT,
          },
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: "Точне місцерозташування буде повідомлено після бронювання.",
        });

        const startMarker = new window.google.maps.Marker({
          map,
          position: { lat, lng },
          icon: {
            url: "/testDataProperty/img/hfuGoogleMaps.png",
            scaledSize: new window.google.maps.Size(55, 55),
          },
          label: {
            text: "HFU",
            color: "#FFFFFF",
            fontSize: "16px",
            fontWeight: "700",
            fontFamily: "Nunito Sans, sans-serif",
          },
        });

        startMarker.addListener("mouseover", () => {
          infoWindow.open(map, startMarker);
        });

        startMarker.addListener("mouseout", () => {
          infoWindow.close();
        });

        const transitLayer = new window.google.maps.TransitLayer();

        // Создаем чекбокс и добавляем к контролам карты
        const checkboxContainer = document.createElement("div");
        Object.assign(checkboxContainer.style, {
          margin: "2px",
          marginTop: "10px",
          background: "#fff",
          border: "2px solid #ccc",
          padding: "4px 8px",
          borderRadius: "4px",
          fontFamily: "Nunito Sans, sans-serif",
          fontSize: "16px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        });

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "transit-toggle";
        Object.assign(checkbox.style, {
          width: "16px",
          height: "16px",
          marginTop: "-3px",
        });

        const label = document.createElement("label");
        label.htmlFor = "transit-toggle";
        label.innerText = "Громадський транспорт";
        Object.assign(label.style, {
          fontFamily: "Nunito Sans, sans-serif",
          fontSize: "16px",
          marginLeft: "5px",
        });

        checkbox.addEventListener("change", () => {
          if (checkbox.checked) {
            transitLayer.setMap(map);
          } else {
            transitLayer.setMap(null);
          }
        });

        checkboxContainer.appendChild(checkbox);
        checkboxContainer.appendChild(label);

        map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(checkboxContainer);

        setMapInitialized(true);
      }
    };

    if (window.google && window.google.maps) {
      // Если google уже загружен — сразу инициализируем
      initializeMap();
    } else {
      // Если скрипт еще не загрузился — слушаем его загрузку
      const onScriptLoad = () => {
        initializeMap();
      };

      window.initMap = onScriptLoad;

      // Можно также сделать поллинг, например:
      const interval = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(interval);
          initializeMap();
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [lat, lng, mapInitialized]);

  return <div ref={mapRef} style={{ width: "100%", height: "500px", borderRadius: "10px" }}></div>;
};

GoogleMap.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};

export default GoogleMap;

// import { useEffect, useRef } from "react";
// import { Loader } from "@googlemaps/js-api-loader";
// import "./GoogleMap.css";
// import PropTypes from "prop-types";

// const GoogleMap = ({ lat=46.4825, lng=30.7233}) => {
//     const mapRef = useRef(null);
//     const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

//     useEffect(() => {
//         const loader = new Loader({
//             apiKey,
//             version: "weekly",
//             libraries: ["places"],
//         });

//         loader.load().then((google) => {
//             const map = new google.maps.Map(mapRef.current, {
//                 center: { lat, lng},
//                 zoom: 13,
//                 streetViewControl: true,
//                 streetViewControlOptions: {
//                     position: google.maps.ControlPosition.TOP_RIGHT,
//                 },
//             });

//              // Создаем InfoWindow
//       const infoWindow = new google.maps.InfoWindow({
//         content: "Точне місцерозположення буде повідомлено після бронювання.",
//       });

//             // Маркер
//             let startMarker = new google.maps.Marker({
//                 map,
//                 position: { lat, lng },
//                 // title: "Центр Киева",
//                 icon: {
//                     url: "/testDataProperty/img/hfuGoogleMaps.png",
//                     scaledSize: new google.maps.Size(55, 55),
//                 },
//                 label: {
//                     text: "HFU",
//                     color: "#FFFFFF",
//                     fontSize: "16px",
//                     fontWeight: "700",
//                     fontFamily: "Nunito Sans, sans-serif",
//                 },
//             });

// // Показать infoWindow при наведении
//       startMarker.addListener("mouseover", () => {
//         infoWindow.open(map, startMarker);
//       });

//       // Скрыть infoWindow при уходе мыши
//       startMarker.addListener("mouseout", () => {
//         infoWindow.close();
//       });

//             // Транспортный слой
//             const transitLayer = new google.maps.TransitLayer();

//             // Контейнер чекбокса
//             const checkboxContainer = document.createElement("div");
//             checkboxContainer.style.margin = "2px";
//             checkboxContainer.style.marginTop = "10px";
//             checkboxContainer.style.background = "#fff";
//             checkboxContainer.style.border = "2px solid #ccc";
//             checkboxContainer.style.padding = "4px 8px";
//             checkboxContainer.style.borderRadius = "4px";
//             checkboxContainer.style.fontFamily = "Nunito Sans, sans-serif";
//             checkboxContainer.style.fontSize = "16px";
//             checkboxContainer.style.display = "flex";
//             checkboxContainer.style.alignItems = "center";
//             checkboxContainer.style.gap = "6px";

//             const checkbox = document.createElement("input");
//             checkbox.type = "checkbox";
//             checkbox.id = "transit-toggle";
//             checkbox.style.width = "auto";
//             checkbox.style.width = "16px";    // ширина
//             checkbox.style.height = "16px";   // высота
//             // checkbox.style.marginRight = "8px";  // расстояние справа от чекбокса (чтобы текст не был слишком близко)
//             // checkbox.style.verticalAlign = "middle"; // чтобы немного поднять по вертикали (альтернатива marginTop)
//             checkbox.style.marginTop = "-3px"; // приподнимает вверх
//             // Можно убрать marginRight, если используешь gap:
//             // checkbox.style.marginRight = "6px";

//             const label = document.createElement("label");
//             label.htmlFor = "transit-toggle";
//             label.innerText = "Громадський транспорт";
//             label.style.fontFamily = "Nunito Sans, sans-serif";
//             label.style.fontSize = "16px";
//             label.style.marginLeft = "5px"

//             checkbox.addEventListener("change", () => {
//                 if (checkbox.checked) {
//                     transitLayer.setMap(map);
//                 } else {
//                     transitLayer.setMap(null);
//                 }
//             });

//             checkboxContainer.appendChild(checkbox);
//             checkboxContainer.appendChild(label);

//             map.controls[google.maps.ControlPosition.TOP_RIGHT].push(checkboxContainer);
//         });
//     }, [apiKey]);

//     return (
        
//         <div>
//             <div
//                 ref={mapRef}
//                 style={{ width: "100%", height: "500px", borderRadius: "10px" }}
//             ></div>
//         </div>
//     );
// };


// GoogleMap.propTypes={
//     lat: PropTypes.number,
//     lng: PropTypes.number
// }

// export default GoogleMap;
