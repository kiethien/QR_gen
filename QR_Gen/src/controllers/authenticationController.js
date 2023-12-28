const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Account = require('../models/account');
const Session = require('../models/Session');
const { application } = require('express');
const {Types} = require('mongoose');

require('dotenv').config();
// Define authentication controller methods
const login = (req, res) => {
    res.render('login');
};

const authenticateUser = async (req, res, next) => {
    try {
        // Get the tokenID from the params
        const tokenID = req.params.id;
        console.log(tokenID);
        // Get the session from the database
        const session = await Session.findOne({ _id: tokenID });
        console.log("session:"+session);
        // Get the JWT token from the session
        const token = session.jwtToken;
        console.log(token);
        console.log(session);
        console.log(tokenID);


        

        // If the token is null or undefined, return an unauthorized error
        if (!token) {
            req.currentAccount = null;}
        else{
        // Verify the token
        const decoded = await jwt.verify(token, process.env.TOKEN_SECRET);
        // Get the user details from the decoded token
        const id = decoded.id;
        const username = decoded.username;
        const email = decoded.email;

        // Set the user details to the request object
        req.currentAccount = {
            id,
            username,
            email,
        };
        }
    }catch (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        }
    }




const performLogin = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the username is in the database
        const user = await Account.findOne({ username: username });
        if (!user) {
            return res.send('Username does not exist');
        }

        // Check if the password is correct
        if (await bcrypt.compare(password, user.password)) {
            // Create token data
            const tokenData = {
                id: user._id,
                username: user.username,
            };

            // Create a token
            const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: '1h' });
            
            // Save the token to the session
            const session = new Session({
                sessionToken: 'some-session-token', // generate or extract from Google API
                userId: user._id,
                expires: new Date(Date.now() + 3600000), // 1 hour expiration
                jwtToken: token, // Store the JWT token
            });

            await session.save();

            console.log(session._id);

            // Redirect to /qr_generate
            res.redirect(`/qr/qr_generate/${session._id}`);
        } else {
            return res.send('Wrong password');
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send('Internal Server Error');
    }
};

const logout = (req, res) => {
    res.clearCookie('token');
    res.redirect('/');
};

module.exports = {
    login,
    performLogin,
    logout,
    authenticateUser,
};
