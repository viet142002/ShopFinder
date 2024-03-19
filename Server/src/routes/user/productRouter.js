const router = require('express').Router();
const productController = require('../../controllers/productController');

router.get('/:id', productController.getProductsFromDistributor);
router.get('/detail/:id', productController.getProductById);

module.exports = router;
