const bcrypt = require('bcrypt');
const User = require('../Models/userModel');
const imageController = require('./imageController');
const addressController = require('./addressController');

const { sendMail, generateToken } = require('../helper');

const userController = {
    updateProfile: async (req, res) => {
        try {
            const { firstname, lastname, address, phone } = req.body;
            const avatar = req?.file?.filename || null;

            if (!firstname && !lastname && !address && !phone && !avatar)
                return res.status(400).json({ message: 'No changes detected' });
            if (phone && !/^\d{10}$/.test(phone))
                return res
                    .status(400)
                    .json({ message: 'Invalid phone number' });

            const user = await User.findById(req.user._id)
                .select('-password')
                .populate('avatar address');

            if (!user)
                return res.status(400).json({ message: 'User not found' });

            if (firstname) user.firstname = firstname.trim();
            if (lastname) user.lastname = lastname.trim();
            if (address) {
                const newAddress = await addressController.create(
                    JSON.parse(address)
                );
                user.address = newAddress;
            }
            if (phone) user.phone = phone;
            if (avatar) {
                if (user.avatar) {
                    await imageController.delete(user.avatar._id);
                }
                const newImage = await imageController.createSingle(req.file);
                user.avatar = newImage;
            }

            await user.save();

            return res.status(200).json({
                updatedUser: user,
                message: 'Profile updated successfully',
            });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    },

    newPassword: async (req, res) => {
        try {
            const { password, rePassword, email } = req.body;

            if (password !== rePassword)
                return res.status(400).json({ message: 'Password not match' });

            if (
                !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)
            )
                return res.status(400).json({
                    message:
                        'Password must contain at least 8 characters, including uppercase, lowercase and number',
                });

            const user = await User.findById(req.user._id);
            if (!user)
                return res.status(400).json({ message: 'User not found' });

            if (user.email !== email)
                return res.status(400).json({ message: 'Invalid email' });
            const hashPassword = await bcrypt.hash(password, 10);
            user.password = hashPassword;
            await user.save();

            return res
                .status(200)
                .json({ message: 'Password updated successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    },

    sendMailReset: async (req, res) => {
        try {
            const { email } = req.body;

            const user = await User.findOne({ email });

            if (!user)
                return res.status(400).json({ message: 'Email not found' });

            const token = generateToken(user, '10m');
            const html = `
                <h1>Thay đôi mật khẩu</h1>
                <p>Click vào liên kết để thay đổi mật khẩu của bạn!</p>
                <a href="${process.env.CLIENT_URL}/new-password?token=${token}&email=${user.email}" blank>Reset password</a>
            `;
            await sendMail({
                to: user.email,
                subject: 'Reset password',
                text: 'Reset password',
                html,
            });

            return res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: error.message });
        }
    },
};

module.exports = userController;
