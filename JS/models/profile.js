const mongoose = require('mongoose');
const datetime = require("date-and-time");

const Profile = mongoose.model('Profile', {
    uid: {
        type: Number,
        required: false
    },
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
    },
    birthday: {
        type: datetime,
    },
    email: {
        type: String,

    },
    phone: {
        type: String,
    },
    language: {
        type: String,
    },
    description: {
        type: String,
    }

});

module.exports = { Profile };