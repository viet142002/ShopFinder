const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
	loc: {
		type: {
			type: String,
			enum: ["Point"],
			default: "Point",
		},
		coordinates: {
			type: [Number],
			required: true,
		},
	},
	address: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Address",
		required: true,
	},
	status: {
		type: String,
		enum: ["normal", "blocked"],
		default: "normal",
		required: true,
	},
	type: {
		type: String,
		enum: [
			"food",
			"furniture",
			"clothing",
			"electronics",
			"beverage",
			"other",
		],
		required: true,
	},
	information: {
		type: mongoose.Schema.Types.ObjectId,
		refPath: "informationType",
		discriminatorKey: "informationType",
		required: true,
	},
	informationType: {
		type: String,
		enum: ["Retailer", "Information"],
		required: true,
	},
});
locationSchema.index({ loc: "2dsphere" });
module.exports = mongoose.model("Location", locationSchema);
