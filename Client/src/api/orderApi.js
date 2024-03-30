import api from './instantApi';

export const getOrders = async ({
    page = 1,
    limit = 10,
    sort = '-createdAt',
    status = 'all'
}) => {
    return api.get('/orders', {
        params: {
            page: page,
            limit: limit,
            sort: sort,
            status: status
        }
    });
};

export const getOrder = async (id) => {
    return api.get(`/orders/${id}`);
};

export const updateOrder = async (id, data) => {
    return api.put(`/orders/${id}`, data);
};

export const createOrder = async (data) => {
    return api.post('/orders', data);
};
