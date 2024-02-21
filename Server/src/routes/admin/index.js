const router = require('express').Router();

const retailerRouter = require('./retailerRouter');

router.use('/retailer', retailerRouter);

module.exports = router;
