const router = require('express').Router();

const locationRouter = require('./locationRouter');
const informationRouter = require('./informationRouter');
const rateRouter = require('./rateRouter');
const reportRouter = require('./reportRouter');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');
const cartRouter = require('./cartRouter');
const orderRouter = require('./orderRouter');
const priceShippingRouter = require('./priceShippingRouter');
const notificationRouter = require('./notificationRouter');

router.use('/locations', locationRouter);
router.use('/community', informationRouter);
router.use('/rates', rateRouter);
router.use('/reports', reportRouter);
router.use('/user', userRouter);
router.use('/products', productRouter);
router.use('/cart', cartRouter);
router.use('/orders', orderRouter);
router.use('/price-shipping', priceShippingRouter);
router.use('/notifications', notificationRouter);

module.exports = router;
