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
    role: {
        type: String,
        enum: ['user', 'admin', 'retailer'],
        default: 'user',
    },
});

module.exports = mongoose.model('User', userSchema);
