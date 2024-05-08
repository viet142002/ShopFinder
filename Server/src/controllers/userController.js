const bcrypt = require("bcrypt");
const User = require("../Models/userModel");
const Retailer = require("../Models/retailerModel");

const RetailerControl = require("./retailerController");
const imageController = require("./imageController");
const addressController = require("./addressController");

const { sendMail, generateToken } = require("../helper");

const userController = {
	updateProfile: async (req, res) => {
		try {
			const { firstname, lastname, address, phone } = req.body;
			const avatar = req?.file?.filename || null;

			if (!firstname && !lastname && !address && !phone && !avatar)
				return res.status(400).json({ message: "No changes detected" });
			if (phone && !/^\d{10}$/.test(phone))
				return res
					.status(400)
					.json({ message: "Invalid phone number" });

			const user = await User.findById(req.user._id)
				.select("-password")
				.populate("avatar address");

			if (!user)
				return res.status(400).json({ message: "User not found" });

			if (firstname) user.firstname = firstname.trim();
			if (lastname) user.lastname = lastname.trim();
			if (address) {
				const newAddress = await addressController.create(
					JSON.parse(address)
				);
				user.address = newAddress;
			}
			if (phone) user.phone = phone;
			if (avatar) {
				if (user.avatar) {
					await imageController.delete(user.avatar._id);
				}
				const newImage = await imageController.createSingle(req.file);
				user.avatar = newImage;
			}

			await user.save();

			return res.status(200).json({
				updatedUser: user,
				message: "Profile updated successfully",
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: error.message });
		}
	},

	newPassword: async (req, res) => {
		try {
			const { password, rePassword, email, typeAccount } = req.body;

			if (password !== rePassword)
				return res.status(400).json({ message: "Password not match" });

			if (
				!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)
			)
				return res.status(400).json({
					message:
						"Password must contain at least 8 characters, including uppercase, lowercase and number",
				});
			console.log("🚀 ~ newPassword: ~ password:", password);
			if (typeAccount === "user") {
				const user = await User.findById(req.user._id);
				if (!user)
					return res.status(400).json({ message: "User not found" });

				if (user.email !== email)
					return res.status(400).json({ message: "Invalid email" });
				const hashPassword = await bcrypt.hash(password, 10);
				user.password = hashPassword;
				await user.save();
			}
			if (typeAccount === "retailer") {
				const retailer = await Retailer.findOne({ email });
				if (!retailer)
					return res
						.status(400)
						.json({ message: "Retailer not found" });
				const hashPassword = await bcrypt.hash(password, 10);
				retailer.password = hashPassword;
				await retailer.save();
			}
			return res
				.status(200)
				.json({ message: "Password updated successfully" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: error.message });
		}
	},

	getAllUser: async (req, res) => {
		try {
			const { status, name, phone, email, sort = "desc" } = req.query;
			const query = {
				role: {
					$ne: "admin",
				},
			};
			if (status && status !== "all") query.status = status;
			if (name) query.lastname = { $regex: name, $options: "i" };
			if (phone) query.phone = { $regex: phone, $options: "i" };
			if (email) query.email = { $regex: email, $options: "i" };

			const users = await User.find(query)
				.populate("avatar address")
				.sort(sort);

			return res.status(200).json({ users });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: error.message });
		}
	},

	updateStatus: async (req, res) => {
		try {
			const { userId } = req.params;
			const { status } = req.body;
			const user = await User.findById(userId);
			if (!user) {
				return res.status(400).json({ message: "User not found" });
			}
			if (status === "blocked") {
				const { retailer } = await RetailerControl.instanceUpdateStatus(
					user.pendingRetailer.retailer,
					"blocked"
				);
				user.pendingRetailer = {
					retailer: retailer._id,
					status: "blocked",
				};
			}
			if (status === "normal") {
				const { retailer } = await RetailerControl.instanceUpdateStatus(
					user.pendingRetailer.retailer,
					"approved"
				);
				user.pendingRetailer = {
					retailer: retailer._id,
					status: "approved",
				};
			}
			user.status = status;
			await user.save();
			return res.status(200).json({
				message: "Update status successfully",
			});
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: error.message });
		}
	},

	sendMailReset: async (req, res) => {
		try {
			const { email, typeAccount = "user" } = req.body;

			let data = null;

			if (typeAccount === "user") {
				const data = await User.findOne({ email });
				if (!data)
					return res.status(400).json({ message: "Email not found" });
			}
			if (typeAccount === "retailer") {
				data = await Retailer.findOne({ email });
			}
			const token = generateToken(
				{
					...data._doc,
					role: typeAccount,
				},
				"10m"
			);
			const html = `
                <h1>Thay đôi mật khẩu</h1>
                <p>Click vào liên kết để thay đổi mật khẩu của bạn!</p>
                <a href="${process.env.CLIENT_URL}/new-password?token=${token}&email=${data.email}&typeAccount=${typeAccount}" blank>Reset password</a>
            `;
			await sendMail({
				to: data.email,
				subject: "Reset password",
				text: "Reset password",
				html,
			});

			return res.status(200).json({ message: "Email sent successfully" });
		} catch (error) {
			console.error(error);
			return res.status(500).json({ message: error.message });
		}
	},
};

module.exports = userController;
