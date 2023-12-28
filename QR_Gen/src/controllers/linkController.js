const qr = require('qrcode');
const mongoose = require('mongoose');
const LinkQR = require('../models/linkQR');
const {authenticateUser} = require('../controllers/authenticationController');
// Define Link QR controller methods
const showLinkQRGeneration = (req, res) => {
    res.render('qr_link');
};
const generateLinkQR = async (req, res) => {
    try {
        const { link } = req.body;
        await authenticateUser(req, res);
        const currentAccount = req.currentAccount.id;
        // Save the form data to the MongoDB database
        const linkQRData = new LinkQR({
            content: link,
            account: currentAccount,
        });

        

        // Generate QR code for link
        const qrCodeDataUrl = await qr.toDataURL(link);
        linkQRData.QRcode = qrCodeDataUrl;
        await linkQRData.save();
        // Send the QR code image URL to the client
        res.json({ qrImageUrl: qrCodeDataUrl });
        
        
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const scanLinkQR = async (req, res) => {
    try {
        const linkQRData = await LinkQR.findById(req.params.id);

        if (!linkQRData) {
            return res.status(404).send('Link QR Data not found');
        }

        res.render('scan_link', { linkQRData });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

const editLink = async (req, res) => {
    try {
        const linkQRData = await LinkQR.findById(req.params.id);

        if (!linkQRData) {
            return res.status(404).send('Link QR Data not found');
        }

        res.render('edit_link', { qrCode:linkQRData });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

const saveLinkChanges = async (req, res) => {
    try {
        const linkQRData = await LinkQR.findById(req.params.id);

        if (!linkQRData) {
            return res.status(404).send('Link QR Data not found');
        }

        // Update personal data based on form submission
        linkQRData.content = req.body.link;
        // Update qr code
        const qrCodeDataUrl = await qr.toDataURL(req.body.link);
        linkQRData.QRcode = qrCodeDataUrl;

        // Save the changes
        await linkQRData.save();

        // Redirect back to the QR code list
        res.redirect('/qrList/list');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};



module.exports = {
    showLinkQRGeneration,
    generateLinkQR,
    scanLinkQR,
    editLink,
    saveLinkChanges,
};
