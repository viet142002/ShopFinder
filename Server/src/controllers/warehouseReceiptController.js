const WarehouseReceipt = require('../Models/warehouseReceiptModel');

const warehouseReceiptController = {
    // Create a new warehouse receipt
    async createWarehouseReceipt(req, res) {
        try {
            const { note, type, products, status } = req.body;
            const retailer = req.user._id;

            const warehouseReceipt = new WarehouseReceipt({
                note,
                type,
                products,
                retailer,
                status,
            });
            await warehouseReceipt.save();
            res.status(201).json({
                warehouseReceipt,
                message: 'Warehouse receipt created successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    // Get all warehouse receipts
    async getWarehouseReceipts(req, res) {
        try {
            const warehouseReceipts = await WarehouseReceipt.find();
            res.status(200).json({
                warehouseReceipts,
                message: 'All warehouse receipts',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    // Get a warehouse receipt by ID
    async getWarehouseReceipt(req, res) {
        try {
            const warehouseReceipt = await WarehouseReceipt.findById(
                req.params.id
            );
            if (!warehouseReceipt) {
                return res.status(404).json({
                    message: 'Warehouse receipt not found',
                });
            }
            res.status(200).json({
                warehouseReceipt,
                message: 'Warehouse receipt found',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    // Update a warehouse receipt by ID
    async updateWarehouseReceipt(req, res) {
        try {
            const warehouseReceipt = await WarehouseReceipt.findByIdAndUpdate(
                req.params.id,
                req.body,
                { new: true, runValidators: true }
            );
            if (!warehouseReceipt) {
                return res.status(404).json({
                    message: 'Warehouse receipt not found',
                });
            }
            res.status(200).json({
                warehouseReceipt,
                message: 'Warehouse receipt updated successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },

    // Delete a warehouse receipt by ID
    async deleteWarehouseReceipt(req, res) {
        try {
            const warehouseReceipt = await WarehouseReceipt.findByIdAndDelete(
                req.params.id
            );
            if (!warehouseReceipt) {
                return res.status(404).json({
                    message: 'Warehouse receipt not found',
                });
            }

            if (warehouseReceipt.status === 'completed') {
                return res.status(400).json({
                    message: 'Warehouse receipt cannot be deleted',
                });
            }
            res.status(200).json({
                warehouseReceipt,
                message: 'Warehouse receipt deleted successfully',
            });
        } catch (error) {
            return res.status(500).json({
                message: error.message,
            });
        }
    },
};

module.exports = warehouseReceiptController;
