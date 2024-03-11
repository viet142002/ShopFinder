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
                message: 'Information created successfully',
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = InformationController;
