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
};

module.exports = addressController;
