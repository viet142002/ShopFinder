const PriceShipping = require('../models/priceShippingModel');

const priceShippingController = {
    add: async (req, res) => {
        try {
            const { price, to, from } = req.body;
            console.table(req.body);

            const { retailer } = req.user;
            if (!retailer) {
                return res.status(403).json({ message: 'Forbidden' });
            }

            const priceShipping = new PriceShipping({
                price,
                retailer,
                range: { to, from },
            });

            await priceShipping.save();

            res.status(201).json(priceShipping);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    get: async (req, res) => {
        try {
            const priceShipping = await PriceShipping.find({
                retailer: req.user.retailer,
            });
            res.status(200).json({
                priceShipping,
                message: 'Price shipping retrieved successfully',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getByRetailerId: async (req, res) => {
        try {
            console.log('price ', req.params.id);
            const priceShipping = await PriceShipping.find({
                retailer: req.params.id,
            });

            if (!priceShipping) {
                return res
                    .status(404)
                    .json({ message: 'Price shipping not found' });
            }

            res.status(200).json({
                priceShipping,
                message: 'Price shipping retrieved successfully',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    update: async (req, res) => {
        try {
            const { price, to, from } = req.body;
            const priceShipping = await PriceShipping.findById(req.params.id);

            if (!priceShipping) {
                return res
                    .status(404)
                    .json({ message: 'Price shipping not found' });
            }

            priceShipping.price = price;
            priceShipping.to = to;
            priceShipping.from = from;

            await priceShipping.save();
            res.status(200).json(priceShipping);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    remove: async (req, res) => {
        try {
            const priceShipping = await PriceShipping.findByIdAndDelete(
                req.params.id
            );

            if (!priceShipping) {
                return res
                    .status(404)
                    .json({ message: 'Price shipping not found' });
            }

            res.status(200).json({
                message: 'Price shipping deleted successfully',
            });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    getOne: async (req, res) => {
        try {
            const { distance } = req.query;

            const priceShipping = await PriceShipping.findOne({
                retailer: req.params.id,
                'range.to': { $gte: distance },
                'range.from': { $lte: distance },
            }).populate('retailer', 'name');

            if (!priceShipping) {
                return res
                    .status(404)
                    .json({ message: 'Price shipping not found' });
            }

            res.status(200).json(priceShipping);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = priceShippingController;
