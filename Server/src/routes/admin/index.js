const router = require('express').Router();

const retailerRouter = require('./retailerRouter');
const reportRouter = require('./reportRouter');
const userRouter = require('./userRouter');
const informationRouter = require('./informationRouter');

router.use('/retailer', retailerRouter);
router.use('/reports', reportRouter);
router.use('/users', userRouter);
router.use('/information', informationRouter);

module.exports = router;
