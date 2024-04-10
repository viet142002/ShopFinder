const User = require('../Models/userModel');
const imageController = require('./imageController');
const addressController = require('./addressController');

const userController = {
    updateProfile: async (req, res) => {
        try {
            const { firstname, lastname, address, phone } = req.body;
            console.table(req.body);
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
};

module.exports = userController;
