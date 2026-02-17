import { useState, useEffect } from 'react'
import './App.css'
import { io } from 'socket.io-client';

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
    <>
      <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Delivery Tracker Live Dashboard</h1>
      <div style={{ display: 'grid', gap: '10px' }}>
        {Object.values(drivers).map((d) => (
          <div key={d.driverId} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <strong>🚚 {d.driverId}</strong>
            <p>Lat: {d.latitude.toFixed(4)} | Lon: {d.longitude.toFixed(4)}</p>
          </div>
        ))}
      </div>
    </div>
    </>
  )
}

export default App
