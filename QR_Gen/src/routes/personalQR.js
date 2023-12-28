const express = require('express');
const router = express.Router();
const personalQRController = require('../controllers/personalQRController');

// Define personal QR routes
router.get('/generate/:id', personalQRController.showPersonalQRGeneration);
router.post('/generate/:id', personalQRController.generatePersonalQR);
router.get('/scan/:id', personalQRController.scanPersonalQR);
router.get('/profile/:id', personalQRController.showProfile);

module.exports = router;
