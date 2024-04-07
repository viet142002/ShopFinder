import api from './instantApi';

export const getNotifications = async ({ toUser }) => {
    return await api.get(`/notifications/${toUser}`);
};

export const readNotifications = async () => {
    return await api.put(`/notifications`);
};

export const deleteNotification = async ({ notificationId }) => {
    return await api.delete(`/notifications/${notificationId}`);
};
