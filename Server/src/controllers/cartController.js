const Cart = require('../Models/cartModel');

const cartController = {
    addToCart: async (req, res) => {
        try {
            // cart is an array of objects with productId and quantity
            const { cart } = req.body;
            const user = req.user._id;

            const cartExist = await Cart.findOne({ user });
            if (cartExist) {
                await Cart.findOneAndUpdate({ user }, { items: cart });
                return res.json({ message: 'Added to cart' });
            }

            const newCart = new Cart({
                user,
                items: cart,
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
            const cart = await Cart.findOne({ user }).populate('items.product');
            // sort items by same distributor in array
            const sortedCart = cart.items.reduce((result, item) => {
                const distributor = item.product.distributor._id;
                if (!result[distributor]) {
                    result[distributor] = [];
                }
                result[distributor].push(item);
                return result;
            }, {});

            return res.status(200).json(sortedCart);
        } catch (err) {
            return res.status(500).json({ message: err.message });
        }
    },
};

module.exports = cartController;
