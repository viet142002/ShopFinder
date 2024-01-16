const mongoose = require('mongoose');

const OrderDetail = new mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: {
        type: Number,
        default: 0,
    },
    total: {
        type: Number,
        default: 0,
    },
    discount: {
        type: Number,
        default: 0,
    },
});

module.exports = mongoose.model('OrderDetail', OrderDetail);
