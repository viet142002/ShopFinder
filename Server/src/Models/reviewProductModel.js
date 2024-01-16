const mongoose = require('mongoose');

const reviewProductSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true,
        },
        review: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
            required: true,
        },
        reply: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ReviewProduct',
            },
        ],
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('ReviewProduct', reviewProductSchema);
