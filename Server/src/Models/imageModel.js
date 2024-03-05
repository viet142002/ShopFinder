const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
    path: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        default: 'image',
    },
});

module.exports = mongoose.model('Image', imageSchema);
