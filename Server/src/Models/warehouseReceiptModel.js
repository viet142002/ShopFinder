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
        status: {
            type: String,
            enum: ['pending', 'completed'],
            default: 'pending',
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Product',
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
