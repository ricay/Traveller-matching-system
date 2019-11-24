const mongoose = require('mongoose');

const Location = mongoose.model('Location', {
    lid: {
        type: Number,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    plans: {
        type: Array
    }
});

module.exports = { Location };