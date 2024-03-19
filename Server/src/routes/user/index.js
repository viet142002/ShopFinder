const router = require('express').Router();

const locationRouter = require('./locationRouter');
const informationRouter = require('./informationRouter');
const rateRouter = require('./rateRouter');
const reportRouter = require('./reportRouter');
const userRouter = require('./userRouter');
const productRouter = require('./productRouter');

router.use('/locations', locationRouter);
router.use('/community', informationRouter);
router.use('/rates', rateRouter);
router.use('/reports', reportRouter);
router.use('/user', userRouter);
router.use('/products', productRouter);

module.exports = router;
