const router = require('express').Router();

const locationRouter = require('./locationRouter');
const informationRouter = require('./informationRouter');
const rateRouter = require('./rateRouter');

router.use('/locations', locationRouter);
router.use('/community', informationRouter);
router.use('/rates', rateRouter);

module.exports = router;
