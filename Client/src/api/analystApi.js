import api from './instantApi';

export const getOverviewByRetailer = async () => {
    return api.get('/retailer/analyst/overview');
};

export const getTopProductByRetailer = async (params = { time: 'year' }) => {
    return api.get('/retailer/analyst/top-product', {
        params: {
            ...params
        }
    });
};

export const getTopTopCustomerByRetailer = async (
    params = { time: 'year' }
) => {
    return api.get('/retailer/analyst/top-customer', {
        params: {
            ...params
        }
    });
};

export const getRevenueByRetailer = async (params = { time: 'year' }) => {
    return api.get('/retailer/analyst/revenue', {
        params: {
            ...params
        }
    });
};

export const getPriceImportByRetailer = async (params = { time: 'year' }) => {
    return api.get('/retailer/analyst/import', {
        params: {
            ...params
        }
    });
};
