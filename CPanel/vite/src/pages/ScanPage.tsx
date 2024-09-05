// src/ScanPage.tsx
import React, { useState } from 'react';
import { scanNetwork } from '../modules/api'; // Importa el archivo JS
import { logInfo, logError } from '../utils/debug';

interface ScanResult {
  message: string;
  summary?: string;
  details?: any;
  debug?: any;
}

const ScanPage: React.FC = () => {
  const [scanResult, setScanResult] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleScan = async () => {
    setLoading(true);
    setError(null);

    try {
      logInfo('Iniciando escaneo desde la interfaz...');
      const result = await scanNetwork();
      logInfo('Escaneo completado con éxito:', result);
      setScanResult(result);
    } catch (err) {
      logError('Error al escanear la red desde la interfaz:', err);
      setError('Error al escanear la red.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Escaneo de Red</h1>
      <button onClick={handleScan} disabled={loading}>
        {loading ? 'Escaneando...' : 'Iniciar Escaneo'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {scanResult && (
        <div style={{ marginTop: '20px' }}>
          <h2>Resultado del Escaneo</h2>
          <pre>{JSON.stringify(scanResult, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default ScanPage;
