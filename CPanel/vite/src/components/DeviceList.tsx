// DeviceList.tsx
import React, { useState } from 'react';
import axios from 'axios';
import DeviceCard from './DeviceCard';

const VITE_API_URL = import.meta.env.VITE_API_URL;

const DeviceList: React.FC = () => {
  const [devices, setDevices] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const backendUrl = `${VITE_API_URL}/api/scan`;

  const handleScanDevices = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(backendUrl);

      // Extraer las IPs del campo `details` en la respuesta
      const details = response.data.details as { ip: string }[];
      const ips = details.map(item => item.ip);

      setDevices(ips);
    } catch (error) {
      console.error('Error:', error);
      setError('Error al escanear los dispositivos. Verifica la conexión.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={listContainerStyle}>
      <h2>Dispositivos Conectados</h2>
      <button onClick={handleScanDevices} style={buttonStyle}>
        {loading ? 'Escaneando...' : 'Escanear Dispositivos'}
      </button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {devices.length === 0 && !loading && !error ? (
        <p>No hay dispositivos conectados</p>
      ) : (
        devices.map((ip, index) => <DeviceCard key={index} ip={ip} />)
      )}
    </div>
  );
};

// Estilos de la lista y el botón
const listContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '20px',
};

const buttonStyle: React.CSSProperties = {
  padding: '10px 20px',
  marginBottom: '20px',
  cursor: 'pointer',
  border: 'none',
  borderRadius: '5px',
  backgroundColor: '#007bff',
  color: '#fff',
  fontSize: '16px',
};

export default DeviceList;
