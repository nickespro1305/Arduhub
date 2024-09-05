// src/app.js

require('dotenv').config();
const express = require('express');
const StableRoutes = require('./routes/StableRoutes.js');
const debugMiddleware = require('./middleware/debugMiddleware');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(debugMiddleware);
app.use(cors());

// Rutas
app.use('/api', StableRoutes);

module.exports = app;
