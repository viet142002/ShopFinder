const Location = require('../Models/locationModel');
const mongoose = require('mongoose');

const locationController = {
    create: async ({
        lat,
        lng,
        address,
        type,
        information,
        informationType,
    }) => {
        try {
            if (
                [
                    lat,
                    lng,
                    address,
                    type,
                    information,
                    informationType,
                ].includes(undefined)
            ) {
                throw new Error('Missing required fields');
            }
            const location = new Location({
                loc: {
                    type: 'Point',
                    coordinates: [parseFloat(lng), parseFloat(lat)],
                },
                address,
                type,
                information,
                informationType,
            });
            await location.save();
            return location;
        } catch (error) {
            throw error;
        }
    },
    update: async (locationId, data) => {
        try {
            const location = await Location.findByIdAndUpdate(location, data, {
                new: true,
            });
            return location;
        } catch (error) {
            throw error;
        }
    },
    getLocations: async (req, res) => {
        try {
            const { radius, lat, lng, type = 'all', name = '' } = req.query;

            // Validate input parameters (optional but recommended)
            if (!radius || !lat || !lng) {
                return res.status(400).json({
                    message:
                        'Missing required parameters: radius, lat, and lng',
                });
            }

            // Build the aggregation pipeline
            // const pipeline = [
            //     {
            //         $geoNear: {
            //             near: {
            //                 type: 'Point',
            //                 coordinates: [parseFloat(lng), parseFloat(lat)],
            //             },
            //             distanceField: 'distance',
            //             spherical: true,
            //             maxDistance: parseFloat(radius) * 1000,
            //         },
            //     },
            // ];

            // if (!radius) {
            //     pipeline.pop();
            // }

            // populate information information.images address
            const locations = await Location.find({
                loc: {
                    $geoWithin: {
                        $centerSphere: [
                            [parseFloat(lng), parseFloat(lat)],
                            radius,
                        ],
                    },
                },
                // type,
                // 'information.name': {
                //     $regex: name,
                //     $options: 'i',
                // },
            })
                .populate({
                    path: 'information',
                    populate: {
                        path: 'images',
                    },
                })
                .populate('address');

            return res.status(200).json({
                locations,
                message: radius
                    ? 'Locations within specified radius retrieved successfully'
                    : 'Locations retrieved successfully',
            });
        } catch (error) {
            console.error(error); // Log the error for debugging
            return res.status(500).json({ message: error.message }); // Generic error message
        }
    },
    createTest: async (req, res) => {
        try {
            const { lat, lng, address, type, information, informationType } =
                req.body;
            if (
                [
                    lat,
                    lng,
                    address,
                    type,
                    information,
                    informationType,
                ].includes(undefined)
            ) {
                return res
                    .status(400)
                    .json({ message: 'Missing required fields' });
            }
            console.log(req.body);
            const location = new Location({
                loc: {
                    type: 'Point',
                    coordinates: [parseFloat(lng), parseFloat(lat)],
                },
                // address: new mongoose.Types.ObjectId(address),
                type,
                // information: new mongoose.Types.ObjectId(information),
                // informationType,
            });
            await location.save();
            res.status(201).json({
                location,
                message: 'Location created successfully',
            });
        } catch (error) {
            return res.status(500).json({ message: error.message }); // Generic error message
        }
    },
    getNear: async (req, res) => {
        try {
            const { radius, lat, lng, type = 'all', name = '' } = req.query;

            if (!radius || !lat || !lng) {
                return res.status(400).json({
                    message:
                        'Missing required parameters: radius, lat, and lng',
                });
            }

            const pipeline = [
                {
                    $where: {
                        $or: [
                            { type },
                            {
                                'information.name': {
                                    $regex: name,
                                    $options: 'i',
                                },
                            },
                        ],
                    },
                },
                {
                    $geoNear: {
                        near: {
                            type: 'Point',
                            coordinates: [parseFloat(lng), parseFloat(lat)],
                        },
                        distanceField: 'distance',
                        spherical: true,
                        maxDistance: parseFloat(radius) * 1000,
                    },
                },
            ];

            if (!radius) {
                pipeline.pop();
            }

            const locations = await Location.aggregate(pipeline);

            return res.status(200).json({
                locations,
                message: radius
                    ? 'Locations within specified radius retrieved successfully'
                    : 'Locations retrieved successfully',
            });
        } catch (error) {
            return res.status(500).json({ message: error.message }); // Generic error message
        }
    },
};

module.exports = locationController;
