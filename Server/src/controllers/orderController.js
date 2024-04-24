const moment = require('moment');

const Order = require('../Models/orderModel');

const orderDetailController = require('./orderDetailController');
const addressController = require('./addressController');
const productController = require('./productController');
const notificationController = require('./notificationController');
const detailPaymentController = require('./detailPaymentController');
const cartController = require('./cartController');

const orderController = {
    createInstance: async data => {
        const {
            status = 'pending',
            phone,
            firstname,
            lastname,
            orderItems,
            address,
            location,
            paymentMethod,
            note,
            user,
            isDeleteCart = true,
        } = data;
        let orders = [];

        if (
            [orderItems, address, location, paymentMethod, user].includes(
                undefined
            )
        ) {
            throw new Error('Missing required information');
        }

        if (paymentMethod !== 'VNPay' && paymentMethod !== 'COD') {
            throw new Error('Invalid payment method');
        }

        for (let i = 0; i < orderItems.length; i++) {
            const { items, shippingPrice, distributor } = orderItems[i];
            let newOrderItems = [];

            for (let j = 0; j < items.length; j++) {
                const newOrderItem = await orderDetailController.create(
                    items[j],
                    user,
                    isDeleteCart
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
                user: user,
                note,
                status,
            });

            await order.save();
            orders.push(order);
        }

        return orders;
    },
    create: async (req, res) => {
        try {
            const orders = await orderController.createInstance({
                ...req.body,
                user: req.user,
            });
            return res.status(201).json({ message: 'Order created', orders });
        } catch (error) {
            console.error(error.message);
            return res
                .status(500)
                .json({ message: error?.message || 'Internal server error' });
        }
    },
    createByVNPay: async (req, res) => {
        try {
            const orders = await orderController.createInstance({
                ...req.body,
                status: 'pendingPayment',
                user: req.user,
                isDeleteCart: false,
            });

            var ipAddr =
                req.headers['x-forwarded-for'] ||
                req.connection.remoteAddress ||
                req.socket.remoteAddress ||
                req.connection.socket.remoteAddress;

            var tmnCode = process.env.VNP_TMN_CODE;
            var secretKey = process.env.VNP_HASH_SECRET;
            var vnpUrl = process.env.VNP_URL;

            var returnUrl =
                process.env.CLIENT_URL_VNPAY_RETURN +
                '?orderId=' +
                orders[0]._id;

            const date = new Date();
            var createDate = moment(date).format('YYYYMMDDHHmmss');
            var amount = req.body.amount;
            var orderInfo = 'Thanh toan don hang';
            var orderType = 'billpayment';
            var locale = 'vn';
            var currCode = 'VND';

            var vnp_Params = {};
            vnp_Params['vnp_Version'] = '2.1.0';
            vnp_Params['vnp_Command'] = 'pay';
            vnp_Params['vnp_TmnCode'] = tmnCode;
            vnp_Params['vnp_Locale'] = locale;
            vnp_Params['vnp_CurrCode'] = currCode;
            vnp_Params['vnp_TxnRef'] = new Date().getTime();
            vnp_Params['vnp_OrderInfo'] = orderInfo;
            vnp_Params['vnp_OrderType'] = orderType;
            vnp_Params['vnp_Amount'] = amount * 100;
            vnp_Params['vnp_ReturnUrl'] = returnUrl;
            vnp_Params['vnp_IpAddr'] = ipAddr;
            vnp_Params['vnp_CreateDate'] = createDate;

            vnp_Params = sortObject(vnp_Params);

            var querystring = require('qs');
            var signData = querystring.stringify(vnp_Params, { encode: false });
            var crypto = require('crypto');
            var hmac = crypto.createHmac('sha512', secretKey);
            const signed = hmac
                .update(new Buffer.from(signData, 'utf-8'))
                .digest('hex');
            vnp_Params['vnp_SecureHash'] = signed;
            vnpUrl +=
                '?' + querystring.stringify(vnp_Params, { encode: false });

            res.status(200).json({
                code: '00',
                vnpUrl,
            });
        } catch (error) {
            res.status(500).json({
                message: error.message,
            });
        }
    },
    addDetailPayment: async (req, res) => {
        try {
            const { id } = req.params;
            const { status, detailPaymentData } = req.body;

            const order = await Order.findById(id).populate('orderItems');
            console.log('🚀 ~ addDetailPayment: ~ order:', order);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            const detailPayment = await detailPaymentController.create(
                detailPaymentData
            );
            order.detailPayment = detailPayment;
            order.status = status;

            if (status === 'pending') {
                // delete cart
                const productIds = order.orderItems.map(item =>
                    item.product.toString()
                );
                await cartController.removeFormCartByIds(
                    order.user,
                    productIds
                );
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

            await order.save();

            return res.status(200).json({ message: 'Detail payment added' });
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
                .populate({
                    path: 'distributor',
                    select: 'name location',
                    populate: {
                        path: 'location',
                        select: 'address',
                        populate: {
                            path: 'address',
                        },
                    },
                })
                .populate('shippingAddress detailPayment');

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

            const order = await Order.findById(id)
                .populate('orderItems')
                .populate('distributor', 'name');

            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }

            if (order.status === 'cancelled') {
                return res.status(400).json({ message: 'Order was cancelled' });
            }

            if (status === 'shipping') {
                await notificationController.createNotification({
                    toUser: order.user,
                    from: order.distributor,
                    fromType: 'Retailer',
                    type: 'ORDER',
                    target: order._id,
                    message: `Đơn hàng của bạn tại ${order.distributor.name} đang được vận chuyển`,
                });
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

function sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
            str.push(encodeURIComponent(key));
        }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
        sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(
            /%20/g,
            '+'
        );
    }
    return sorted;
}

module.exports = orderController;
