const router = require('express').Router();

const { authentication } = require('../../middlewares/authMiddlewares');

const retailerRouter = require('./retailerRouter');
const productRouter = require('./productRouter');
const warehouseReceiptRouter = require('./warehouseReceiptRouter');
const priceShippingRouter = require('./priceShippingRouter');
const orderRouter = require('./orderRouter');
const analystRouter = require('./analystRouter');

router.use('/', authentication('retailer'), retailerRouter);
router.use('/products', authentication('retailer'), productRouter);
router.use('/warehouse', authentication('retailer'), warehouseReceiptRouter);
router.use('/price-ship', authentication('retailer'), priceShippingRouter);
router.use('/orders', authentication('retailer'), orderRouter);
router.use('/analyst', authentication('retailer'), analystRouter);

module.exports = router;
