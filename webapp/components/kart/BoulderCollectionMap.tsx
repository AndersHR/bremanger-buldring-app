"use client";

import { Boulder } from "@/lib/definitions";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Circle } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import { LayersControl, MapContainer, Marker, Popup } from "react-leaflet";
import {
  esriWorldImageryTileLayer,
  kartverketTopoTileLayer,
} from "./TileLayers";

const DEFAULT_POSITION: L.LatLngTuple = [61.7663141, 4.8756418];

export default function BoulderCollectionMap({
  position,
  zoom,
  boulders,
  height,
  width,
}: {
  position: [number, number] | null;
  zoom: number;
  boulders: Boulder[];
  height: string;
  width: string;
}) {
  return (
    <div>
      <MapContainer
        center={position ?? DEFAULT_POSITION}
        zoom={zoom}
        style={{ height: height, width: width }}
      >
        <LayersControl>
          <LayersControl.BaseLayer checked name="Satelitt">
            {esriWorldImageryTileLayer}
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked name="Topografisk">
            {kartverketTopoTileLayer}
          </LayersControl.BaseLayer>
        </LayersControl>
        {boulders.map((boulder) => boulderMarker(boulder))}
      </MapContainer>
    </div>
  );
}

function boulderMarker(boulder: Boulder) {
  const createLucideDivIcon = () =>
    L.divIcon({
      className: "",
      html: renderToStaticMarkup(
        <Circle
          fill="var(--tertiary-color)"
          color="var(--tertiary-color)"
          opacity={0.8}
          size={8}
          strokeWidth={2.5}
        />
      ),
      iconSize: [16, 16],
      iconAnchor: [8, 8],
      popupAnchor: [0, -8],
    });

  const markerIcon = createLucideDivIcon();

  const position: L.LatLngTuple | null =
    boulder.latitude && boulder.longitude
      ? [boulder.latitude, boulder.longitude]
      : null;

  if (!position) {
    return null;
  }

  return (
    <Marker position={position} icon={markerIcon}>
      <Popup>{boulder.name}</Popup>
    </Marker>
  );
}
