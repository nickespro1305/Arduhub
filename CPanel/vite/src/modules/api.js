import axios from 'axios';
import { logError, logInfo, logDebug } from '../utils/debug';

const API_URL = import.meta.env.VITE_API_URL;

export const scanNetwork = async () => {
  try {
    logInfo('Iniciando escaneo de red...');
    const response = await axios.post(`${API_URL}/api/scan`);
    logDebug('Resultado del escaneo:', response.data);
    return response.data;
  } catch (error) {
    logError('Error al escanear la red:', error);
    throw error;
  }
};
