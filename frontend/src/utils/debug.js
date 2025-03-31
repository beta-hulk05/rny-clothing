/**
 * Debug utility functions for troubleshooting frontend issues
 */

// Enhanced console logger with timestamps and prefixes
export const logger = {
  info: (message, ...args) => {
    console.log(`[INFO ${new Date().toLocaleTimeString()}]`, message, ...args);
  },
  
  error: (message, ...args) => {
    console.error(`[ERROR ${new Date().toLocaleTimeString()}]`, message, ...args);
  },
  
  warn: (message, ...args) => {
    console.warn(`[WARN ${new Date().toLocaleTimeString()}]`, message, ...args);
  },
  
  debug: (message, ...args) => {
    if (process.env.NODE_ENV !== 'production') {
      console.debug(`[DEBUG ${new Date().toLocaleTimeString()}]`, message, ...args);
    }
  }
};

// Check if an object is empty
export const isEmpty = (obj) => {
  if (obj === null || obj === undefined) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return false;
};

// Function to safely access nested object properties
export const safeGet = (obj, path, defaultValue = null) => {
  if (!obj) return defaultValue;
  
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result === null || result === undefined) return defaultValue;
    result = result[key];
  }
  
  return result !== undefined ? result : defaultValue;
};

// Add this to window when in development mode
if (process.env.NODE_ENV !== 'production') {
  window.debugUtils = {
    logger,
    isEmpty,
    safeGet
  };
  
  logger.info('Debug utilities loaded. Access via window.debugUtils');
}
