const Location = require('../Models/locationModel');

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
            const location = await Location.findByIdAndUpdate(
                locationId,
                data,
                {
                    new: true,
                }
            );
            return location;
        } catch (error) {
            throw error;
        }
    },
    getLocations: async (req, res) => {
        try {
            const { radius, lat, lng, type = 'all', name = '' } = req.query;
            let typeArray = [
                'electronics',
                'furniture',
                'clothes',
                'food',
                'cafe',
                'other',
            ];
            if (type !== 'all' && !typeArray.includes(type)) {
                return res.status(400).json({
                    message: 'Invalid type',
                });
            }

            // Validate input parameters (optional but recommended)
            if (!radius || !lat || !lng) {
                return res.status(400).json({
                    message:
                        'Missing required parameters: radius, lat, and lng',
                });
            }

            // populate information information.images address
            // radius in km
            let locations = await Location.find({
                loc: {
                    $geoWithin: {
                        $centerSphere: [[lng, lat], radius / 6371],
                    },
                },
            })
                .populate({
                    path: 'information',
                    populate: {
                        path: 'images',
                    },
                })
                .populate('address')
                .where('type')
                .equals(type === 'all' ? { $ne: '' } : type);

            // filter by name
            if (name !== '') {
                locations = locations.filter(location => {
                    const regex = new RegExp(name, 'i');
                    if (location.informationType === 'Information') {
                        return location.information.name.match(regex);
                    }
                    return (
                        location.information.name.match(regex) &&
                        location.information.status === 'approved'
                    );
                });
            } else {
                locations = locations.filter(location => {
                    if (location.informationType === 'Information') return true;
                    return location.information.status === 'approved';
                });
            }
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
