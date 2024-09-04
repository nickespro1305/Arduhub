const axios = require('axios');
require('dotenv').config();

const TARGET_SCAN_PORT = process.env.TARGET_SCAN_PORT || 80;
const IP_RANGE_DEF = process.env.IP_RANGE_DEF || 0;
const DEBUG_MODE = process.env.DEBUG_MODE === 'true';

const scanIP = async (ip, port) => {
    try {
      // Intentar enviar una solicitud GET a la IP y puerto especificados con un timeout
      const response = await axios.get(`http://${ip}:${port}`, { timeout: 2000 });
      return { ip, port, status: 'open', data: response.data };
    } catch (error) {
      // Capturar errores de conexión o timeout
      if (DEBUG_MODE) {
        console.error(`Error escaneando ${ip}:${port} - ${error.message}`);
      }
      if (error.code === 'ECONNREFUSED' || error.code === 'ETIMEDOUT') {
        return { ip, port, status: 'closed' };
      } else {
        return { ip, port, status: 'error', error: error.message };
      }
    }
  };

  exports.ScanNetwork = async (req, res) => {
    const baseIP = `192.168.${IP_RANGE_DEF}.`; // Base del rango de IPs
    const ipRange = Array.from({ length: 254 }, (_, i) => `${baseIP}${i + 1}`);
  
    try {
      // Ejecutar todas las solicitudes concurrentemente
      const results = await Promise.allSettled(ipRange.map(ip => scanIP(ip, TARGET_SCAN_PORT)));
  
      // Filtrar los resultados para mostrar solo los puertos abiertos
      const openPorts = results
        .filter(result => result.status === 'fulfilled' && result.value.status === 'open')
        .map(result => result.value);
  
      // Responder con los resultados del escaneo
      res.json({
        message: `Escaneo completo en el puerto ${TARGET_SCAN_PORT}`,
        results: openPorts,
        debug: DEBUG_MODE ? results : undefined,  // Incluir información de debug solo si está activado
      });
    } catch (error) {
      res.status(500).json({ message: 'Error durante el escaneo', error: error.message });
    }
  };