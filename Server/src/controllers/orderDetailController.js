const OrderDetail = require('../Models/orderDetailModel');
const Cart = require('../Models/cartModel');

const orderDetailController = {
    /* 
        data: [
            {
                distributor: 'distributorId',
                items: [
                    {
                        product: { _id },
                        quantity: 1,
                        price: 100,
                        discount: 0,
                    },
                ],
            }
        ]
    */
    create: async (data, user) => {
        let orderDetails = [];
        let productOrders = [];

        const cart = await Cart.findOne({
            user: user._id,
        });

        if (!cart) {
            throw new Error('Cart not found');
        }

        for (let i = 0; i < data.length; i++) {
            const newOrderDetail = new OrderDetail({
                distributor: data[i].distributor,
            });

            for (let j = 0; j < data[i].items.length; j++) {
                const prod = data[i].items[j];

                productOrders.push(prod.product._id);
                newOrderDetail.products.push({
                    product: prod.product._id,
                    quantity: prod.quantity,
                    price: prod.product.price,
                    discount: prod.product.discount,
                });
            }

            await newOrderDetail.save();
            orderDetails.push(newOrderDetail);
        }
        cart.items = cart.items.filter(item => {
            return !productOrders.includes(item.product.toString());
        });

        await cart.save();

        return orderDetails;
    },
};

module.exports = orderDetailController;
