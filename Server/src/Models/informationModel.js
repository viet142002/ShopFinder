const mongoose = require('mongoose');

const informationSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: [true, 'Store name already exists'],
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Location',
    },
    type: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        default: '',
    },
    description: {
        type: String,
        default: '',
    },
    images: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Image',
        },
    ],
});

module.exports = mongoose.model('Information', informationSchema);
