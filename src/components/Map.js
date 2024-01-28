import React, { useEffect } from "react";
import L from "leaflet";
import icon from "../assets/leaf-green.png";

function Map({ location }) {
  const { latitude, longitude } = location;

  useEffect(() => {
    const sw = L.latLng(1.144, 103.535);
    const ne = L.latLng(1.494, 104.502);
    const bounds = L.latLngBounds(sw, ne);

    const map = L.map("mapdiv", {
      // center: L.latLng(1.2868108, 103.8545349),
      center: L.latLng(latitude, longitude),
      zoom: 19,
    });

    map.setMaxBounds(bounds);

    const basemap = L.tileLayer(
      "https://www.onemap.gov.sg/maps/tiles/Default/{z}/{x}/{y}.png",
      {
        detectRetina: true,
        maxZoom: 19,
        minZoom: 11,
        /** DO NOT REMOVE the OneMap attribution below **/
        attribution:
          '<img src="https://www.onemap.gov.sg/web-assets/images/logo/om_logo.png" style="height:20px;width:20px;"/>&nbsp;<a href="https://www.onemap.gov.sg/" target="_blank" rel="noopener noreferrer">OneMap</a>&nbsp;&copy;&nbsp;contributors&nbsp;&#124;&nbsp;<a href="https://www.sla.gov.sg/" target="_blank" rel="noopener noreferrer">Singapore Land Authority</a>',
      }
    );

    basemap.addTo(map);

    const greenIcon = L.icon({
      iconUrl: icon,
      iconSize: [38, 95], // size of the icon
      iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    });

    L.marker([latitude, longitude], { icon: greenIcon }).addTo(map);

    // Cleanup function to remove the map when the component is unmounted
    return () => {
      map.remove();
    };
  }, []);

  return (
    <>
      <div id="mapdiv" style={{ height: "400px" }}></div>
    </>
  );
}

export default Map;
