const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
    sessionToken: String,
    userId: String,
    expires: Date,
    jwtToken: String, // Add this field to store the JWT token
});

const Session = mongoose.model('Session', sessionSchema, 'Session');

module.exports = Session;
