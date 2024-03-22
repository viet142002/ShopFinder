import api from './instantApi';

export const getCartApi = () => {
    return api.get('/cart');
};

export const addToCartApi = (data) => {
    return api.post('/cart', data);
};

export const removeFromCartApi = (data) => {
    return api.delete('/cart', { data });
};

export const updateCartApi = (data) => {
    return api.put('/cart', data);
};
