const Report = require("../models/reportModel");

const reportController = {
	getReports: async (req, res) => {
		try {
			const { status, limit = 20, skip = 0, reason, type } = req.query;
			const query = {};

			if (status) {
				query.status =
					status === "all"
						? { $in: ["pending", "processed"] }
						: status;
			}
			if (reason) {
				query.reason =
					reason === "all"
						? {
								$in: [
									"spam",
									"fake",
									"harassment",
									"hate-speech",
									"violence",
									"wrong-information",
									"other",
								],
						  }
						: reason;
			}
			if (type) {
				query.toType =
					type === "all"
						? {
								$in: [
									"Rate",
									"Retailer",
									"Product",
									"Information",
								],
						  }
						: type;
			}

			const reports = await Report.find(query)
				.populate("from", "fullname name logo avatar email")
				.populate("to")
				.sort({ createdAt: -1 });

			const length = reports.length;

			return res.status(200).json({
				reports,
				length,
				message: "Reports retrieved successfully",
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	},

	getReport: async (req, res) => {
		try {
			const report = await Report.findById(req.params.id)
				.populate("from", "fullname name logo avatar email status")
				.populate("to");

			if (!report) {
				return res.status(404).json({
					message: "Report not found",
				});
			}

			let relatedReports = [];
			relatedReports.push(
				...(await Report.find({
					_id: { $ne: report._id },
					to: report.to,
					fromType: "Retailer",
				}).populate({
					path: "from",
					select: "name logo email status",
					populate: {
						path: "logo",
						select: "path",
					},
				}))
			);
			console.log("🚀 ~ getReport: ~ relatedReports:", relatedReports);
			relatedReports.push(
				...(await Report.find({
					_id: { $ne: report._id },
					to: report.to,
					fromType: "User",
				}).populate({
					path: "from",
					select: "fullname avatar email status",
					populate: {
						path: "avatar",
						select: "path",
					},
				}))
			);

			relatedReports.sort((a, b) => b.createdAt - a.createdAt);

			return res.status(200).json({
				report: {
					...report._doc,
					relatedReports,
				},
				message: "Report retrieved successfully",
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	},

	createReport: async (req, res) => {
		try {
			const { to, toType, reason, description, from, fromType } =
				req.body;
			const report = new Report({
				from,
				fromType,
				to,
				toType,
				reason,
				description,
			});

			await report.save();

			return res.status(201).json({
				report,
				message: "Report created successfully",
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	},

	updateReport: async (req, res) => {
		try {
			const { status } = req.body;
			const report = await Report.findById(req.params.id);

			if (!report) {
				return res.status(404).json({
					message: "Report not found",
				});
			}

			report.status = status;
			await report.save();

			return res.status(200).json({
				report,
				message: "Report updated successfully",
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	},

	deleteReport: async (req, res) => {
		try {
			const report = await Report.findByIdAndDelete(req.params.id);

			if (!report) {
				return res.status(404).json({
					message: "Report not found",
				});
			}

			return res.status(200).json({
				message: "Report deleted successfully",
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	},

	deleteReports: async (req, res) => {
		try {
			const { reports } = req.body;

			await Report.deleteMany({ _id: { $in: reports } });

			return res.status(200).json({
				message: "Reports deleted successfully",
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	},
};

module.exports = reportController;
