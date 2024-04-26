const mongoose = require('mongoose');

const retailerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: [true, 'Retailer name already exists'],
        },
        // user who created this retailer
        owner: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        // normal: normal mode manage quantity, sell online and offline
        // only-pickup: not manage quantity, not sell online, only pickup
        mode: {
            type: String,
            enum: ['normal', 'only-pickup'],
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
        email: {
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
            default: '65fd4951f687ef962765aa4a',
        },
        status: {
            type: String,
            enum: ['pending', 'approved', 'rejected', 'blocked'],
            default: 'pending',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Retailer', retailerSchema);
