const Information = require('../Models/informationModel');

const addressController = require('./addressController');
const locationController = require('./locationController');
const imageController = require('./imageController');

const InformationController = {
    async create(req, res) {
        try {
            const { name, location, address, type, phone, description } =
                req.body;
            const images = req.files;
            const user = req.user._id;

            if (
                ['name', 'location', 'address', 'type', 'description'].some(
                    field => field in req.body
                ) === false
            ) {
                return res
                    .status(400)
                    .json({ message: 'Missing required fields' });
            }

            if (images.length === 0) {
                return res
                    .status(400)
                    .json({ message: 'At least one image is required' });
            }

            const newImages = await imageController.createImage(images);
            const newAddress = await addressController.create(
                JSON.parse(address)
            );

            const information = new Information({
                name,
                user,
                type,
                phone,
                description,
                images: newImages || [],
            });

            const { lat, lng } = JSON.parse(location);
            const newLocation = await locationController.create({
                lat: lat,
                lng: lng,
                address: newAddress._id,
                type: type,
                information: information._id,
                informationType: 'Information',
            });

            information.location = newLocation._id;
            await information.save();

            res.status(201).json({
                information,
                message: 'Share location successfully',
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, location, address, type, phone, description } =
                req.body;
            const images = req.files;

            const information = await Information.findById(id);

            if (!information) {
                return res
                    .status(404)
                    .json({ message: 'Information not found' });
            }

            if (images.length > 0) {
                const newImages = await imageController.createImage(images);
                await imageController.deleteImage(information.images);
                information.images = newImages;
            }

            if (address) {
                const newAddress = await addressController.create(
                    JSON.parse(address)
                );
                await addressController.delete(information.address);
                information.address = newAddress._id;
            }

            if (location) {
                const { lat, lng } = JSON.parse(location);
                const newLocation = await locationController.update(
                    information.location,
                    {
                        lat,
                        lng,
                    }
                );
                information.location = newLocation._id;
            }

            if (name) {
                information.name = name;
            }

            if (type) {
                information.type = type;
            }

            if (phone) {
                information.phone = phone;
            }

            if (description) {
                information.description = description;
            }

            await information.save();

            res.status(200).json({
                information,
                message: 'Information updated successfully',
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    async delete(req, res) {
        try {
            const { id } = req.params;
            const information = await Information.findByIdAndDelete(id);

            if (!information) {
                return res
                    .status(404)
                    .json({ message: 'Information not found' });
            }

            await locationController.delete(information.location._id);
            await imageController.deleteImages(information.images);

            res.status(200).json({
                information,
                message: 'Information deleted successfully',
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = InformationController;
