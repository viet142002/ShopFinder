const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        phone: { type: String, required: true },
        fullName: { type: String, required: true },
        orderItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'OrderDetail',
                required: true,
            },
        ],
        shippingAddress: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Address',
        },
        location: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
        },
        paymentMethod: {
            type: String,
            enum: ['VNPay', 'COD'],
            default: 'COD',
            required: true,
        },
        // detailPayment is the payment detail of VNPay
        detailPayment: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'DetailPayment',
        },
        itemsPrice: { type: Number, required: true },
        shippingPrice: { type: Number, required: true },
        // total price is the sum of itemsPrice, shippingPrice, and taxPrice
        totalPrice: { type: Number, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        distributor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Retailer',
            required: true,
        },
        status: {
            type: String,
            enum: [
                'pendingPayment',
                'pending',
                'shipping',
                'success',
                'cancelled',
            ],
            default: 'pending',
            required: true,
        },
        note: { type: String, default: '' },
        deliveredAt: { type: Date },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
