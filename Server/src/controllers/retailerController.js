const bcrypt = require("bcrypt");

const Retailer = require("../Models/retailerModel");
const User = require("../Models/userModel");
const Location = require("../Models/locationModel");

const imageController = require("./imageController");
const addressController = require("./addressController");
const locationController = require("./locationController");
const { sendMail } = require("../helper/SendMail");

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
				email,
			} = req.body;
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
					email,
				].includes(undefined)
			) {
				return res.status(400).json({
					message: "Missing required fields",
				});
			}

			if (!images || images.length === 0) {
				return res.status(400).json({
					message: "Missing images",
				});
			}

			const newImages = await imageController.createImage(images);
			const newAddress = await addressController.create(
				JSON.parse(address)
			);

			const newRetailer = new Retailer({
				name,
				phone,
				type,
				mode,
				description,
				email,
				images: newImages || [],
			});

			const { lat, lng } = JSON.parse(location);
			const newLocation = await locationController.create({
				lat,
				lng,
				address: newAddress._id,
				type: type,
				information: newRetailer,
				informationType: "Retailer",
			});

			newRetailer.location = newLocation._id;

			await newRetailer.save();

			return res.status(200).json({
				newRetailer,
				message: "Register retailer successfully",
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
			const id = req.user.retailer;
			const images = req.files;

			if (
				[location, name, phone, description, address, email].includes(
					undefined
				)
			) {
				return res.status(400).json({
					message: "Missing required fields",
				});
			}

			const retailer = await Retailer.findById(id).populate({
				path: "location",
				populate: {
					path: "address",
				},
			});

			if (!retailer) {
				return res.status(400).json({
					message: "Cant find retailer",
				});
			}
			if (deleteImages) {
				let needRemoveIds = [];
				if (typeof deleteImages[0] === "string") {
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
				message: "Update retailer successfully",
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	},
	infoMyRetailer: async (req, res) => {
		try {
			const retailer = await Retailer.findById(req.user.retailer)
				.populate({
					path: "location",
					populate: {
						path: "address",
					},
				})
				.populate("images logo");

			if (!retailer) {
				return res.status(400).json({
					message: "Cant find retailer",
				});
			}

			return res.status(200).json({
				retailer,
				message: "Get info retailer successfully",
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
					message: "Cant find retailer",
				});
			}

			return res.status(200).json({
				retailer,
				message: "Get retailers successfully",
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
			let { status = "all", sort = "asc" } = req.query;
			if (status === "all") {
				status = ["pending", "approved", "rejected", "blocked"];
			} else {
				status = [status];
			}

			const requests = await Retailer.find({
				status: { $in: status },
			})
				.populate({
					path: "location",
					populate: {
						path: "address",
					},
				})
				.populate("images logo")
				.sort({ createdAt: sort });

			if (!requests) {
				return res.status(400).json({
					message: "Cant find requests",
				});
			}
			return res.status(200).json({
				requests,
				message: "Get requests successfully",
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
			const oldRetailer = await Retailer.findById(req.params.id);
			const { retailer } = await retailerController.instanceUpdateStatus(
				req.params.id,
				"approved"
			);
			if (!retailer) {
				return res.status(400).json({
					message: "Cant find retailer",
				});
			}

			if (oldRetailer.status === "pendding") {
				// generate random password
				const password = Math.random().toString(36).slice(-8);
				const hashPassword = await bcrypt.hash(password, 10);
				await Retailer.findByIdAndUpdate(retailer._id, {
					password: hashPassword,
				});
				sendMail({
					to: retailer.email,
					subject: "Retailer registration",
					text: `<h1>Đơn xét duyệt của bạn đã được chấp thuận</h1>`,
					html: `
                    <h1>
                        Đơn xét duyệt của bạn đã được phê duyệt
                    </h1>
                    <h4>
                        Thông tin đăng nhập của bạn:
                    </h4>
                        <p>Email: ${retailer.email}</p>
                        <p>Password: ${password}</p>
                    <h5>
                        Vui lòng <a href="http://localhost:3000/login-retailer">đăng nhập tại đây</a> và thay đổi mật khẩu của bạn
                    </h5>`,
				});
			}
			return res.status(200).json({
				retailer,
				message: "Successfully",
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
			const { retailer } = await this.instanceUpdateStatus(
				req.params.id,
				"rejected"
			);
			if (!retailer) {
				return res.status(400).json({
					message: "Cant find retailer",
				});
			}
			return res.status(200).json({
				retailer,
				message: "Rejected request successfully",
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	},
	instanceUpdateStatus: async (retailerId, status) => {
		try {
			const retailer = await Retailer.findById(retailerId);
			if (!retailer) {
				return {
					retailer: null,
				};
			}

			const location = await Location.findById(retailer.location);
			if (status === "blocked") {
				location.status = "blocked";
				retailer.status = "blocked";
			}
			if (status === "approved") {
				location.status = "normal";
				retailer.status = "approved";
			}
			if (status === "rejected") {
				retailer.status = "rejected";
				location.status = "blocked";
			}
			await location.save();
			await retailer.save();

			return {
				retailer,
				message: "Successfully",
			};
		} catch (error) {
			throw new Error(error.message);
		}
	},
	// Block a retailer
	blockRetailer: async (req, res) => {
		try {
			const { retailer } = await retailerController.instanceUpdateStatus(
				req.params.id,
				"blocked"
			);
			return res.status(200).json({
				retailer,
				message: "Successfully",
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	},
	// check block status
	checkBlockRetailer: async retailerId => {
		try {
			const retailer = await Retailer.findById(retailerId);
			if (!retailer) {
				return res.status(400).json({
					message: "Cant find retailer",
				});
			}
			return retailer.status === "blocked";
		} catch (error) {
			throw new Error(error.message);
		}
	},
};

module.exports = retailerController;
