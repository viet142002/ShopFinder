const router = require('express').Router();

const retailerRouter = require('./retailerRouter');
const reportRouter = require('./reportRouter');
const userRouter = require('./userRouter');

router.use('/retailer', retailerRouter);
router.use('/reports', reportRouter);
router.use('/users', userRouter);

module.exports = router;
