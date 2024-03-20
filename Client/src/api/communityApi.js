import api from './instantApi';

export const shareStore = async (data) => {
    return api.post('/community/share-store', data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
};
