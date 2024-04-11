const router = require('express').Router();

const orderController = require('../../controllers/orderController');
const { authorization } = require('../../middlewares/authMiddlewares');

router.post('/', authorization, orderController.create);
router.post('/vnpay', authorization, orderController.createByVNPay);
router.post(
    '/add-detail-payment/:id',
    authorization,
    orderController.addDetailPayment
);
router.patch('/:id', authorization, orderController.updateStatus);
router.get('/', authorization, orderController.get);
router.get('/:id', authorization, orderController.getById);

module.exports = router;
