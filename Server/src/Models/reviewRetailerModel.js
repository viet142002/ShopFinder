const mongoose = require('mongoose');

const reviewRetailerSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        retailer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Retailer',
            required: true,
        },
        reply: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ReviewRetailer',
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('ReviewRetailer', reviewRetailerSchema);
