const router = require('express').Router();

const locationRouter = require('./locationRouter');
const informationCommunityRouter = require('./informationCommunityRouter');

router.use('/locations', locationRouter);
router.use('/community', informationCommunityRouter);

module.exports = router;
