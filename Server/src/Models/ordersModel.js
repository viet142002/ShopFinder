const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        orderDetails: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'OrderDetail',
            },
        ],
        total: {
            type: Number,
            default: 0,
        },
        status: {
            type: String,
            enum: ['Pending', 'Delivering', 'Success', 'Failed'],
            default: 'Pending',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Order', orderSchema);
