const express = require('express');
const authRouter = require('./authRouter');
const retailerRouter = require('./retailerRouter');

const router = express.Router();

router.use('/auth', authRouter);
router.use('/retailer', retailerRouter);

module.exports = router;
