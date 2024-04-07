const router = require('express').Router();

const {
    getNotification,
    readNotifications,
    deleteNotification,
} = require('../../controllers/notificationController');
const { authorization } = require('../../middlewares/authMiddlewares');

router.get('/:toUser', authorization, getNotification);
router.put('/', authorization, readNotifications);
router.delete('/:notificationId', authorization, deleteNotification);

module.exports = router;
