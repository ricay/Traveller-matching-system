const mongoose = require('mongoose');
const datetime = require("date-and-time");

const Plan = mongoose.model('Plan', {
    pid: {
        type: Number,
        required: false
    },
    name: {
        type: String
    },
    creator: {
        type: Number
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