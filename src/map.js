import { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapComponent() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // create a new leaflet map instance
    const leafletMap = L.map("map");

    // set the map view to the user's geolocation
    leafletMap.locate({ setView: true, maxZoom: 16 });

    // set the map instance to the state
    setMap(leafletMap);

    // add a tile layer from OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(leafletMap);

    // add a marker to the map
    const marker = L.marker([51.505, -0.09]).addTo(leafletMap);

    // add a popup to the marker
    marker.bindPopup("Hello from Leaflet!");
  }, []);

  return (
    <div id="map" style={{ height: "400px" }}>
      {!map && <p>Loading map...</p>}
    </div>
  );
}
