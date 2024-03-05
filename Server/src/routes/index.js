const express = require('express');

const authRouter = require('./authRouter');
const retailerRouter = require('./retailer');
const adminRouter = require('./admin');
const userRouter = require('./user');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/retailer', retailerRouter);
router.use('/admin', adminRouter);
router.use('/', userRouter);

module.exports = router;
