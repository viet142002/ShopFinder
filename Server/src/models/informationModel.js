const mongoose = require("mongoose");

const informationSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
			unique: [true, "Store name already exists"],
		},
		user: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
		},
		location: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Location",
		},
		email: {
			type: String,
			default: "",
		},
		type: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			default: "",
		},
		description: {
			type: String,
			default: "",
		},
		logo: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "Image",
			default: "65fd4951f687ef962765aa4a",
		},
		status: {
			type: String,
			enum: ["blocked", "normal"],
			default: "normal",
		},
		images: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: "Image",
			},
		],
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Information", informationSchema);
