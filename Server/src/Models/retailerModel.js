const mongoose = require('mongoose');

const retailerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, 'Retailer name already exists'],
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    // normal: normal mode manage quantity, sell online and offline
    // only-pickup: not manage quantity, not sell online, only pickup
    // not-quantity: not manage quantity, sell online and offline
    mode: {
        type: String,
        enum: ['normal', 'only-pickup', 'not-quantity'],
        default: 'normal',
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
    },
    type: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    images: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image',
        },
    ],
    logo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
});

module.exports = mongoose.model('Retailer', retailerSchema);
