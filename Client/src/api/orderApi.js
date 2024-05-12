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

export const getOrderById = async (id) => {
    return api.get(`/orders/${id}`);
};

export const updateStatusOrder = async (id, status) => {
    return api.patch(`/orders/${id}`, {
        status
    });
};

export const createOrder = async (data) => {
    return api.post('/orders', data);
};

export const createOrderWithVNPay = async (data) => {
    return api.post('/orders/vnpay', data);
};

export const addDetailPayment = async (orderId, data) => {
    return api.post(`/orders/add-detail-payment/${orderId}`, data);
};

export const getOrdersByDistributor = async (params) => {
    return api.get('/retailer/orders', {
        params
    });
};
