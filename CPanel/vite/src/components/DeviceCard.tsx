// DeviceCard.tsx
import React from 'react';

interface DeviceCardProps {
  ip: string;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ ip }) => {
  return (
    <div style={cardStyle}>
      <p style={ipStyle}>{ip}</p>
    </div>
  );
};

// Estilos de la tarjeta
const cardStyle: React.CSSProperties = {
  backgroundColor: '#333', // Fondo oscuro para la tarjeta
  color: '#fff', // Texto blanco para contrastar con el fondo oscuro
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  padding: '15px',
  marginBottom: '10px',
  width: '300px',
  maxWidth: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const ipStyle: React.CSSProperties = {
  fontSize: '16px',
  fontWeight: 'bold',
};

export default DeviceCard;
