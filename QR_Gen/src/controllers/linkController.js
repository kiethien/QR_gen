const qr = require('qrcode');
const mongoose = require('mongoose');
const LinkQR = require('../models/linkQR');
const Session = require('../models/Session');
const jwt = require('jsonwebtoken');
const {authenticateUser} = require('../controllers/authenticationController');
// Define Link QR controller methodss
const showLinkQRGeneration = (req, res) => {
    res.render('qr_link');
};
const generateLinkQR = async (req, res) => {
    try {
        // Access the token from the session or Session schema
        const session = await Session.findOne({ sessionToken: 'some-session-token' });
        const jwtToken = session.jwtToken;
        console.log(jwtToken);
        if (!jwtToken) {
            return res.status(401).send('Access Denied');
        }
        try{                                                        //author : Koha
            // Verify the token
            const verified = await jwt.verify(jwtToken, process.env.TOKEN_SECRET);
            decoded = jwt.decode(jwtToken, { complete: true });
            const currentAccount = decoded.payload.id;
            if (currentAccount) {
        const { link } = req.body;
        
        // Save the form data to the MongoDB database
        const linkQRData = new LinkQR({
            content: link,
            account: currentAccount,
        });

        

        // Generate QR code for link
        const qrCodeDataUrl = await qr.toDataURL(link);
        linkQRData.QRcode = qrCodeDataUrl;
        linkQRData.Link = link;
        await linkQRData.save();
        // Send the QR code image URL to the client
        res.json({ qrImageUrl: qrCodeDataUrl });
    }
    else {
        res.status(401).send('Unauthorized');
    }
}
catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
}
        
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
        res.json(linkQRData);
        // res.render('edit_link', { qrCode:linkQRData });
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
