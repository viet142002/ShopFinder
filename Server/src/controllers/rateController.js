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
    updateRate: async (req, res) => {
        try {
            const { id } = req.params;
            // deleteImages is array of image id
            const { rate, comment, deleteImages: original } = req.body;
            const images = req.files;
            const deleteImages = original ? JSON.parse(original) : [];

            const rateUpdate = await Rate.findById(id);

            if (rateUpdate.from.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    message: 'Permission denied',
                });
            }

            if (deleteImages) {
                await imageController.deleteImages(deleteImages);
                rateUpdate.images = rateUpdate.images.filter(
                    image => !deleteImages.includes(image.toString())
                );
            }

            if (images) {
                const newImages = await imageController.createImage(images);
                rateUpdate.images = rateUpdate.images.concat(newImages);
            }

            if (rate) rateUpdate.rate = parseInt(rate);

            if (comment) rateUpdate.comment = comment;
            // populate images
            await rateUpdate.save();
            await rateUpdate.populate('images');

            return res.status(200).json({
                rateUpdate,
                message: 'Rating updated successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },
    deleteRate: async (req, res) => {
        try {
            const { id } = req.params;

            const rate = await Rate.findByIdAndDelete(id);

            if (!rate) {
                return res.status(404).json({
                    message: 'Rating not found',
                });
            }

            if (rate.from.toString() !== req.user._id.toString()) {
                return res.status(403).json({
                    message: 'Permission denied',
                });
            }

            if (rate.images.length > 0)
                await imageController.deleteImages(rate.images);

            if (rate.reply.length > 0) {
                for (let i = 0; i < rate.reply.length; i++) {
                    const reply = await Rate.findByIdAndDelete(rate.reply[i]);
                    if (reply.images.length > 0)
                        await imageController.deleteImages(reply.images);
                }
            }

            return res.status(200).json({
                message: 'Rating deleted successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },
};

module.exports = rateController;
