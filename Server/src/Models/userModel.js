const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
		unique: [true, "Email already exists"],
	},
	password: {
		type: String,
		required: true,
	},
	fullname: {
		type: String,
		default: "",
	},
	avatar: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Image",
		default: "65fd48caf687ef962765aa49",
	},
	status: {
		type: String,
		enum: ["normal", "blocked"],
		default: "normal",
	},
	address: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Address",
	},
	phone: {
		type: String,
		default: "",
	},
	role: {
		type: String,
		enum: ["customer", "admin", "retailer"],
		default: "customer",
	},
});

module.exports = mongoose.model("User", userSchema);
