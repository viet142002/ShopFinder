const WarehouseReceipt = require("../models/warehouseReceiptModel");
const productController = require("./productController");

const warehouseReceiptController = {
	// Create a new warehouse receipt
	async createWarehouseReceipt(req, res) {
		try {
			const { note, type, products } = req.body;
			const { retailer } = req.user;
			let productsArray = [];
			let totalPrice = 0;
			for (let i = 0; i < products.length; i++) {
				productsArray.push({
					product: products[i]._id,
					quantity: products[i].amount,
					price_import: products[i].price_import,
				});
				totalPrice += products[i].price_import * products[i].amount;
			}
			await productController.addQuantity(productsArray);
			const warehouseReceipt = new WarehouseReceipt({
				note,
				type,
				total_price: totalPrice,
				products: productsArray,
				retailer,
			});
			await warehouseReceipt.save();
			res.status(201).json({
				warehouseReceipt,
				message: "Warehouse receipt created successfully",
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
			const { retailer: retailerId } = req.user;
			const { fromDate, toDate } = req.query;
			const warehouseReceipts = await WarehouseReceipt.find({
				retailer: retailerId,
				createdAt: {
					$gte: new Date(fromDate || "2020-01-01"),
					$lt: new Date(toDate || new Date()),
				},
			})
				.populate({
					path: "products.product",
					select: "name price images",
					populate: {
						path: "images",
						select: "path",
					},
				})
				.sort({ createdAt: -1 });
			return res.status(200).json({
				warehouseReceipts,
				message: "All warehouse receipts",
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
			).populate({
				path: "products.product",
				select: "name price images",
				populate: {
					path: "images",
					select: "path",
				},
			});
			if (!warehouseReceipt) {
				return res.status(404).json({
					message: "Warehouse receipt not found",
				});
			}
			res.status(200).json({
				warehouseReceipt,
				message: "Warehouse receipt found",
			});
		} catch (error) {
			return res.status(500).json({
				message: error.message,
			});
		}
	},
};

module.exports = warehouseReceiptController;
