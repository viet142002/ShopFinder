const router = require('express').Router();

const { authentication } = require('../../middlewares/authMiddlewares');

const retailerRouter = require('./retailerRouter');
const productRouter = require('./productRouter');
const warehouseReceiptRouter = require('./warehouseReceiptRouter');

router.use('', retailerRouter);
router.use('/products', authentication('retailer'), productRouter);
router.use(
    '/warehouse-receipts',
    authentication('retailer'),
    warehouseReceiptRouter
);

module.exports = router;
