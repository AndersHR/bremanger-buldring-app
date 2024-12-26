"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Boulder } from "@/lib/definitions";

export type OverviewMapProps = {
  boulder: Boulder;
  height: string;
  width: string;
};

const esriWorldImageryTileLayer = (
  <TileLayer
    attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  />
);

const SingleBoulderMap = ({ boulder, height, width }: OverviewMapProps) => {
  const markerIcon = new L.Icon({
    iconUrl: "/softteal-tertiary-color/icons8-location-96-outline.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  const position: L.LatLngTuple =
    boulder.latitude && boulder.longitude
      ? [boulder.latitude, boulder.longitude]
      : [0, 0];

  return (
    <div>
      {boulder.latitude && boulder.longitude && (
        <MapContainer
          center={position}
          zoom={16}
          style={{ height: height, width: width }}
        >
          {esriWorldImageryTileLayer}
          <Marker position={position} icon={markerIcon}>
            <Popup>Test</Popup>
          </Marker>
        </MapContainer>
      )}
    </div>
  );
};

export default SingleBoulderMap;
