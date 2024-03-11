const router = require('express').Router();

const {
    getRates,
    addRate,
    updateRate,
    deleteRate,
} = require('../../controllers/rateController');
const { authorization } = require('../../middlewares/authMiddlewares');
const upload = require('../../../configs/multer');

router.get('/', getRates);
router.post('/', authorization, upload.array('images', 10), addRate);
router.put('/:id', authorization, upload.array('images'), updateRate);
router.delete('/:id', authorization, deleteRate);

module.exports = router;
