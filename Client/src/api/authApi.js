import api from './instantApi';

export const loginApi = async ({ email, password }) => {
    try {
        const res = await api.post('/auth/signin', {
            email,
            password
        });
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const registerApi = async ({ firstname, lastname, email, password }) => {
    try {
        const res = await api.post('/auth/signup', {
            firstname,
            lastname,
            email,
            password
        });
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};
