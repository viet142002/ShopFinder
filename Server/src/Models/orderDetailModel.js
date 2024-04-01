const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
    quantity: {
        type: Number,
        min: 1,
        required: true,
    },
    // price: quantity * price * (1 - discount/100)
    price: { type: Number, min: 1, required: true },
    discount: { type: Number, default: 0, required: true },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
    },
});

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = OrderDetail;
