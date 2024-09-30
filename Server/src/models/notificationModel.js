const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
	{
		toUser: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		from: {
			type: mongoose.Schema.Types.ObjectId,
			refPath: "fromType",
			required: true,
		},
		fromType: {
			type: String,
			enum: ["User", "Retailer"],
			required: true,
		},
		type: {
			type: String,
			enum: ["LIKE_RATE", "RATE", "ORDER"],
			required: true,
		},
		target: {
			type: String,
			required: true,
		},
		message: {
			type: String,
			required: true,
		},
		isRead: {
			type: Boolean,
			default: false,
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Notification", notificationSchema);
