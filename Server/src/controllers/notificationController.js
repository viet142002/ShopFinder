const Notification = require('../Models/notificationModel');

exports.createNotification = async ({
    toUser,
    fromUser,
    type,
    target,
    message,
}) => {
    if ([toUser, fromUser, type, target, message].includes(undefined)) {
        throw new Error('Missing fields fields');
    }

    const notification = new Notification({
        toUser,
        fromUser,
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
        const notifications = await Notification.find({ toUser }).populate({
            path: 'fromUser',
            select: 'firstname lastname avatar',
            populate: {
                path: 'avatar',
            },
        });
        return res.status(200).json(notifications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

exports.readNotification = async (req, res) => {
    try {
        const { notificationId } = req.params;
        const notification = await Notification.findByIdAndUpdate(
            notificationId,
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

exports.findOneAndDelete = async ({ key, value }) => {
    return await Notification.findOneAndDelete({ [key]: value });
};
