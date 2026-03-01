import { useState, useEffect } from 'react'
import './App.css'
import { io } from 'socket.io-client';

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Map Config
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

// Socket Config
const websocket_server = import.meta.env.VITE_WEBSOCKET_SERVER || 'http://localhost:3001';
const websocket_event = import.meta.env.VITE_WEBSOCKET_EVENT || 'driver-update';

// Model
interface DriverLocation {
  driverId: string;
  latitude: number;
  longitude: number;
}

function App() {
  // { "driver-1": {lat, lon}, "driver-2": {lat, lon} }
  const [drivers, setDrivers] = useState<Record<string, DriverLocation>>({});

  useEffect(() => {
    const socket = io(websocket_server);

    socket.on(websocket_event, (data: DriverLocation) => {
      setDrivers((prev) => ({
        ...prev,
        [data.driverId]: data
      }));
    });

    return () => { socket.disconnect(); };
  }, []);

  return (
    <div style={{ height: '100vh', width: '100vw' }}>
        <h1>Delivery Tracker Live Dashboard</h1>
        <MapContainer center={[-30.0400, -51.2000]} zoom={13} style={{ height: '100%', width: '100%' }} >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {Object.values(drivers).map((d) => (
            <Marker key={d.driverId} position={[d.latitude, d.longitude]}>
              <Popup>
                <strong>ID:</strong> {d.driverId} <br />
                <strong>Lat:</strong> {d.latitude.toFixed(4)} <br />
                <strong>Lon:</strong> {d.longitude.toFixed(4)}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
  )
}

export default App
