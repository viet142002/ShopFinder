const router = require('express').Router();

const analystController = require('../../controllers/analystController');

router.get('/overview/:retailerId', analystController.getAnalystOverview);
router.get('/revenue/:retailerId', analystController.getRevenue);
router.get('/import/:retailerId', analystController.getPriceImport);
router.get('/top-product/:retailerId', analystController.getTopProduct);
router.get('/top-customer/:retailerId', analystController.getTopCustomer);

module.exports = router;
