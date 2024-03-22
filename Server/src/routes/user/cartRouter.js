const router = require('express').Router();

const {
    getCart,
    addToCart,
    removeFromCart,
    updateCart,
} = require('../../controllers/cartController');
const { authorization } = require('../../middlewares/authMiddlewares');

router.get('/', authorization, getCart);
router.post('/', authorization, addToCart);
router.delete('/', authorization, removeFromCart);
router.put('/', authorization, updateCart);

module.exports = router;
