const mongoose = require('mongoose');

const retailerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, 'Retailer name already exists'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
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
