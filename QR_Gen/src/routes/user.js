const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Define user routes
router.get('/register', userController.showRegistration);
router.post('/register', userController.performRegistration);

module.exports = router;
