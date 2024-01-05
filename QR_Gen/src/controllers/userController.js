const Account = require('../models/account');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const myProfile = require('../models/myProfile');

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

// Profile page for general information
const SaveProfile = async (req, res) => {
    const token = req.session.token;
    const jwtToken =session.token;
    const session = await Session.findOne({ sessionToken: 'some-session-token' });  
    if (!jwtToken) {
        return res.status(401).send('Access Denied');
    }
    try{                                                        //author : Koha
        // Verify the token
        const verified = await jwt.verify(jwtToken, process.env.TOKEN_SECRET);
        decoded = jwt.decode(jwtToken, { complete: true });
        const currentAccount = decoded.payload.id;
        if (currentAccount) {
    try {
        const { firstname, lastname, address, phone } = req.body;
        const account = await Account.findById(currentAccount);
        const profile = new myProfile({
            firstname,
            lastname,
            address,
            phone,
            account: currentAccount,
        });
        await profile.save();
        res.redirect('/myProfile');
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
}
else {
    res.status(401).send('Unauthorized');
}
}
catch(err){
    console.error(err);
    res.status(500).send('Internal Server Error');
}
}




module.exports = {
    showRegistration,
    performRegistration,
};
