import api from './instantApi';

export const getStoreById = async (storeId) => {
    return api.get(`stores/${storeId}`);
};
