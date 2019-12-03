'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AccountSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        minLength: 1,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLength: 4
    },
    type: {
        type: String
    }
});

AccountSchema.statics.findByUserNamePassword = function(userName, password) {
    const Account = this;

    return Account.findOne({ userName: userName }).then((account) => {
        // if (!account) {
        //     return Promise.reject()
        // } else {
        //   if (account.password === password) {
        //       return Promise.resolve(account);
        //   }
        // }
        return new Promise((resolve, reject) => {
            bcrypt.compare(password, account.password, (err, result) => {
                if (result) {
                    resolve(account)
                } else {
                    console.log(2);
                    reject()
                }
            })
        })
    })
};

AccountSchema.statics.deleteByUserName = function(userName) {
    const Account = this;

    return Account.deleteOne({ userName: userName }).then((account) => {
        if (!account) {
            return Promise.reject()
        } else {
            return Promise.resolve(account);
        }
    })
};

AccountSchema.statics.findByAdminNamePassword = function(userName, password) {
    const Account = this;

    return Account.findOne({ userName: userName }).then((account) => {
        // if (!account) {
        //     return Promise.reject()
        // } else {
        //     if (account.password === password && account.type === "admin") {
        //         return Promise.resolve(account);
        //     }
        // }
         return new Promise((resolve, reject) => {
             bcrypt.compare(password, account.password, (err, result) => {
                 if (result) {
                     resolve(account)
                 } else {
                     console.log(2);
                     reject()
                 }
             })
         })
    })
};

// This function runs before saving user to database
AccountSchema.pre('save', function(next) {
    const user = this

    if (user.isModified('password')) {
        bcrypt.genSalt(10, (error, salt) => {
            bcrypt.hash(user.password, salt, (error, hash) => {
                user.password = hash
                next()
            })
        })
    } else {
        next();
    }

})

// make a model using the User schema
const Account = mongoose.model('Account', AccountSchema);
module.exports = { Account };