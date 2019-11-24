const mongoose = require('mongoose');

const Account = mongoose.model('Account', {
    uid: {
        type: Number,
        required: false
    },
    userName: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    password: {
        type: Number,
        required: true,
        minLength: 4
    },
    type: {
        type: String
    }
});

module.exports = { Account };