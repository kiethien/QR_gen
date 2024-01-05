require('dotenv').config();
const personalQR = require('../models/personalQR');
const Session = require('../models/Session');
const qr = require('qrcode');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const jwt = require('jsonwebtoken');
const {authenticateUser} = require('../controllers/authenticationController');
// Define personal QR controller methods
const showPersonalQRGeneration = (req, res) => {
    
    res.render('personal_qr_code');

};

const generatePersonalQR = async (req, res) => {
    try {
        // Access the token from the session or Session schema
        const session = await Session.findOne({ sessionToken: 'some-session-token' });
        const jwtToken = session.jwtToken;
        
        if (!jwtToken) {
            return res.status(401).send('Access Denied');
        }

        try {
            // Verify the token
            const verified = await jwt.verify(jwtToken, process.env.TOKEN_SECRET);
            
            decoded = jwt.decode(jwtToken, { complete: true });
            const currentAccount = decoded.payload.id;
    
            if (currentAccount) {
                const { name, email, phone, address, website, company, position } = req.body;

                // Save the form data to the MongoDB database
                const personalQRData = new personalQR({
                    name,
                    email,
                    phone,
                    address,
                    website,
                    company,
                    position,
                    account: currentAccount,
                });

                const profileUrl = `http://localhost:5000/personalQR/profile/${personalQRData._id}`;
                const qrCodeDataUrl = await qr.toDataURL(profileUrl);
                personalQRData.QRcode = qrCodeDataUrl;
                personalQRData.Link = profileUrl;
                await personalQRData.save();
                // Send the QR code image URL to the client
                res.json({ qrImageUrl: qrCodeDataUrl });

                // Redirect to the scan page with the ID of the saved document
                // res.redirect(`/personalQR/scan/${personalQRData._id}`);
                // res.render('personal_qr_code', { qrCodeDataUrl: qrCodeDataUrl });

            } else {
                res.status(401).send('Unauthorized');
            }
        } catch (err) {
            // Handle JWT expiration error
            if (err.name === 'TokenExpiredError') {
                return res.status(401).send('Access Denied: Token Expired');
            }

            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};


const scanPersonalQR = async (req, res) => {
    try {
        // Retrieve the saved data from the database using the provided ID
        const personalQRData = await personalQR.findById(req.params.id);

        if (!personalQRData) {
            return res.status(404).send('QR Data not found');
        }

        // Construct the URL for the profile using the provided ID
        const profileUrl = `http://localhost:5000/personalQR/profile/${req.params.id}`;

        // Generate the QR code data for the profile URL
        const qrCodeDataUrl = await qr.toDataURL(profileUrl);

        // Render the scan page with the QR code data and document ID
        res.render('scan', { qrCodeDataUrl, id: req.params.id });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const showProfile = async (req, res) => {
    try {
        // Retrieve the saved data from the database using the provided ID
        const personalQRData = await personalQR.findById(req.params.id);
        
        if (!personalQRData) {
            return res.status(404).send('QR Data not found');
        }

        // Generate the QR code data
        const data = `name: ${personalQRData.name}
        email: ${personalQRData.email}
        phone: ${personalQRData.phone}
        address: ${personalQRData.address}
        website: ${personalQRData.website}
        company: ${personalQRData.company}
        position: ${personalQRData.position}`;

        res.render('profile', { name: personalQRData.name, email: personalQRData.email, phone: personalQRData.phone, address: personalQRData.address, website: personalQRData.website, company: personalQRData.company, position: personalQRData.position });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    showPersonalQRGeneration,
    generatePersonalQR,
    scanPersonalQR,
    showProfile,
};
