import api from './instantApi';

export const getPriceShipById = async (retailerId, distance) => {
    return api.get(`/price-shipping/${retailerId}`, {
        params: {
            distance
        }
    });
};

export const addPriceShip = async (data) => {
    return api.post('/retailer/price-ship', data);
};

export const deletePriceShip = async (id) => {
    return api.delete(`/retailer/price-ship/${id}`);
};

export const updatePriceShip = async (id, data) => {
    return api.put(`/retailer/price-ship/${id}`, data);
};

export const getPriceShip = async () => {
    return api.get('/retailer/price-ship');
};
