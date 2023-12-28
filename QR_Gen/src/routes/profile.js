const express = require('express');
const router = express.Router();
const qrListController = require('../controllers/qrListController');
const profileController = require('../controllers/profileController');


router.get('/list', qrListController.listQRCodes);
router.get('/edit/:id/:tokenID', profileController.editProfile);
router.post('/edit/:id/:tokenID', profileController.saveProfileChanges);

module.exports = router;
