const Account = require('../models/account');
const bcrypt = require('bcrypt');

// Define user controller methods
const showRegistration = (req, res) => {
    const token = req.session.token;
    res.render('register');
};

const performRegistration = async (req, res) => {
    const token = req.session.token;
    try {
        const { username, password, password2, email } = req.body;

        // Save the form data to the MongoDB database
        const account = new Account({
            username,
            email,
            password: await bcrypt.hash(password, 10),
        });

        // Check already in the database
        const user = await Account.findOne({ username: username });
        const mail = await Account.findOne({ email: email });
        if (user) {
            return res.send('Username already exists');
        }
        else if (mail) {
            return res.send('Email already exists');
        }
        else if (password !== password2) {
            return res.send('Password does not match');
        }
        else{
        await account.save();
        res.redirect('/');}
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

module.exports = {
    showRegistration,
    performRegistration,
};
