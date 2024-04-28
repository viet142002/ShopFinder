const Cart = require('../Models/cartModel');
const Product = require('../Models/productModel');
const Location = require('../Models/locationModel');

const RetailerController = require('./retailerController');

const cartController = {
    addToCart: async (req, res) => {
        try {
            // cart is an objects with productId and quantity
            const { productId, quantity } = req.body;
            const user = req.user._id;

            const product = await Product.findById(productId);
            if (!product) {
                return res.status(400).json({ message: 'Product not found' });
            }

            const isBlockedRetailer =
                await RetailerController.checkBlockRetailer(
                    product.distributor
                );

            if (isBlockedRetailer) {
                return res.status(400).json({ message: 'Retailer is blocked' });
            }

            if (quantity > product.quantity) {
                return res.status(400).json({ message: 'Not enough product' });
            }

            const cartExist = await Cart.findOne({ user });
            if (cartExist) {
                const item = cartExist.items.find(
                    item => item.product == productId
                );
                if (item) {
                    item.quantity += +quantity;
                } else {
                    cartExist.items.push({ product: productId, quantity });
                }

                await cartExist.save();
                return res.json({ message: 'Added to cart' });
            }

            const newCart = new Cart({
                user,
                items: [{ product: productId, quantity }],
            });

            await newCart.save();
            return res.json({ message: 'Added to cart' });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    getCart: async (req, res) => {
        try {
            const user = req.user._id;
            const cart = await Cart.findOne({ user }).populate({
                path: 'items.product',
                populate: {
                    path: 'images distributor',
                    select: 'name _id path location status',
                },
            });

            // sort items by same distributor and info distributor in array
            const sortedCart = cart.items.reduce((result, item) => {
                const distributor = item.product.distributor;
                if (!result[distributor._id]) {
                    result[distributor._id] = {
                        distributor,
                        items: [item],
                    };
                } else {
                    result[distributor._id].items.push(item);
                }
                return result;
            }, {});

            // convert object sortedCart to array
            const cartArray = Object.values(sortedCart);

            // get location of distributor
            for (let i = 0; i < cartArray.length; i++) {
                const location = await Location.findById(
                    cartArray[i].distributor.location
                );
                cartArray[i].distributor.location = location;
            }

            return res.status(200).json(cartArray);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    removeFromCart: async (req, res) => {
        try {
            const { productId } = req.body;
            const user = req.user._id;

            const cart = await Cart.findOne({ user });
            cart.items = cart.items.filter(item => item.product != productId);
            await cart.save();
            return res.json({ message: 'Removed from cart' });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    updateCart: async (req, res) => {
        try {
            const { productId, quantity } = req.body;
            const user = req.user._id;

            const cart = await Cart.findOne({ user });
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(400).json({ message: 'Product not found' });
            }

            if (quantity > product.quantity) {
                return res.status(400).json({ message: 'Not enough product' });
            }
            const item = cart.items.find(item => item.product == productId);
            item.quantity = quantity;
            await cart.save();
            return res.json({ message: 'Cart updated' });
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },

    removeFormCartByIds: async (user, productIds) => {
        const cart = await Cart.findOne({ user });
        cart.items = cart.items.filter(
            item => !productIds.includes(item.product.toString())
        );
        await cart.save();
    },
};

module.exports = cartController;
