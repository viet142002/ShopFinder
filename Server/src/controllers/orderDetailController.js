const OrderDetail = require('../Models/orderDetailModel');
const Cart = require('../Models/cartModel');
const productController = require('./productController');

const orderDetailController = {
    /* 
        data: [
            {
                productId: '1234567890',
                quantity: 1,
                // price: quantity * price * (1 - discount/100)
                price: 100,
                discount: 0,
            },
        ]
    */
    create: async (data, user) => {
        const cart = await Cart.findOne({
            user: user._id,
        });

        if (!cart) {
            throw new Error('Cart not found');
        }

        const newOrderDetail = new OrderDetail({
            quantity: data.quantity,
            price: data.price,
            discount: data.discount,
            product: data.productId,
        });

        await newOrderDetail.save();

        cart.items = cart.items.filter(item => {
            return data.productId !== item.product.toString();
        });

        await cart.save();

        await productController.subtractQuantity([
            {
                _id: data.productId,
                quantity: data.quantity,
            },
        ]);

        return newOrderDetail;
    },
};

module.exports = orderDetailController;
