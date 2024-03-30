const router = require('express').Router();

const orderController = require('../../controllers/orderController');
const { authorization } = require('../../middlewares/authMiddlewares');

router.post('/', authorization, orderController.create);
router.get('/', authorization, orderController.get);

module.exports = router;
