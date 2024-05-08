const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const Retailer = require("../Models/retailerModel");

const authMiddlewares = {
	/**
	 * Middleware to check if user is authorized
	 */
	authorization: async (req, res, next) => {
		if (!req.headers.authorization) {
			return res.status(401).json({
				message: "Unauthorized",
			});
		}
		const token = req.headers.authorization.split(" ")[1];

		try {
			// check if token is valid
			const data = jwt.verify(token, process.env.JWT_SECRET);
			console.log("🚀 ~ authorization: ~ data:", data);

			if (!data) {
				return res.status(401).json({
					message: "Unauthorized",
				});
			}

			let check = null;
			if (data.role === "retailer") {
				check = await Retailer.findById(data._id);
			} else {
				check = await User.findById(data._id);
			}

			if (!check) {
				return res.status(401).json({
					message: "Unauthorized",
				});
			}
			if (check.status === "blocked") {
				return res.status(403).json({
					message: "User is blocked",
				});
			}

			req.user = check;
			next();
		} catch (error) {
			return res.status(401).json({
				message: error.message,
			});
		}
	},

	/**
	 * Middleware to check if user is authorized and has the right role
	 * @param {String} role - The role to check
	 * @returns {Function} - The middleware function
	 * @example
	 * To check if user is an admin
	 * router.put('/profile', authorization('admin'), userController.updateProfile);
	 */
	authentication: role => async (req, res, next) => {
		if (!req.headers.authorization) {
			return res.status(401).json({
				message: "Unauthorized",
			});
		}
		const token = req.headers.authorization.split(" ")[1];

		try {
			const user = jwt.verify(token, process.env.JWT_SECRET);
			if (!user) {
				return res.status(401).json({
					message: "Unauthorized",
				});
			}
			if (user.role !== role) {
				return res.status(403).json({
					message: "Forbidden",
				});
			}
			let check = null;

			if (role === "retailer") {
				check = await Retailer.findById(user._id);
			} else {
				check = await User.findById(user._id);
			}
			await User.findById(user._id);
			if (!check) {
				return res.status(401).json({
					message: "Unauthorized",
				});
			}
			if (check.status === "blocked") {
				return res.status(403).json({
					message: "User is blocked",
				});
			}
			req.user = user;
			next();
		} catch (error) {
			return res.status(401).json({
				message: error.message,
			});
		}
	},
};

module.exports = authMiddlewares;
