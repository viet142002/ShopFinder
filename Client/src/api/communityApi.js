import api from './instantApi';

export const shareStore = async (data) => {
    try {
        const response = await api.post('/community/share-store', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
