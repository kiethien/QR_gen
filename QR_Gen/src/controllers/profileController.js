const personalQR = require('../models/personalQR');
const Session = require('../models/Session');
const editProfile = async (req, res) => {
    try {
        // Access the token from the session or Session schema
        const tokenID = req.params.id;
        console.log("token"+tokenID);
        const qrCode = await personalQR.findById(req.params.id);

        if (!qrCode) {
            return res.status(404).send('QR Code not found');
        }

        res.render('profile', { qrCode, tokenID: tokenID });
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

module.exports = {
    editProfile,
    saveProfileChanges,
};
