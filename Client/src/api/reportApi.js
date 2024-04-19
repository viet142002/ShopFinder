import api from './instantApi';

export const createReportApi = async (data) => {
    try {
        const res = await api.post('reports', data);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const getReportsApi = async (params) => {
    try {
        const res = await api.get('/admin/reports', { params });
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const deleteReportApi = async (id) => {
    try {
        const res = await api.delete(`reports/${id}`);
        return res.data;
    } catch (error) {
        throw error.response.data;
    }
};
