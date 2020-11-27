const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema =  mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    contact_number:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    date_created:{
        type: Date,
        default: Date.now
    },
    date_updated:{
        type: Date,
        required: true
    }
});


const User = mongoose.model('user', UserSchema);

module.exports = User;