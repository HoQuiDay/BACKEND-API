const mongoose = require('mongoose');
const userDbSchema = new mongoose.Schema({
    email: String,
    password: String,
    fullName: String,
    address: String,
    gender: String,
    roleId: String,
    image: String,
    phoneNumber: String,
    positionId: String
});
const User = mongoose.model('userDb', userDbSchema);
module.exports = User;