const router = require('express').Router();

const retailerRouter = require('./retailerRouter');
const reportRouter = require('./reportRouter');

router.use('/retailer', retailerRouter);
router.use('/reports', reportRouter);

module.exports = router;
