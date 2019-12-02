'use strict';

const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');

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
        if (!account) {
            return Promise.reject()
        } else {
          if (account.password === password) {
              return Promise.resolve(account);
          }
        }
        // return new Promise((resolve, reject) => {
        //     bcrypt.compare(password, account.password, (err, result) => {
        //         if (result) {
        //             resolve(account)
        //         } else {
        //             console.log(2);
        //             reject()
        //         }
        //     })
        // })
    })
};

// AccountSchema.statics.findByAdminNamePassword = function(userName, password) {
//     const Account = this;
//
//     return Account.findOne({ userName: userName }).then((account) => {
//         if (!account) {
//             return Promise.reject()
//         } else {
//             if (account.password === password && account.type === "admin") {
//                 return Promise.resolve(account);
//             }
//         }
//         // return new Promise((resolve, reject) => {
//         //     bcrypt.compare(password, account.password, (err, result) => {
//         //         if (result) {
//         //             resolve(account)
//         //         } else {
//         //             console.log(2);
//         //             reject()
//         //         }
//         //     })
//         // })
//     })
// };

// make a model using the User schema
const Account = mongoose.model('Account', AccountSchema);
module.exports = { Account };