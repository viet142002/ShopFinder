import api from './instantApi';

/**
 *
 * @param {String} storeId
 * @returns {Promise} { products, total }
 * Get products in store by storeId
 * products: Array of products
 * total: Number of products
 */
export const getProductsFromDistributor = ({
    search = '',
    distributor,
    status = ['available', 'only-display', 'not-quantity'],
    limit = 30
}) => {
    return api.get(`products/${distributor}`, {
        params: {
            search,
            status,
            limit
        }
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
    return api.get(`products/detail/${id}`);
};

export const deleteProductByIdApi = async (id) => {
    try {
        const res = await api.delete(`/products/${id}`);
        return res.data;
    } catch (error) {
        return error.response.data;
    }
};
