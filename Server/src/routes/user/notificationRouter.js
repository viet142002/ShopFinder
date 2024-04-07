const router = require('express').Router();

const {
    getNotification,
    readNotification,
    deleteNotification,
} = require('../../controllers/notificationController');
const { authorization } = require('../../middlewares/authMiddlewares');

router.get('/:toUser', authorization, getNotification);
router.put('/:notificationId', authorization, readNotification);
router.delete('/:notificationId', authorization, deleteNotification);

module.exports = router;
