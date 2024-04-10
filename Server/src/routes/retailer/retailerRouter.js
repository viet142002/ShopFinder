const router = require('express').Router();

const upload = require('../../../configs/multer');

const retailerController = require('../../controllers/retailerController');

router.post(
    '/register',
    upload.array('images', 10),
    retailerController.register
);
router.put(
    '/update-retailer',
    upload.array('images', 10),
    retailerController.update
);
router.get('/infoMyRetailer', retailerController.infoMyRetailer);

module.exports = router;
