// src/utils/responseHelper.js
require('dotenv').config();

// Leer el nivel de verbose desde el archivo .env
const VERBOSE_LEVEL = process.env.VERBOSE_LEVEL || 'none';

// Función para generar la respuesta según el nivel de verbose
const generateResponse = (data) => {
  switch (VERBOSE_LEVEL) {
    case 'none':
      return { message: 'Operación completada.' }; // Respuesta mínima
    case 'low':
      return { message: 'Operación completada.', summary: data.summary }; // Respuesta básica
    case 'medium':
      return { message: 'Operación completada.', summary: data.summary, details: data.details }; // Detalles adicionales
    case 'high':
      return { message: 'Operación completada.', summary: data.summary, details: data.details, debug: data.debug }; // Toda la información
    default:
      return { message: 'Operación completada.', summary: data.summary }; // Respuesta por defecto
  }
};

module.exports = {
  generateResponse,
};
