const qr = require('qrcode');
const mongoose = require('mongoose');
const TextQR = require('../models/textQR');
const {authenticateUser} = require('../controllers/authenticationController');
// Define Text QR controller methods
const showTextQRGeneration = (req, res) => {
    res.render('qr_text');
};
const generateTextQR = async (req, res) => {
    try {
        const { text } = req.body;
        await authenticateUser(req, res);
        const currentAccount = req.currentAccount.id;
        // Save the form data to the MongoDB database
        const textQRData = new TextQR({
            content: text,
            account: currentAccount,
        });

        

        // Generate QR code for text
        const qrCodeDataUrl = await qr.toDataURL(text);
        res.render('qr_text', { qrCodeDataUrl: qrCodeDataUrl});
        textQRData.QRcode = qrCodeDataUrl;
        await textQRData.save();
        // Send the QR code image URL to the client
        // res.json({ qrImageUrl: qrCodeDataUrl });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}   

module.exports = {
    showTextQRGeneration,
    generateTextQR,
};

