// App.tsx
import React from 'react';
import DeviceList from './components/DeviceList';

const App: React.FC = () => {
  return (
    <div style={appStyle}>
      <DeviceList />
    </div>
  );
};

const appStyle: React.CSSProperties = {
  backgroundColor: '#121212', // Fondo oscuro para la aplicación
  color: '#fff', // Texto blanco
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
};

export default App;
