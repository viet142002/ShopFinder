import api from './instantApi';

export const getWarehousesApi = async (query) => {
    try {
        const res = await api.get('/retailer/warehouse', {
            params: query
        });
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getWarehouseApi = async (id) => {
    try {
        const res = await api.get(`/retailer/warehouse/${id}`);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const createWarehouseApi = async (data) => {
    return api.post('/retailer/warehouse', data);
};
