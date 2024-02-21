import api from './instantApi';

export const getProductsApi = async (search) => {
    try {
        const res = await api.get('retailer/products', {
            params: {
                search,
                limit: 100
            }
        });
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const createProductApi = async (data) => {
    try {
        const res = await api.post('retailer/products', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        console.log(error.response.data);
        throw error.response.data;
    }
};

export const updateProductByIdApi = async (id, data) => {
    try {
        const res = await api.put(`retailer/products/${id}`, data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const getProductByIdApi = async (id) => {
    try {
        const res = await api.get(`retailer/products/${id}`);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};

export const deleteProductByIdApi = async (id) => {
    try {
        const res = await api.delete(`/products/${id}`);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};
