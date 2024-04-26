const router = require('express').Router();

const userController = require('../../controllers/userController');

router.get('/', userController.getAllUser);
router.patch('/:userId', userController.updateStatus);

module.exports = router;
