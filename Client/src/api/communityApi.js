import api from './instantApi';

export const shareStore = async (data) => {
    return api.post('/community/share-store', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const updateStore = async (id, data) => {
    return api.put(`/community/update-store/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};

export const getStore = async (id) => {
    return api.get(`/community/store/${id}`);
};

export const getMySharedStore = async (params) => {
    return api.get('/community/stores', { params });
};

export const getAllStore = async (params) => {
    return api.get('admin/information', { params });
};

export const updateStatus = async (id, { status }) => {
    return api.patch(`/admin/information/${id}`, { status });
};
