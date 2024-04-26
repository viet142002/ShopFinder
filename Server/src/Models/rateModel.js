const mongoose = require('mongoose');

const rateSchema = new mongoose.Schema(
    {
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            refPath: 'toType',
            discriminatorKey: 'toType',
            required: true,
        },
        toType: {
            type: String,
            enum: ['Retailer', 'Product', 'Information'],
            required: true,
        },
        rate: {
            type: Number,
            enum: [1, 2, 3, 4, 5],
            required: true,
        },
        comment: {
            type: String,
        },
        images: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Image',
            },
        ],
        reply: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Rate',
            },
        ],
        likes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        dislikes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',
            },
        ],
        status: {
            type: String,
            enum: ['blocked', 'normal'],
            default: 'normal',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Rate', rateSchema);
