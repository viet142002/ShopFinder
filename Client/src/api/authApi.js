import api from './instantApi';

export const loginApi = ({ email, password }) => {
    return api.post('/auth/signin', {
        email,
        password
    });
};

export const registerApi = ({ firstname, lastname, email, password }) => {
    return api.post('/auth/signup', {
        firstname,
        lastname,
        email,
        password
    });
};
