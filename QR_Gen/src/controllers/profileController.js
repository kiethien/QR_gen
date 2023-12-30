const personalQR = require('../models/personalQR');
const linkQR = require('../models/linkQR');
const textQR = require('../models/textQR');
const Session = require('../models/Session');
const mongoose = require('mongoose');
const editProfile = async (req, res) => {
    try {
        // Access the token from the session or Session schema
        
        const qrCodeData = await personalQR.findById(req.params.id);
        
        if (!qrCodeData) {
            return res.status(404).send('QR Code not found');
        }
        //send the data to client side
        res.json(qrCodeData);
        // res.render('profile', { name: qrCode.name, email: qrCode.email, phone: qrCode.phone, address: qrCode.address, website: qrCode.website, company: qrCode.company, position: qrCode.position});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const saveProfileChanges = async (req, res) => {

    try {
        const qrCode = await personalQR.findById(req.params.id);

        if (!qrCode) {
            return res.status(404).send('QR Code not found');
        }

        // Update personal data based on form submission
        qrCode.name = req.body.name;
        qrCode.email = req.body.email;
        qrCode.phone = req.body.phone;
        qrCode.address = req.body.address;
        qrCode.website = req.body.website;
        qrCode.company = req.body.company;
        qrCode.position = req.body.position;

        // Save the changes
        await qrCode.save();

    
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

//back to list
const backToList = async (req, res) => {
    try {
        // Access the token from the session or Session schema
        
        
        const qrCode = await personalQR.findById(req.params.id);

        if (!qrCode) {
            return res.status(404).send('QR Code not found');
        }

        res.render('qrList', { qrCode });
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}

const deleteQRCode = async (req, res) => {
    try {
        const qrCodePersonal = await personalQR.findById(req.params.id);
        const qrCodeLink = await linkQR.findById(req.params.id);
        const qrCodeText = await textQR.findById(req.params.id);
        if (!qrCodePersonal && !qrCodeLink && !qrCodeText) {
            return res.status(404).send('QR Code not found');
        }
        if (qrCodePersonal) {
            await qrCodePersonal.deleteOne();
        }
        if (qrCodeLink) {
            await qrCodeLink.deleteOne();
        }
        if (qrCodeText) {
            await qrCodeText.deleteOne();
        }
        


        
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};
module.exports = {
    editProfile,
    saveProfileChanges,
    backToList,
    deleteQRCode,
};
