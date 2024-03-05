const router = require('express').Router();

const { authorization } = require('../../middlewares/authMiddlewares');
const upload = require('../../../configs/multer');
const InformationCommunityController = require('../../controllers/informationCommunityController');

router.post(
    '/share-store',
    upload.array('images', 10),
    authorization,
    InformationCommunityController.create
);

module.exports = router;
