const ObjectId = require('mongoose').Types.ObjectId;
const Order = require('../Models/orderModel');
const Product = require('../Models/productModel');
const Rate = require('../Models/rateModel');
const WarehouseReceipt = require('../Models/warehouseReceiptModel');

const { startOfWeek, startOfMonth, startOfYear } = require('date-fns');

const analystController = {
    // Get analyst overview
    getAnalystOverview: async (req, res) => {
        try {
            const { retailerId } = req.params;
            // only get in month
            const orders = await Order.find({
                distributor: retailerId,
                status: 'success',
                createdAt: {
                    $gte: new Date(
                        new Date().setDate(new Date().getDate() - 30)
                    ),
                },
            });
            const revenue = orders.reduce((acc, order) => {
                return acc + order.totalPrice;
            }, 0);
            const productTotal = await Product.countDocuments({
                distributor: retailerId,
            });
            const ratesTotal = await Rate.countDocuments({
                to: retailerId,
                toType: 'Retailer',
            });

            res.status(200).json({
                ordersTotal: orders.length,
                productTotal,
                ratesTotal,
                revenue,
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Get revenue follow week or month or year
    getRevenue: async (req, res) => {
        try {
            const retailerId = req.params.retailerId;
            const { time = 'year' } = req.query;
            if (time !== 'month' && time !== 'year' && time !== 'week') {
                return res.status(400).json({
                    message: 'Invalid time. Time must be month, year or week',
                });
            }
            let revenue = [];
            if (time === 'year') {
                revenue = await Order.aggregate([
                    {
                        $match: {
                            distributor: new ObjectId(retailerId),
                            status: 'success',
                            createdAt: {
                                $gte: startOfYear(new Date()),
                            },
                        },
                    },
                    {
                        $project: {
                            month: { $month: '$createdAt' },
                            totalPrice: 1,
                        },
                    },
                    {
                        $group: {
                            _id: '$month',
                            totalRevenue: { $sum: '$totalPrice' },
                        },
                    },
                    {
                        $sort: {
                            _id: 1,
                        },
                    },
                ]);
            }
            if (time === 'month') {
                revenue = await Order.aggregate([
                    {
                        $match: {
                            distributor: new ObjectId(retailerId),
                            status: 'success',
                            createdAt: {
                                $gte: startOfMonth(new Date()),
                            },
                        },
                    },
                    {
                        $project: {
                            day: { $dayOfMonth: '$createdAt' },
                            totalPrice: 1,
                        },
                    },
                    {
                        $group: {
                            _id: '$day',
                            totalRevenue: { $sum: '$totalPrice' },
                        },
                    },
                    {
                        $sort: {
                            _id: 1,
                        },
                    },
                ]);
            }
            if (time === 'week') {
                revenue = await Order.aggregate([
                    {
                        $match: {
                            distributor: new ObjectId(retailerId),
                            status: 'success',
                            createdAt: {
                                $gte: startOfWeek(new Date()),
                            },
                        },
                    },
                    {
                        $project: {
                            day: { $dayOfWeek: '$createdAt' },
                            totalPrice: 1,
                        },
                    },
                    {
                        $group: {
                            _id: '$day',
                            totalRevenue: { $sum: '$totalPrice' },
                        },
                    },
                    {
                        $sort: {
                            _id: 1,
                        },
                    },
                ]);
            }
            res.status(200).json({ revenue });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Get price import follow month or year or week
    getPriceImport: async (req, res) => {
        try {
            const retailerId = req.params.retailerId;
            const time = req.query.time;
            let price_import;

            if (time === 'year') {
                price_import = await WarehouseReceipt.aggregate([
                    {
                        $match: {
                            retailer: new ObjectId('65faa94bbd61e0c9c1d78b4e'),
                            type: 'import',
                            createdAt: {
                                $gte: startOfYear(new Date()),
                            },
                        },
                    },
                    {
                        $project: {
                            month: {
                                $month: '$createdAt',
                            },
                            total_price: 1,
                        },
                    },
                    {
                        $group: {
                            _id: '$month',
                            total_price: {
                                $sum: '$total_price',
                            },
                        },
                    },
                    {
                        $sort: {
                            _id: 1,
                        },
                    },
                ]);
            }
            if (time === 'month') {
                price_import = await WarehouseReceipt.aggregate([
                    {
                        $match: {
                            retailer: new ObjectId('65faa94bbd61e0c9c1d78b4e'),
                            type: 'import',
                            createdAt: {
                                $gte: startOfMonth(new Date()),
                            },
                        },
                    },
                    {
                        $project: {
                            day: {
                                $dayOfMonth: '$createdAt',
                            },
                            total_price: 1,
                        },
                    },
                    {
                        $group: {
                            _id: '$day',
                            total_price: {
                                $sum: '$total_price',
                            },
                        },
                    },
                    {
                        $sort: {
                            _id: 1,
                        },
                    },
                ]);
            }
            if (time === 'week') {
                price_import = await WarehouseReceipt.aggregate([
                    {
                        $match: {
                            retailer: new ObjectId('65faa94bbd61e0c9c1d78b4e'),
                            type: 'import',
                            createdAt: {
                                $gte: startOfWeek(new Date()),
                            },
                        },
                    },
                    {
                        $project: {
                            day: {
                                $dayOfWeek: '$createdAt',
                            },
                            total_price: 1,
                        },
                    },
                    {
                        $group: {
                            _id: '$day',
                            total_price: {
                                $sum: '$total_price',
                            },
                        },
                    },
                    {
                        $sort: {
                            _id: 1,
                        },
                    },
                ]);
            }
            res.status(200).json({ price_import });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Get top 5 product have the most quantity sold follow month or year or week
    getTopProduct: async (req, res) => {
        try {
            const retailerId = req.params.retailerId;
            console.log('🚀 ~ getTopProduct: ~ retailerId:', retailerId);
            const { time = 'year' } = req.query;
            const top_products = await Order.aggregate([
                {
                    $match: {
                        distributor: new ObjectId(retailerId),
                        status: 'success',
                        createdAt: {
                            $gte:
                                time === 'year'
                                    ? startOfYear(new Date())
                                    : time === 'month'
                                    ? startOfMonth(new Date())
                                    : startOfWeek(new Date()),
                        },
                    },
                },
                {
                    $unwind: '$orderItems',
                },
                {
                    $lookup: {
                        from: 'orderdetails',
                        localField: 'orderItems',
                        foreignField: '_id',
                        as: 'detail',
                    },
                },
                {
                    $unwind: '$detail',
                },
                {
                    $group: {
                        _id: '$detail.product',
                        totalQuantity: { $sum: '$detail.quantity' },
                    },
                },
                {
                    $lookup: {
                        from: 'products',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'product',
                    },
                },
                {
                    $unwind: '$product',
                },
                {
                    $sort: {
                        totalQuantity: -1,
                    },
                },
                {
                    $limit: 5,
                },
                {
                    $project: {
                        _id: 0,
                        product: 1,
                        totalQuantity: 1,
                    },
                },
            ]);

            return res.status(200).json({ top_products });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    // Get top 5 customer have the most total price follow month or year or week
    getTopCustomer: async (req, res) => {
        try {
            const retailerId = req.params.retailerId;
            const time = req.query.time;
            const topCustomers = await Order.aggregate([
                {
                    $match: {
                        distributor: new ObjectId(retailerId),
                        status: 'success',
                        createdAt: {
                            $gte:
                                time === 'year'
                                    ? startOfYear(new Date())
                                    : time === 'month'
                                    ? startOfMonth(new Date())
                                    : startOfWeek(new Date()),
                        },
                    },
                },
                {
                    $group: {
                        _id: '$user',
                        totalPrice: { $sum: '$totalPrice' },
                    },
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'user',
                    },
                },
                {
                    $unwind: '$user',
                },
                {
                    $sort: {
                        totalPrice: -1,
                    },
                },
                {
                    $limit: 5,
                },
                {
                    $project: {
                        _id: 0,
                        user: 1,
                        totalPrice: 1,
                    },
                },
            ]);
            return res.status(200).json({ topCustomers });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
};

module.exports = analystController;
