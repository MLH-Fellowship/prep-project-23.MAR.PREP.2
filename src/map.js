import { useEffect, useState} from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

export default function MapComponent({ searchedLocation, searchedLocationName}) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    // create a new leaflet map instance
    const leafletMap = L.map("map");

    // add a tile layer from OpenStreetMap
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data © <a href="https://openstreetmap.org">OpenStreetMap</a> contributors',
      maxZoom: 19,
    }).addTo(leafletMap);

    // define the default marker icon
    const DefaultIcon = L.icon({
      iconUrl: icon,
      shadowUrl: iconShadow,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
    });

    // set the default marker icon for all markers on the map
    L.Marker.prototype.options.icon = DefaultIcon;

    // set the map instance to the state
    setMap(leafletMap);

    return () => {
      // clean up the map instance when the component unmounts
      leafletMap.remove();
    };
  }, []);

  useEffect(() => {
    if (map && searchedLocation) {
      // update the map view to the searched location
      map.setView(searchedLocation, 13);

      // add a marker to the map at the searched location
      const marker = L.marker(searchedLocation).addTo(map);

      // add a popup to the marker
      marker.bindPopup(searchedLocationName).openPopup();
    }
  }, [map, searchedLocation, searchedLocationName]);

  return (
    <div id="map" style={{ height: "400px" }}>
      {!map && <p>Loading map...</p>}
    </div>
  );
}