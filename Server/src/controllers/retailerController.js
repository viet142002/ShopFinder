const Retailer = require('../Models/retailerModel');
const User = require('../Models/userModel');

const imageController = require('./imageController');
const addressController = require('./addressController');
const locationController = require('./locationController');
const priceShippingController = require('./priceShippingController');

const retailerController = {
    register: async (req, res) => {
        try {
            const {
                location,
                name,
                phone,
                type,
                description,
                mode,
                address,
                email: retailerEmail,
            } = req.body;
            const { email } = req.user;
            const images = req.files;

            if (
                [
                    location,
                    name,
                    phone,
                    type,
                    description,
                    mode,
                    address,
                    retailerEmail,
                ].includes(undefined)
            ) {
                return res.status(400).json({
                    message: 'Missing required fields',
                });
            }

            if (!images || images.length === 0) {
                return res.status(400).json({
                    message: 'Missing images',
                });
            }

            const user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({
                    message: 'Cant find user',
                });
            }

            user.pendingRetailer = {
                status: 'pending',
            };

            const newImages = await imageController.createImage(images);
            const newAddress = await addressController.create(
                JSON.parse(address)
            );

            const newRetailer = new Retailer({
                owner: user._id,
                name,
                phone,
                type,
                mode,
                description,
                email: retailerEmail,
                images: newImages || [],
            });

            const { lat, lng } = JSON.parse(location);
            const newLocation = await locationController.create({
                lat,
                lng,
                address: newAddress._id,
                type: type,
                information: newRetailer,
                informationType: 'Retailer',
            });

            newRetailer.location = newLocation._id;
            user.pendingRetailer.retailer = newRetailer._id;

            await user.save();
            await newRetailer.save();

            return res.status(200).json({
                newRetailer,
                message: 'Register retailer successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    update: async (req, res) => {
        try {
            const {
                location,
                name,
                phone,
                description,
                address,
                deleteImages,
                email,
            } = req.body;

            const images = req.files;

            if (
                [location, name, phone, description, address, email].includes(
                    undefined
                )
            ) {
                return res.status(400).json({
                    message: 'Missing required fields',
                });
            }

            const retailer = await Retailer.findOne({
                owner: req.user._id,
            }).populate({
                path: 'location',
                populate: {
                    path: 'address',
                },
            });

            if (!retailer) {
                return res.status(400).json({
                    message: 'Cant find retailer',
                });
            }
            if (deleteImages) {
                let needRemoveIds = [];
                if (typeof deleteImages[0] === 'string') {
                    needRemoveIds = deleteImages;
                } else {
                    needRemoveIds = deleteImages.map(image => image._id);
                }
                await imageController.deleteImages(deleteImages);
                retailer.images = retailer.images.filter(
                    image => !needRemoveIds.includes(image._id.toString())
                );
            }
            if (images) {
                const newImages = await imageController.createImage(images);
                retailer.images = [...retailer.images, ...newImages];
            }
            if (name) {
                retailer.name = name;
            }
            if (email) {
                retailer.email = email;
            }
            if (phone) {
                retailer.phone = phone;
            }
            if (
                address.province !== retailer.location.address.province ||
                address.district !== retailer.location.address.district ||
                address.ward !== retailer.location.address.ward ||
                address.more !== retailer.location.address.more
            ) {
                await addressController.update(retailer.location.address._id, {
                    ...address,
                });
            }

            if (description) {
                retailer.description = description;
            }

            const { lat, lng } = location;
            if (
                lat !== retailer.location.loc.coordinates[1] ||
                lng !== retailer.location.loc.coordinates[0]
            ) {
                await locationController.update(retailer.location._id, {
                    lat,
                    lng,
                });
            }

            await retailer.save();

            return res.status(200).json({
                retailer,
                message: 'Update retailer successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    infoMyRetailer: async (req, res) => {
        try {
            const retailer = await Retailer.findOne({
                owner: req.user._id,
            })
                .populate({
                    path: 'location',
                    populate: {
                        path: 'address',
                    },
                })
                .populate('images logo');

            if (!retailer) {
                return res.status(400).json({
                    message: 'Cant find retailer',
                });
            }

            return res.status(200).json({
                retailer,
                message: 'Get info retailer successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    getRetailerDetailRetailer: async (req, res) => {
        try {
            const retailer = await Retailer.findById(req.params.id);
            if (!retailer) {
                return res.status(400).json({
                    message: 'Cant find retailer',
                });
            }

            return res.status(200).json({
                retailer,
                message: 'Get retailers successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    // Gets all pending requests
    getRequestsRetailer: async (req, res) => {
        try {
            let { status = 'all', sort = 'asc' } = req.query;
            console.log('🚀 ~ getRequestsRetailer: ~ sort:', sort);
            if (status === 'all') {
                status = ['pending', 'approved', 'rejected'];
            } else {
                status = [status];
            }

            const requests = await Retailer.find({
                status: { $in: status },
            })
                .populate({
                    path: 'location',
                    populate: {
                        path: 'address',
                    },
                })
                .populate('images logo')
                .populate('owner', '-password')
                .sort({ createdAt: sort });

            if (!requests) {
                return res.status(400).json({
                    message: 'Cant find requests',
                });
            }
            return res.status(200).json({
                requests,
                message: 'Get requests successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    // Approve a request
    acceptRequestRetailer: async (req, res) => {
        try {
            const retailer = await Retailer.findById(req.params.id);
            if (!retailer) {
                return res.status(400).json({
                    message: 'Cant find retailer',
                });
            }
            const user = await User.findById(retailer.owner);
            if (!user) {
                return res.status(400).json({
                    message: 'Cant find user',
                });
            }
            retailer.status = 'approved';
            user.role = 'retailer';

            user.pendingRetailer = {
                retailer: retailer._id,
                status: 'approved',
            };

            await user.save();
            await retailer.save();

            return res.status(200).json({
                retailer,
                message: 'Approved request successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    // Reject a request
    rejectRequestRetailer: async (req, res) => {
        try {
            const retailer = await Retailer.findById(req.params.id);
            if (!retailer) {
                return res.status(400).json({
                    message: 'Cant find retailer',
                });
            }
            const user = await User.findById(retailer.owner);

            retailer.status = 'rejected';
            user.pendingRetailer = {
                retailer: retailer._id,
                status: 'rejected',
            };

            await retailer.save();
            await user.save();

            return res.status(200).json({
                retailer,
                message: 'Rejected request successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },
};

module.exports = retailerController;
