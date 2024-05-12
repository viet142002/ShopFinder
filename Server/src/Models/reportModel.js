const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
	{
		from: {
			type: mongoose.Schema.Types.ObjectId,
			refPath: "fromType",
			discriminatorKey: "fromType",
			required: true,
		},
		fromType: {
			type: String,
			enum: ["User", "Retailer"],
			required: true,
		},
		to: {
			type: mongoose.Schema.Types.ObjectId,
			refPath: "toType",
			discriminatorKey: "toType",
			required: true,
		},
		toType: {
			type: String,
			enum: ["Rate", "Retailer", "Product", "Information"],
			required: true,
		},
		reason: {
			type: String,
			required: true,
			enum: [
				"spam",
				"fake",
				"harassment",
				"hate-speech",
				"violence",
				"wrong-information",
				"other",
			],
		},
		description: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["pending", "processed"],
			default: "pending",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Report", reportSchema);
