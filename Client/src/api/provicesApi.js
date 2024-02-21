import axios from 'axios';

const api = axios.create({
    host: 'https://provinces.open-api.vn/api/'
});

export const getProvinces = async () => {
    try {
        const res = await api.get('/provinces');
        return res.data;
    } catch (error) {
        return error.response.message;
    }
};
