const Address = require('../models/addressModel');

const addressController = {
    async create({ province, district, ward, more }) {
        try {
            const address = new Address({
                province,
                district,
                ward,
                more,
            });
            await address.save();
            return address;
        } catch (error) {
            throw error;
        }
    },
    async delete(id) {
        try {
            const address = await Address.findByIdAndDelete(id);
            return address;
        } catch (error) {
            throw error;
        }
    },
    async update(id, { province, district, ward, more }) {
        try {
            const address = await Address.findByIdAndUpdate(
                id,
                {
                    province,
                    district,
                    ward,
                    more,
                },
                { new: true }
            );
            return address;
        } catch (error) {
            throw error;
        }
    },
};

module.exports = addressController;
