const Notification = require('../Models/notificationModel');

exports.createNotification = async ({
    toUser,
    from,
    fromType = 'User',
    type,
    target,
    message,
}) => {
    if ([toUser, from, fromType, type, target, message].includes(undefined)) {
        throw new Error('Missing fields fields');
    }

    const notification = new Notification({
        toUser,
        from,
        fromType,
        type,
        target,
        message,
    });
    await notification.save();
    return notification;
};

exports.getNotification = async (req, res) => {
    try {
        const { toUser } = req.params;
        let notifications = [];
        // populate from, populate from.logo when is Retailer and from.avatar when is User
        const notificationsFromUser = await Notification.find({
            toUser,
            fromType: 'User',
        })
            .populate({
                path: 'from',
                populate: {
                    path: 'avatar',
                },
            })
            .sort({ createdAt: -1 });
        const notificationsFromRetailer = await Notification.find({
            toUser,
            fromType: 'Retailer',
        })
            .populate({
                path: 'from',
                populate: {
                    path: 'logo',
                },
            })
            .sort({ createdAt: -1 });

        notifications = [
            ...notificationsFromUser,
            ...notificationsFromRetailer,
        ];

        notifications.sort((a, b) => b.createdAt - a.createdAt);

        return res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.readNotifications = async (req, res) => {
    try {
        const notification = await Notification.updateMany(
            {
                isRead: false,
            },
            {
                isRead: true,
            }
        );
        return res.status(200).json(notification);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        const user = req.user;
        const { notificationId } = req.params;
        const notification = await Notification.findById(notificationId);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        if (notification.toId.toString() !== user._id.toString()) {
            return res.status(403).json({ message: 'Permission denied' });
        }

        await Notification.findByIdAndRemove(notificationId);
        return res.status(200).json({ message: 'Notification deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.findOneAndDelete = async ({ ...values }) => {
    return await Notification.findOneAndDelete({ ...values });
};
