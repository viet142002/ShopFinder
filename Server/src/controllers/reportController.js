const Report = require('../Models/reportModel');

const reportController = {
    getReports: async (req, res) => {
        try {
            const { status, limit = 20, skip = 0, reason } = req.query;
            const query = {};

            if (status) query.status = status;
            if (reason) query.reason = reason;

            const reports = await Report.find(query)
                .limit(parseInt(limit, 10))
                .skip(parseInt(skip, 10))
                .populate('from', 'firstname lastname avatar email')
                .populate('to');

            const length = reports.length;

            return res.status(200).json({
                reports,
                length,
                message: 'Reports retrieved successfully',
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
                .populate('from', 'firstname lastname avatar email')
                .populate('to');

            if (!report) {
                return res.status(404).json({
                    message: 'Report not found',
                });
            }

            return res.status(200).json({
                report,
                message: 'Report retrieved successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    createReport: async (req, res) => {
        try {
            const { to, toType, reason, description } = req.body;
            const report = new Report({
                from: req.user._id,
                to,
                toType,
                reason,
                description,
            });

            await report.save();

            return res.status(201).json({
                report,
                message: 'Report created successfully',
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
                    message: 'Report not found',
                });
            }

            report.status = status;
            await report.save();

            return res.status(200).json({
                report,
                message: 'Report updated successfully',
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
                    message: 'Report not found',
                });
            }

            return res.status(200).json({
                message: 'Report deleted successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },
};

module.exports = reportController;
