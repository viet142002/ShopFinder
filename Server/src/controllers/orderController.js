const Order = require('../Models/orderModel');
const User = require('../Models/userModel');

const orderDetailController = require('./orderDetailController');
const addressController = require('./addressController');

const orderController = {
    create: async (req, res) => {
        try {
            const {
                phone,
                firstName,
                lastName,
                orderItems,
                address,
                location,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                note,
            } = req.body;

            const user = req.user;

            if (
                [
                    orderItems,
                    address,
                    location,
                    paymentMethod,
                    itemsPrice,
                    shippingPrice,
                    user,
                ].includes(undefined)
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

            if (typeof itemsPrice !== 'number') {
                return res.status(400).json({ message: 'Invalid price' });
            }

            const newOrderItems = await orderDetailController.create(
                orderItems,
                user
            );
            const shippingAddress = await addressController.create(address);

            const totalPrice =
                itemsPrice +
                shippingPrice.reduce((acc, item) => acc + item.price, 0);

            const shippingPriceFormatted = shippingPrice.map(item => ({
                retailer: item.retailer._id,
                price: item.price,
            }));

            const order = new Order({
                totalPrice,
                phone,
                fullName: `${lastName} ${firstName}`,
                orderItems: newOrderItems.map(item => item._id),
                shippingAddress,
                location,
                paymentMethod,
                itemsPrice,
                shippingPrice: shippingPriceFormatted,
                user: user._id,
                note,
            });

            await order.save();

            return res.status(201).json({ message: 'Order created' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    get: async (req, res) => {
        try {
            const { user } = req.user;
            const orders = await Order.find({ user }).populate({
                path: 'orderItems',
                populate: [
                    { path: 'distributor', select: 'name' },
                    {
                        path: 'products.product',
                        select: 'name',
                        populate: {
                            path: 'images',
                        },
                    },
                ],
            });

            return res.status(200).json(orders);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = orderController;
