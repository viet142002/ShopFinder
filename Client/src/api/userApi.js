import api from './instantApi';

export const getUser = () => {
    return api.get('/user');
};

export const updateUser = (id, data) => {
    return api.put(`/user/profile/${id}`, data);
};
