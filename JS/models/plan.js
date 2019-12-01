const mongoose = require('mongoose');
const datetime = require("date-and-time");

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
        type: Number
    },
    startTime: {
        type: datetime
    },
    endTime: {
        type: datetime
    },
    poolMember: {
        type: Array
    }
});

module.exports = { Plan };