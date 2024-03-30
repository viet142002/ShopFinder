const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        phone: { type: String, required: true },
        fullName: { type: String, required: true },
        orderItems: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'DetailOrder',
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
        itemsPrice: { type: Number, required: true },
        shippingPrice: [
            {
                retailer: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Retailer',
                    required: true,
                },
                price: { type: Number, required: true },
            },
        ],
        // total price is the sum of itemsPrice, shippingPrice, and taxPrice
        totalPrice: { type: Number, required: true },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
