"use client";

import L, { LeafletMouseEvent } from "leaflet";
import "leaflet/dist/leaflet.css";
import { MapPin } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import { MapContainer, Marker, Popup, useMapEvents, LayersControl } from "react-leaflet";
import {
  esriWorldImageryTileLayer,
  kartverketTopoTileLayer,
} from "./TileLayers";
const DEFAULT_POSITION: L.LatLngTuple = [61.7663141, 4.8756418];

export default function SingleBoulderMap({
  latitude,
  longitude,
  height,
  width,
  onClick,
  popupContent,
}: {
  latitude: number | null;
  longitude: number | null;
  height: string;
  width: string;
  onClick?: (e: LeafletMouseEvent) => void;
  popupContent?: string;
}) {
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
        <LayersControl>
          <LayersControl.BaseLayer checked name="Satelitt">
            {esriWorldImageryTileLayer}
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="Topografisk">
            {kartverketTopoTileLayer}
          </LayersControl.BaseLayer>
        </LayersControl>
        {longitude && latitude && (
          <Marker position={position} icon={markerIcon}>
            {popupContent && <Popup>{popupContent}</Popup>}
          </Marker>
        )}
      </MapContainer>
    </div>
  );
}
