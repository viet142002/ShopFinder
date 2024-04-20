import api from './instantApi';

export const getWarehousesApi = async (query) => {
    console.log('🚀 ~ getWarehousesApi ~ query:', query);
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
    try {
        const res = await api.post('/retailer/warehouse', data);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};
