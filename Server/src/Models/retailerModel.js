const mongoose = require('mongoose');

const retailerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, 'Retailer name already exists'],
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
    },
    timework: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TimeWork',
    },
    type: {
        type: String,
        required: true,
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    },
    phone: {
        type: String,
        default: '',
    },
    email: {
        type: String,
        default: '',
    },
    logo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
    },
});

module.exports = mongoose.model('Retailer', retailerSchema);
