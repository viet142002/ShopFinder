import api from './instantApi';

export const getProducts = (params) => {
    return api.get('products', {
        params
    });
};

export const getDistributorByProductIdApi = async (id) => {
    return api.get(`products/distributor/${id}`);
};

export const createProductApi = async (data) => {
    return api.post('retailer/products', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const updateProductByIdApi = async (id, data) => {
    return api.put(`retailer/products/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const getProductByIdApi = async (id) => {
    return api.get(`products/${id}`);
};

export const deleteProductByIdApi = async (id) => {
    try {
        const res = await api.delete(`/products/${id}`);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};
export const createProductByUserApi = async (data) => {
    return api.post('products', data);
};
export const updateProductByUserApi = async (id, data) => {
    return api.put(`products/${id}`, data);
};
export const updateStatusByAdminApi = async (id, status) => {
    return api.patch(`admin/products/${id}`, { status });
};
