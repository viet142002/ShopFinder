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

export const loginWithGoogleApi = (data) => {
    return api.post('/auth/signin-google', data);
};

export const loginRetailerApi = (data) => {
    return api.post('/auth/signin-retailer', data);
};
