const router = require('express').Router();

// const upload = require('../../../configs/multer');

const priceShippingController = require('../../controllers/priceShippingController');
const { authentication } = require('../../middlewares/authMiddlewares');

router.post('/', authentication('retailer'), priceShippingController.add);

router.get('/', authentication('retailer'), priceShippingController.get);

router.delete(
    '/:id',
    authentication('retailer'),
    priceShippingController.remove
);

module.exports = router;
