import api from './instantApi';

export const getNotifications = async ({ toUser }) => {
    return await api.get(`/notifications/${toUser}`);
};

export const readNotification = async ({ notificationId }) => {
    return await api.put(`/notifications/${notificationId}`);
};

export const deleteNotification = async ({ notificationId }) => {
    return await api.delete(`/notifications/${notificationId}`);
};
