const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
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
        enum: ['Retailer', 'Product', 'Information_Community'],
        required: true,
    },
    rating: {
        type: Number,
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
            ref: 'Review',
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
});

module.exports = mongoose.model('Review', reviewSchema);
