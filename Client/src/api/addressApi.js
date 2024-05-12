import axios from 'axios';

// const baseURL = 'https://vnprovinces.pythonanywhere.com/';
const baseURL = 'http://localhost:8000';

export const getProvinces = async () => {
    try {
        const response = await axios.get(`${baseURL}/province`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getDistricts = async (provinceId) => {
    try {
        const response = await axios.get(
            `${baseURL}/district?idProvince=${provinceId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getWards = async (districtId) => {
    try {
        const response = await axios.get(
            `${baseURL}/commune?idDistrict=${districtId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
