const mongoose = require('mongoose');

const timeWorkSchema = new mongoose.Schema({
    time: {
        type: String,
        required: true,
    },
    days: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('TimeWork', timeWorkSchema);
