"use client";

import L, { LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
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
  popupContent?: string;
};

const esriWorldImageryTileLayer = (
  <TileLayer
    attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  />
);

const DEFAULT_POSITION: L.LatLngTuple = [61.7663141, 4.8756418];

const SingleBoulderMap = ({
  latitude,
  longitude,
  height,
  width,
  onClick,
  popupContent,
}: OverviewMapProps) => {
  const position: L.LatLngTuple =
    latitude !== null && longitude !== null
      ? [latitude, longitude]
      : DEFAULT_POSITION;

  const createLucideDivIcon = () =>
    L.divIcon({
      className: "",
      html: renderToStaticMarkup(
        <MapPin color="var(--tertiary-color)" size={32} strokeWidth={2.5} />
      ),
      iconSize: [32, 32],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

  const markerIcon = createLucideDivIcon();

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
      <MapContainer
        center={position}
        zoom={16}
        style={{ height: height, width: width }}
      >
        <MapClickHandler />
        {esriWorldImageryTileLayer}
        {longitude && latitude && (
          <Marker position={position} icon={markerIcon}>
            {popupContent && <Popup>{popupContent}</Popup>}
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default SingleBoulderMap;
