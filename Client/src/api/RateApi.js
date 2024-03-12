import api from './instantApi';

export const getRatesApi = async ({ to, skip, userId }) => {
    try {
        const res = await api.get('rates', {
            params: {
                userId,
                to,
                limit: 20,
                skip: skip || 0
            }
        });
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getCountStarRatesApi = async (to) => {
    try {
        const res = await api.get('rates/count-star', {
            params: {
                to
            }
        });
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const addRateApi = async (values) => {
    try {
        const res = await api.post(`rates`, values, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const updateRateApi = async ({ id, values }) => {
    try {
        const res = await api.put(`rates/${id}`, values, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteRateApi = async (id) => {
    try {
        const res = await api.delete(`rates/${id}`);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};
