const mongoose = require('mongoose');

const priceShippingSchema = new mongoose.Schema({
    retailer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Retailer',
    },
    price: {
        type: Number,
        required: true,
    },
    range: {
        // range of distance in km
        to: {
            type: Number,
            required: true,
        },
        // range of distance in km
        from: {
            type: Number,
            required: true,
        },
    },
});

const PriceShipping = mongoose.model('PriceShipping', priceShippingSchema);

module.exports = PriceShipping;
