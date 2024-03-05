const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    loc: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: {
            type: [Number],
            required: true,
        },
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    information: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'informationType',
        discriminatorKey: 'informationType',
        required: true,
    },
    informationType: {
        type: String,
        enum: ['Retailer', 'Information_Community'],
        required: true,
    },
});
locationSchema.index({ loc: '2dsphere' });
module.exports = mongoose.model('Location', locationSchema);
