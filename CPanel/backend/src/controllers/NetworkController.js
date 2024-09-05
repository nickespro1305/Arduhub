const axios = require('axios');
const { generateResponse } = require('../utils/logger');
require('dotenv').config();

const TARGET_SCAN_PORT = process.env.TARGET_SCAN_PORT || 80;
const IP_RANGE_DEF = process.env.IP_RANGE_DEF || 0;

const scanIP = async (ip, port) => {
  try {
    const response = await axios.get(`http://${ip}:${port}`, { timeout: 2000 });
    return { ip, port, status: 'open', data: response.data };
  } catch (error) {
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
    const results = await Promise.allSettled(ipRange.map(ip => scanIP(ip, TARGET_SCAN_PORT)));

    // Procesar los resultados
    const openPorts = results
      .filter(result => result.status === 'fulfilled' && result.value.status === 'open')
      .map(result => result.value);

    const responseData = {
      summary: `Escaneo completo en el puerto ${TARGET_SCAN_PORT}`,
      details: openPorts.length > 0 ? openPorts : 'No se encontraron puertos abiertos.',
      debug: results, // Incluye todos los detalles para el nivel más alto
    };

    // Generar la respuesta según el nivel de verbose global del .env
    res.json(generateResponse(responseData));
  } catch (error) {
    res.status(500).json({ message: 'Error durante el escaneo', error: error.message });
  }
};