const router = require('express').Router();

const analystController = require('../../controllers/analystController');

router.get('/overview', analystController.getAnalystOverview);
router.get('/revenue', analystController.getRevenue);
router.get('/import', analystController.getPriceImport);
router.get('/top-product', analystController.getTopProduct);
router.get('/top-customer', analystController.getTopCustomer);

module.exports = router;
