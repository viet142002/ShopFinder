const Order = require('../Models/orderModel');
const User = require('../Models/userModel');

const orderDetailController = require('./orderDetailController');
const addressController = require('./addressController');
const productController = require('./productController');

const orderController = {
    create: async (req, res) => {
        try {
            const {
                phone,
                firstname,
                lastname,
                orderItems,
                address,
                location,
                paymentMethod,
                note,
            } = req.body;

            const user = req.user;

            if (
                [orderItems, address, location, paymentMethod, user].includes(
                    undefined
                )
            ) {
                return res
                    .status(400)
                    .json({ message: 'Missing required information' });
            }

            if (paymentMethod !== 'VNPay' && paymentMethod !== 'COD') {
                return res
                    .status(400)
                    .json({ message: 'Invalid payment method' });
            }

            for (let i = 0; i < orderItems.length; i++) {
                const { items, shippingPrice, distributor } = orderItems[i];
                let newOrderItems = [];

                for (let j = 0; j < items.length; j++) {
                    const newOrderItem = await orderDetailController.create(
                        items[j],
                        user
                    );
                    newOrderItems.push(newOrderItem);
                }

                const shippingAddress = await addressController.create(address);

                const itemsPrice = newOrderItems.reduce(
                    (acc, item) => acc + item.price,
                    0
                );

                const totalPrice = itemsPrice + shippingPrice;

                const order = new Order({
                    distributor: distributor,
                    totalPrice,
                    phone,
                    fullName: `${lastname} ${firstname}`,
                    orderItems: newOrderItems.map(item => item._id),
                    shippingAddress,
                    location,
                    paymentMethod,
                    itemsPrice,
                    shippingPrice: shippingPrice,
                    user: user._id,
                    note,
                });

                await order.save();
            }

            return res.status(201).json({ message: 'Order created' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    get: async (req, res) => {
        try {
            const user = req.user;
            const { status } = req.query;
            const orders = await Order.find({ user: user._id })
                .populate({
                    path: 'orderItems',
                    populate: {
                        path: 'product',
                        select: 'name',
                        populate: {
                            path: 'images',
                        },
                    },
                })
                .populate('distributor', 'name')
                .where(status !== 'all' ? { status } : {})
                .sort({ createdAt: -1 });

            return res.status(200).json(orders);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    getById: async (req, res) => {
        try {
            const { id } = req.params;
            const order = await Order.findById(id)
                .populate({
                    path: 'orderItems',
                    populate: {
                        path: 'product',
                        select: 'name',
                        populate: {
                            path: 'images',
                        },
                    },
                })
                .populate('distributor', 'name')
                .populate('shippingAddress');

            return res.status(200).json(order);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    updateStatus: async (req, res) => {
        try {
            const { id } = req.params;
            const { status } = req.body;
            if (
                !['pending', 'shipping', 'success', 'cancelled'].includes(
                    status
                )
            ) {
                return res.status(400).json({ message: 'Invalid status' });
            }

            const order = await Order.findById(id).populate('orderItems');

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            if (status === 'success') {
                order.deliveredAt = new Date();
            }

            if (status === 'cancelled') {
                for (let i = 0; i < order.orderItems.length; i++) {
                    const orderItem = order.orderItems[i];
                    await productController.addQuantity([
                        {
                            _id: orderItem.product,
                            quantity: orderItem.quantity,
                        },
                    ]);
                }
            }

            order.status = status;
            await order.save();

            return res.status(200).json({ message: 'Order updated' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    getByRetailer: async (req, res) => {
        try {
            const user = req.user;
            const { status = 'all' } = req.query;
            const orders = await Order.find({
                distributor: user.retailer,
                status: status !== 'all' ? status : { $ne: '' },
            }).sort({ createdAt: -1 });

            return res.status(200).json(orders);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = orderController;
