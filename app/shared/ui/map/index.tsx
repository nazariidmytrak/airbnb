'use client';

import styles from './style.module.scss';
import { FC } from 'react';
import 'leaflet/dist/leaflet.css';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import { MapProps } from '@/app/interfaces/map';

//@ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

const Map: FC<MapProps> = ({ center }) => {
  return (
    <MapContainer
      className={styles['map-container']}
      zoom={center ? 4 : 2}
      scrollWheelZoom={true}
      center={(center as L.LatLngExpression) || [51, -0.09]}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      {center && <Marker position={center as L.LatLngExpression} />}
    </MapContainer>
  );
};

export default Map;
