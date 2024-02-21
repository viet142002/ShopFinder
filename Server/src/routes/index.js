const express = require('express');

const authRouter = require('./authRouter');
const retailerRouter = require('./retailer');
const adminRouter = require('./admin');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/retailer', retailerRouter);
router.use('/admin', adminRouter);

module.exports = router;
