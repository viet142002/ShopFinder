const router = require('express').Router();

const userController = require('../../controllers/userController');
const { authorization } = require('../../middlewares/authMiddlewares');
const upload = require('../../../configs/multer');

router.put(
    '/profile/:id',
    authorization,
    upload.single('avatar'),
    userController.updateProfile
);

module.exports = router;
