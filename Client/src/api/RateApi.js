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

export const addRateApi = (values) => {
    return api.post(`rates`, values, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const updateRateApi = async ({ id, values }) => {
    return api.put(`rates/${id}`, values, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const likeRateApi = async (id) => {
    try {
        const res = await api.put(`rates/like/${id}`);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const dislikeRateApi = async (id) => {
    try {
        const res = await api.put(`rates/dislike/${id}`);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteRateApi = async (id) => {
    return api.delete(`rates/${id}`);
};
