const express = require('express');
const router = express.Router();
const textController = require('../controllers/textController');

// Define Link QR routes
router.get('/generate', textController.showTextQRGeneration);
router.post('/generate', textController.generateTextQR);


module.exports = router;
