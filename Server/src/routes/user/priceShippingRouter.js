const router = require('express').Router();

const priceShippingController = require('../../controllers/priceShippingController');

router.get('/:id', priceShippingController.getOne);
router.get('/retailer/:id', priceShippingController.getByRetailerId);

module.exports = router;
