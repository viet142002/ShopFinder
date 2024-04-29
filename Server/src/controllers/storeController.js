const Information = require('../Models/informationModel');
const Retailer = require('../Models/retailerModel');

exports.getStore = async (req, res) => {
    try {
        const { storeId } = req.params;

        let store = null;
        store = await Retailer.findById(storeId)
            .populate({
                path: 'location',
                populate: {
                    path: 'address',
                },
            })
            .populate('images logo');
        if (!store) {
            store = await Information.findById(storeId)
                .populate({
                    path: 'location',
                    populate: {
                        path: 'address',
                    },
                })
                .populate('images logo');
        }
        res.status(200).json({ store });
    } catch (error) {
        res.status(500).json({
            message: 'Internal server error',
            error,
        });
    }
};
