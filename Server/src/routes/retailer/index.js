const router = require('express').Router();

const { authentication } = require('../../middlewares/authMiddlewares');

const retailerRouter = require('./retailerRouter');
const productRouter = require('./productRouter');
const warehouseReceiptRouter = require('./warehouseReceiptRouter');
const priceShippingRouter = require('./priceShippingRouter');

router.use('/', retailerRouter);
router.use('/products', authentication('retailer'), productRouter);
router.use('/warehouse', authentication('retailer'), warehouseReceiptRouter);
router.use('/price-ship', authentication('retailer'), priceShippingRouter);

module.exports = router;
