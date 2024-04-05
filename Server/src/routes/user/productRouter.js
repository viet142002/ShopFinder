const router = require('express').Router();
const productController = require('../../controllers/productController');

const upload = require('../../../configs/multer');

const { authorization } = require('../../middlewares/authMiddlewares');

router.get('/:id', productController.getProductsFromDistributor);
router.get('/detail/:id', productController.getProductById);
router.get('/distributor/:id', productController.getDistributorByProductId);

router.post(
    '/',
    authorization,
    upload.array('images', 10),
    productController.createProductByUser
);
router.put(
    '/:id',
    authorization,
    upload.array('images', 10),
    productController.updateProductByUser
);
router.delete('/:id', authorization, productController.deleteProductByUser);

module.exports = router;
