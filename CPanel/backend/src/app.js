// src/app.js
const express = require('express');
const StableRoutes = require('./routes/StableRoutes.js');

const app = express();
app.use(express.json());

// Rutas
app.use('/api', StableRoutes);

module.exports = app;
