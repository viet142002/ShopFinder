const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../Models/userModel');

const authController = {
    signUp: () => async (req, res) => {
        try {
            const { email, password, firstname, lastname } = req.body;

            const user = await User.findOne({ email });
            if (user) {
                return res.status(400).json({
                    message: 'Email already exists',
                });
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = new User({
                firstname,
                lastname,
                email,
                password: hashPassword,
            });

            const token = generateToken(newUser);

            await newUser.save();
            await newUser.populate('avatar address pendingRetailer');

            return res.status(200).json({
                newUser,
                token: `bearer ${token}`,
                message: 'Signup successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        }
    },
    signIn: () => async (req, res) => {
        try {
            console.log('signIn');
            const { email, password } = req.body;
            console.log(req.body);

            const user = await User.findOne({ email })
                .populate({
                    path: 'avatar',
                    select: 'path name',
                })
                .populate({
                    path: 'address',
                    select: 'province district ward more',
                })
                .populate('pendingRetailer');

            if (!user) {
                return res.status(400).json({
                    message: 'Email does not exist',
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    message: 'Password is incorrect',
                });
            }

            const token = generateToken(user);

            delete user._doc.password;

            return res.status(200).json({
                user,
                token: `bearer ${token}`,
                message: 'SignIn successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: 'Internal server error',
            });
        }
    },
};

const generateToken = user => {
    const token = jwt.sign(
        {
            _id: user._id,
            role: user.role,
            email: user.email,
            retailer: user?.pendingRetailer?.retailer || '',
        },
        process.env.JWT_SECRET,
        {
            expiresIn: '1d',
        }
    );

    return token;
};

module.exports = authController;
