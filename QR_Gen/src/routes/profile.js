const express = require('express');
const router = express.Router();
const qrListController = require('../controllers/qrListController');
const profileController = require('../controllers/profileController');


router.get('/list', qrListController.listQRCodes);
router.get('/edit/:id', profileController.editProfile);
router.post('/edit/:id', profileController.saveProfileChanges);
router.get('/back/:id', profileController.backToList);
router.get('/delete/:id', profileController.deleteQRCode);

module.exports = router;
