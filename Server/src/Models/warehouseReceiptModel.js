const mongoose = require('mongoose');

const warehouseReceiptSchema = new mongoose.Schema(
    {
        note: {
            type: String,
            default: '',
        },
        type: {
            type: String,
            enum: ['import', 'export'],
            required: true,
        },
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order',
            },
        ],
        total_price: {
            type: Number,
            required: true,
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
                },
                price_import: {
                    type: Number,
                    required: true,
                },
                quantity: {
                    type: Number,
                    required: true,
                },
            },
        ],
        retailer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Retailer',
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('WarehouseReceipt', warehouseReceiptSchema);
