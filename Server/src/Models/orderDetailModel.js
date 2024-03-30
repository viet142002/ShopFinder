const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema(
    {
        distributor: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Retailer',
            required: true,
        },
        products: [
            {
                quantity: { type: Number, required: true },
                price: { type: Number, required: true },
                discount: { type: Number, required: true },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

const OrderDetail = mongoose.model('OrderDetail', orderDetailSchema);

module.exports = OrderDetail;
