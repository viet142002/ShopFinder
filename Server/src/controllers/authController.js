const bcrypt = require('bcrypt');

const User = require('../Models/userModel');
const { generateToken } = require('../helper');

const imageController = require('./imageController');

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
            const { email, password } = req.body;

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

            if (user.status === 'blocked') {
                return res.status(403).json({
                    message: 'User is blocked',
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
    signInWithGoogle: () => async (req, res) => {
        try {
            const { email, id, family_name, given_name, picture, name } =
                req.body;
            console.log('🚀 ~ signInWithGoogle: ~ req.body:', req.body);

            let user = await User.findOne({ email })
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
                // create user
                const hashPassword = await bcrypt.hash(id, 10);
                const avatar = await imageController.createImageWithPath({
                    path: picture,
                    name: name,
                });
                user = new User({
                    email,
                    password: hashPassword,
                    firstname: given_name,
                    lastname: family_name,
                    avatar,
                });
                await user.save();
            }

            const token = generateToken(user);

            delete user._doc.password;
            console.log('🚀 ~ signInWithGoogle: ~ user:', user);

            return res.status(200).json({
                user,
                token: `bearer ${token}`,
                message: 'SignIn successfully',
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({
                message: 'Internal server error',
            });
        }
    },
};

module.exports = authController;
