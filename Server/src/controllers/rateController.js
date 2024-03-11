const Rate = require('../Models/rateModel');
const imageController = require('./imageController');
const mongoose = require('mongoose');

const rateController = {
    getRates: async (req, res) => {
        try {
            const { to, limit = 20, skip = 0 } = req.query;
            const formatTo = new mongoose.Types.ObjectId(to);

            const rates = await Rate.find({
                to: formatTo,
            })
                .populate('from', 'firstname lastname avatar')
                .populate('images reply')
                .limit(parseInt(limit))
                .skip(parseInt(skip))
                .sort({ createdAt: -1 });

            return res.status(200).json({
                rates,
                message: 'Get rates successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },
    addRate: async (req, res) => {
        try {
            const { to, toType, rate, comment = '' } = req.body;
            console.log(req.body);

            const from = req.user._id;

            const files = req.files;

            const newRate = new Rate({
                from,
                to,
                toType,
                rate,
                comment: comment.trim(),
            });

            if (files) {
                const images = await imageController.createImage(files);
                newRate.images = images;
            }

            await newRate.save();

            return res.status(200).json({
                newRate,
                message: 'Rating added successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },
    updateRate: (req, res) => {
        try {
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },
    deleteRate: (req, res) => {
        try {
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },
};

module.exports = rateController;
