const DEBUG_MODE = process.env.DEBUG_MODE === 'true';

const debugMiddleware = (req, res, next) => {
  if (DEBUG_MODE) {
    console.log(`Request URL: ${req.url}`);
    console.log(`Request Method: ${req.method}`);
    console.log(`Request Headers: ${JSON.stringify(req.headers)}`);
  }
  next();
};

module.exports = debugMiddleware;
