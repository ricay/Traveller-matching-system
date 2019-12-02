const mongoose = require('mongoose');
// const datetime = require("date-and-time");

const Plan = mongoose.model('Plan', {
    // pid: {
    //     type: String,
    //     required: false
    // },
    name: {
        type: String
    },
    creator: {
        type: String
    },
    places: {
        type: Array
    },
    transportation: {
        type: String
    },
    cost: {
        type: String
    },
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    poolMember: {
        type: Array
    }
});

module.exports = { Plan };