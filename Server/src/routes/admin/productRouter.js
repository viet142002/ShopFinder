const router = require('express').Router();

const ProductControl = require('../../controllers/productController');

router.patch('/:id', ProductControl.updateStatusByAdmin);

module.exports = router;
