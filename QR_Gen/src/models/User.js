const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    emailVerified: null,
    Image: String,

});

const User = mongoose.model('User', userSchema, 'User');

module.exports = User;
