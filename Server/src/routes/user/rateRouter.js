const router = require('express').Router();

const {
    getRates,
    getCountRates,
    addRate,
    updateRate,
    deleteRate,
    likeRate,
    dislikeRate,
} = require('../../controllers/rateController');
const { authorization } = require('../../middlewares/authMiddlewares');
const upload = require('../../../configs/multer');

router.get('/', getRates);
router.get('/count-star', getCountRates);
router.post('/', authorization, upload.array('images', 10), addRate);
router.put('/:id', authorization, upload.array('images', 10), updateRate);
router.delete('/:id', authorization, deleteRate);
router.put('/like/:id', authorization, likeRate);
router.put('/dislike/:id', authorization, dislikeRate);

module.exports = router;
