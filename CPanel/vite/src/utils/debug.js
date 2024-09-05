const debugLevel = import.meta.env.VITE_DEBUG_LEVEL || 'none';

const levels = {
  none: 0,
  error: 1,
  warn: 2,
  info: 3,
  debug: 4,
};

const log = (level, ...args) => {
  if (levels[level] <= levels[debugLevel]) {
    console[level](...args);
  }
};

export const logError = (...args) => log('error', ...args);
export const logWarn = (...args) => log('warn', ...args);
export const logInfo = (...args) => log('info', ...args);
export const logDebug = (...args) => log('debug', ...args);
