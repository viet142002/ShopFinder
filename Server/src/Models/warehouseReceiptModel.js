const mongoose = require('mongoose');

const warehouseReceiptSchema = new mongoose.Schema(
    {
        note: {
            type: String,
            default: '',
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
