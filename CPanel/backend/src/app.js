// src/app.js
const express = require('express');
const StableRoutes = require('./routes/StableRoutes.js');
const debugMiddleware = require('./middleware/debugMiddleware');

const app = express();
app.use(express.json());
app.use(debugMiddleware);

// Rutas
app.use('/api', StableRoutes);

module.exports = app;
