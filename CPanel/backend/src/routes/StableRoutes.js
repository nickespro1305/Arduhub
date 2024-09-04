const express = require('express');
const router = express.Router();
const StableController = require('../controllers/NetworkController');

// Definición de rutas y asignación a los controladores
router.post('/scan', StableController.ScanNetwork);

module.exports = router;
