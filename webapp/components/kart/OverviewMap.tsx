"use client";

import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

export type OverviewMapProps = {
  height: string;
  width: string;
};

// const openstreetmapTileLayer = (
//   <TileLayer
//     attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//   />
// );

// const alidadesatelliteTileLayer = (
//   <TileLayer
//     attribution='&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//     url="https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.jpg" // {ext}
//     //ext="jpg"
//   />
// );

const esriWorldImageryTileLayer = (
  <TileLayer
    attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  />
);

const OverviewMap = ({ height, width }: OverviewMapProps) => {
  return (
    <MapContainer
      center={[61.7651219, 4.8523566]}
      zoom={13}
      style={{ height: height, width: width }}
    >
      {esriWorldImageryTileLayer}
      <Marker position={[61.7651219, 4.8523566]}>
        <div>Test</div>
      </Marker>
    </MapContainer>
  );
};

export default OverviewMap;
