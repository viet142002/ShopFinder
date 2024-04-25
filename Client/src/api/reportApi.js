import api from './instantApi';

export const createReportApi = async (data) => {
    return api.post('reports', data);
};

export const getReportsApi = async (params) => {
    return api.get('/admin/reports', { params });
};

export const deleteReportApi = async (id) => {
    return api.delete(`reports/${id}`);
};
