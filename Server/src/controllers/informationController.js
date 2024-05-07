const Information = require("../Models/informationModel");

const addressController = require("./addressController");
const locationController = require("./locationController");
const imageController = require("./imageController");

const InformationController = {
	async create(req, res) {
		try {
			const { name, location, address, type, phone, description } =
				req.body;
			const images = req.files;
			const user = req.user._id;

			if (
				["name", "location", "address", "type", "description"].some(
					field => field in req.body
				) === false
			) {
				return res
					.status(400)
					.json({ message: "Missing required fields" });
			}

			const existInfo = await Information.findOne({ name });

			if (existInfo) {
				images.forEach(image => {
					imageController.deleteLocalImage(image.filename);
				});
				return res.status(400).json({
					message: "Store name already exists",
				});
			}

			if (images.length === 0) {
				return res
					.status(400)
					.json({ message: "At least one image is required" });
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
				informationType: "Information",
			});

			information.location = newLocation._id;
			await information.save();

			res.status(201).json({
				information,
				message: "Share location successfully",
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
	async get(req, res) {
		try {
			const { id } = req.params;
			const information = await Information.findById(id)
				.populate({
					path: "location",
					populate: {
						path: "address",
					},
				})
				.populate("images");

			if (!information) {
				return res
					.status(404)
					.json({ message: "Information not found" });
			}

			res.status(200).json(information);
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
	async update(req, res) {
		try {
			const { id } = req.params;
			const { _id: userId, role } = req.user;
			const {
				name,
				location,
				address,
				phone,
				email,
				description,
				deleteImages,
			} = req.body;
			const images = req.files;

			const information = await Information.findById(id).populate({
				path: "location",
				populate: {
					path: "address",
				},
			});

			if (!information) {
				return res
					.status(404)
					.json({ message: "Information not found" });
			}

			if (
				information.user.toString() !== userId.toString() ||
				role !== "admin"
			) {
				return res.status(403).json({ message: "Permission denied" });
			}

			if (
				address.province !== information.location.address.province ||
				address.district !== information.location.address.district ||
				address.ward !== information.location.address.ward ||
				address.more !== information.location.address.more
			) {
				await addressController.update(
					information.location.address._id,
					{
						...address,
					}
				);
			}

			if (deleteImages) {
				let needRemoveIds = [];
				if (typeof deleteImages[0] === "string") {
					needRemoveIds = deleteImages;
				} else {
					needRemoveIds = deleteImages.map(image => image._id);
				}
				await imageController.deleteImages(deleteImages);
				information.images = information.images.filter(
					image => !needRemoveIds.includes(image._id.toString())
				);
			}
			if (images) {
				const newImages = await imageController.createImage(images);
				information.images = [...information.images, ...newImages];
			}

			const { lat, lng } = location;
			if (
				lat !== information.location.loc.coordinates[1] ||
				lng !== information.location.loc.coordinates[0]
			) {
				await locationController.update(information.location._id, {
					lat,
					lng,
				});
			}

			if (name) {
				information.name = name;
			}

			if (email) {
				information.email = email;
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
				message: "Update retailer successfully",
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
					.json({ message: "Information not found" });
			}

			await locationController.delete(information.location._id);
			await imageController.deleteImages(information.images);

			res.status(200).json({
				information,
				message: "Information deleted successfully",
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
	async getAll(req, res) {
		try {
			const {
				type = "all",
				status = "all",
				name,
				phone,
				user,
				page,
				limit = 20,
			} = req.query;
			let query = {};

			if (type) {
				query.type = type === "all" ? { $ne: null } : type;
			}
			if (status) {
				query.status = status === "all" ? { $ne: null } : status;
			}
			if (name) {
				query.name = { $regex: name, $options: "i" };
			}
			if (phone) {
				query.phone = { $regex: phone, $options: "i" };
			}
			if (user) {
				query.user = user;
			}

			const information = await Information.find(query)
				.populate({
					path: "location",
					populate: {
						path: "address",
					},
				})
				.populate("images logo")
				.sort({ createdAt: -1 })
				.skip((page - 1) * limit)
				.limit(limit);

			const total = await Information.countDocuments(query);

			res.status(200).json({ information, page, total });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
	async updateStatus(req, res) {
		try {
			const { id } = req.params;
			const { status } = req.body;

			const information = await Information.findById(id);

			if (!information) {
				return res
					.status(404)
					.json({ message: "Information not found" });
			}

			await locationController.update(information.location, { status });
			information.status = status;
			await information.save();

			res.status(200).json({
				information,
				message: "Successfully",
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
};

module.exports = InformationController;
