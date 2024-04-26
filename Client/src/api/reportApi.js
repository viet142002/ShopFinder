import api from './instantApi';

export const createReportApi = async (data) => {
    return api.post('reports', data);
};

export const getReportsApi = async (params) => {
    return api.get('/admin/reports', { params });
};

export const getReportApi = async (id) => {
    return api.get(`/admin/reports/${id}`);
};

export const deleteReportApi = async (id) => {
    return api.delete(`/admin/reports/${id}`);
};

export const updateReportApi = async (id, data) => {
    return api.patch(`/admin/reports/${id}`, data);
};
