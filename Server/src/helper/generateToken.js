const jwt = require('jsonwebtoken');

const generateToken = (user, exp = '1d') => {
    const token = jwt.sign(
        {
            _id: user._id,
            role: user.role,
            email: user.email,
            retailer:
                user?.pendingRetailer.status === 'approved'
                    ? user?.pendingRetailer?.retailer
                    : '',
        },
        process.env.JWT_SECRET,
        {
            expiresIn: exp,
        }
    );

    return token;
};

exports.generateToken = generateToken;
