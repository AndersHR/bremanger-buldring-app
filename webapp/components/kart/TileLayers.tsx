import { TileLayer } from "react-leaflet";

export const esriWorldImageryTileLayer = (
  <TileLayer
    attribution="Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"
    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
  />
);

export const kartverketTopoTileLayer = (
  <TileLayer
    attribution='&copy; <a href="http://www.kartverket.no/">Kartverket</a>'
    url="https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png"
  />
);

export const kartverketGreyscaleTileLayer = (
  <TileLayer
    attribution='&copy; <a href="http://www.kartverket.no/">Kartverket</a>'
    url="https://cache.kartverket.no/v1/wmts/1.0.0/topo/default/webmercator/{z}/{y}/{x}.png"
  />
);
