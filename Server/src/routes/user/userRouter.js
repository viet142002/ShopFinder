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
router.post('/new-password', authorization, userController.newPassword);
router.post('/send-mail', userController.sendMailReset);

module.exports = router;
