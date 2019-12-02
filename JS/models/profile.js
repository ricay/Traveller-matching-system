const mongoose = require('mongoose');
// const datetime = require("date-and-time");

const ProfileSchema = new mongoose.Schema({
    userName: {
        type: String,
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
        type: String,
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

ProfileSchema.statics.deleteByUserName = function(userName) {
    const Profile = this;

    return Profile.deleteOne({ userName: userName }).then((profile) => {
        if (!profile) {
            return Promise.reject()
        } else {
            return Promise.resolve(profile);
        }
    })
};

const Profile = mongoose.model('Profile', ProfileSchema);
module.exports = { Profile };