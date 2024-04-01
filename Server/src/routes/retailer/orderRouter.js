const router = require('express').Router();

const orderController = require('../../controllers/orderController');

router.get('/', orderController.getByRetailer);

router.patch('/:id', orderController.updateStatus);

module.exports = router;
