const Rate = require("../Models/rateModel");
const imageController = require("./imageController");
const notificationController = require("./notificationController");

const rateController = {
	getRates: async (req, res) => {
		try {
			const { to, limit = 20, skip = 0, userId } = req.query;
			let myRate = null;
			if (userId) {
				myRate = await Rate.findOne({
					from: userId,
					to: to,
				})
					.populate("images")
					.populate({
						path: "from",
						select: "fullname avatar",
						populate: {
							path: "avatar",
						},
					})
					.populate({
						path: "reply",
						populate: {
							path: "from",
							select: "name logo",
							populate: {
								path: "logo",
							},
						},
					});
			}
			// get rates minus myRate
			const rates = await Rate.find({
				to: to,
				from: { $ne: userId },
				status: {
					$ne: "blocked",
				},
			})
				.populate({
					path: "from",
					select: "fullname avatar",
					populate: {
						path: "avatar",
					},
				})
				.populate("images")
				.populate({
					path: "reply",
					populate: {
						path: "from",
						select: "name logo",
						populate: {
							path: "logo",
						},
					},
				})
				.limit(parseInt(limit))
				.skip(parseInt(skip))
				.sort({ createdAt: -1 });

			return res.status(200).json({
				rates,
				myRate,
				message: "Get rates successfully",
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	},
	getRate: async (req, res) => {
		try {
			const { id } = req.params;
			const rate = await Rate.findById(id)
				.populate("images")
				.populate({
					path: "from",
					select: "fullname avatar",
					populate: {
						path: "avatar",
					},
				})
				.populate({
					path: "reply",
					populate: {
						path: "from",
						select: "name logo",
						populate: {
							path: "logo",
						},
					},
				});

			if (!rate) {
				return res.status(404).json({
					message: "Rating not found",
				});
			}

			return res.status(200).json({
				rate,
				message: "Get rate successfully",
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	},
	addRate: async (req, res) => {
		try {
			const { to, toType, from, fromType, rate, comment = "" } = req.body;

			const files = req.files;

			const newRate = new Rate({
				from,
				fromType,
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

			if (toType === "Rate") {
				const rate = await Rate.findById(to);
				rate.reply.push(newRate._id);
				await rate.save();
			}

			return res.status(200).json({
				newRate,
				message: "Rating added successfully",
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
			const { rate, comment, deleteImages: original, status } = req.body;
			const images = req.files;
			const deleteImages = original ? JSON.parse(original) : [];

			if (
				!rate &&
				!comment &&
				!images &&
				deleteImages.length === 0 &&
				!status
			) {
				return res.status(400).json({
					message: "No changes detected",
				});
			}

			const rateUpdate = await Rate.findById(id).populate({
				path: "reply",
				populate: {
					path: "from",
					select: "name logo",
					populate: {
						path: "logo",
					},
				},
			});
			if (!rateUpdate) {
				return res.status(404).json({
					message: "Rating not found",
				});
			}
			if (
				rateUpdate.from.toString() !== req.user._id.toString() &&
				req.user.role !== "admin"
			) {
				return res.status(403).json({
					message: "Permission denied",
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
			if (status) rateUpdate.status = status;

			// populate images
			await rateUpdate.save();
			await rateUpdate.populate("images");

			return res.status(200).json({
				rateUpdate,
				message: "Rating updated successfully",
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
			console.log("🚀 ~ deleteRate: ~ rate:", rate);

			if (!rate) {
				return res.status(404).json({
					message: "Rating not found",
				});
			}

			if (rate.from.toString() !== req.user._id.toString()) {
				return res.status(403).json({
					message: "Permission denied",
				});
			}

			if (rate?.images?.length > 0)
				await imageController.deleteImages(rate.images);

			if (rate.reply.length > 0) {
				for (let i = 0; i < rate.reply.length; i++) {
					const reply = await Rate.findByIdAndDelete(rate.reply[i]);
					if (reply?.images?.length > 0)
						await imageController.deleteImages(reply.images);
				}
			}

			return res.status(200).json({
				message: "Rating deleted successfully",
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	},
	getCountRates: async (req, res) => {
		try {
			const { to } = req.query;

			const oneStar = await Rate.countDocuments({
				status: {
					$ne: "blocked",
				},
				to: to,
				rate: 1,
			});

			const twoStar = await Rate.countDocuments({
				status: {
					$ne: "blocked",
				},
				to: to,
				rate: 2,
			});

			const threeStar = await Rate.countDocuments({
				status: {
					$ne: "blocked",
				},
				to: to,
				rate: 3,
			});

			const fourStar = await Rate.countDocuments({
				status: {
					$ne: "blocked",
				},
				to: to,
				rate: 4,
			});

			const fiveStar = await Rate.countDocuments({
				status: {
					$ne: "blocked",
				},
				to: to,
				rate: 5,
			});

			const total = oneStar + twoStar + threeStar + fourStar + fiveStar;
			const overage =
				total === 0
					? 0
					: ((oneStar +
							twoStar * 2 +
							threeStar * 3 +
							fourStar * 4 +
							fiveStar * 5) /
							total) |
					  0;

			return res.status(200).json({
				star: {
					values: [fiveStar, fourStar, threeStar, twoStar, oneStar],
					total,
					overage,
				},
				message: "Get count rates successfully",
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	},
	likeRate: async (req, res) => {
		try {
			const { id } = req.params;
			const userId = req.user._id;
			let message = null;

			const rate = await Rate.findById(id).populate("to from", "name");
			await notificationController.findOneAndDelete({
				from: userId,
				target: rate._id,
			});
			// only like or dislike
			if (rate.likes.includes(userId)) {
				rate.likes = rate.likes.filter(
					like => like?.toString() !== userId.toString()
				);
			} else {
				if (rate.from.toString() !== userId.toString()) {
					message = `thích đánh giá của bạn tại ${
						rate.toType === "Product" ? "sản phẩm" : "cửa hàng"
					} ${rate.to.name}`;
					await notificationController.createNotification({
						toUser: rate.from,
						from: userId,
						type: "LIKE_RATE",
						target: rate._id,
						message: message,
					});
				}

				rate.likes.push(userId);
				rate.dislikes = rate.dislikes.filter(
					dislike => dislike?.toString() !== userId.toString()
				);
			}

			await rate.save();

			return res.status(200).json({
				rate,
				messageSocket: message,
				message: "Like rate successfully",
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	},
	dislikeRate: async (req, res) => {
		try {
			const { id } = req.params;
			const userId = req.user._id;

			const rate = await Rate.findById(id);

			await notificationController.findOneAndDelete({
				target: rate._id,
			});

			if (rate.dislikes.includes(userId)) {
				rate.dislikes = rate.dislikes.filter(
					dislike => dislike?.toString() !== userId.toString()
				);
			} else {
				rate.dislikes.push(userId);
				rate.likes = rate.likes.filter(
					like => like?.toString() !== userId.toString()
				);
			}

			await rate.save();

			return res.status(200).json({
				dislikes: rate.dislikes,
				likes: rate.likes,
				message: "Dislike rate successfully",
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	},
};

module.exports = rateController;
