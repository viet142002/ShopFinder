const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
    },
    discount: {
        type: Number,
    },
    description: {
        type: String,
    },
    category: {
        type: String,
    },
    images: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image',
        },
    ],
    retailer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Retailer',
    },
    quantity: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number,
        default: 0,
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
});

module.exports = mongoose.model('Product', productSchema);
