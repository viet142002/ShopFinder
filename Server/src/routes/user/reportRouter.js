const router = require('express').Router();

const { authorization } = require('../../middlewares/authMiddlewares');

const reportController = require('../../controllers/reportController');

router.post('/', authorization, reportController.createReport);

module.exports = router;
