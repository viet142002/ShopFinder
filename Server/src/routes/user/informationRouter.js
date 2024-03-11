const router = require('express').Router();

const { authorization } = require('../../middlewares/authMiddlewares');
const upload = require('../../../configs/multer');
const InformationController = require('../../controllers/informationController');

router.post(
    '/share-store',
    upload.array('images', 10),
    authorization,
    InformationController.create
);

module.exports = router;
