"use client";

import L, { LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";

export type OverviewMapProps = {
  latitude: number | null;
  longitude: number | null;
  height: string;
  width: string;
  onClick?: (e: LeafletMouseEvent) => void;
};

const esriWorldImageryTileLayer = (
  <TileLayer
    attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  />
);

const SingleBoulderMap = ({
  latitude,
  longitude,
  height,
  width,
  onClick,
}: OverviewMapProps) => {
  const markerIcon = new L.Icon({
    iconUrl: "/softteal-tertiary-color/icons8-location-96-outline.png",
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
  const position: L.LatLngTuple =
    latitude && longitude ? [latitude, longitude] : [0, 0];

  const MapClickHandler = () => {
    useMapEvents({
      click: (e) => {
        if (onClick) {
          onClick(e);
        }
      },
    });
    return null;
  };

  return (
    <div>
      {latitude && longitude && (
        <MapContainer
          center={position}
          zoom={16}
          style={{ height: height, width: width }}
        >
          <MapClickHandler />
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
