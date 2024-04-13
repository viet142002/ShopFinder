import api from './instantApi';
import axios from 'axios';

export const getUser = () => {
    return api.get('/user');
};

export const updateUser = (id, data) => {
    return api.put(`/user/profile/${id}`, data);
};

export const forgotPassword = (data) => {
    return api.post('/user/send-mail', data);
};

export const resetPassword = ({ data, token }) => {
    return axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/user/new-password`,
        data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
    );
};
