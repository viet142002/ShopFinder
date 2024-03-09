const router = require('express').Router();

const upload = require('../../../configs/multer');

const retailerController = require('../../controllers/retailerController');
const { authorization } = require('../../middlewares/authMiddlewares');

router.post(
    '/register',
    authorization,
    upload.array('images', 10),
    retailerController.register
);
router.get('/infoMyRetailer', authorization, retailerController.infoMyRetailer);

module.exports = router;
