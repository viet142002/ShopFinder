const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    discount: {
        type: Number,
        default: 0,
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
    distributor: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'distributorType',
        discriminatorKey: 'distributorType',
        required: true,
    },
    distributorType: {
        type: String,
        enum: ['Retailer', 'Information'],
        default: 'Retailer',
        required: true,
    },
    // when distributorType is Information then userCreate is _id of user
    userCreate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    rate: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Rate',
        },
    ],
    // only-display for product is share by user
    // not-quantity for product not manage quantity
    status: {
        type: String,
        enum: [
            'draft',
            'available',
            'sold-out',
            'stop',
            'only-display',
            'not-quantity',
        ],
        default: 'draft',
    },
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
});

module.exports = mongoose.model('Product', productSchema);
