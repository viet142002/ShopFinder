const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: [true, 'Email already exists'],
    },
    password: {
        type: String,
        required: true,
    },
    firstname: {
        type: String,
        default: '',
    },
    lastname: {
        type: String,
        default: '',
    },
    avatar: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image',
    },
    status: {
        type: String,
        enum: ['active', 'blocked'],
        default: 'active',
    },
    pendingRetailer: {
        retailer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Retailer',
        },
        status: {
            type: String,
            enum: ['not-register', 'pending', 'rejected', 'approved'],
            default: 'not-register',
        },
    },
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
    },
    phone: {
        type: String,
        default: '',
    },
    role: {
        type: String,
        enum: ['customer', 'admin', 'retailer'],
        default: 'customer',
    },
});

module.exports = mongoose.model('User', userSchema);
