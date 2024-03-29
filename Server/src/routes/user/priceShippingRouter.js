const router = require('express').Router();

const priceShippingController = require('../../controllers/priceShippingController');

router.get('/:id', priceShippingController.getOne);

module.exports = router;
