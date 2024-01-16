const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    province: {
        type: String,
        required: true,
    },
    district: {
        type: String,
        required: true,
    },
    ward: {
        type: String,
        required: true,
    },
    street: {
        type: String,
    },
    number: {
        type: String,
    },
    more: {
        type: String,
    },
});

module.exports = mongoose.model('Address', addressSchema);
