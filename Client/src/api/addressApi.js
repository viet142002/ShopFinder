import axios from 'axios';

const baseURL = 'https://vnprovinces.pythonanywhere.com/';

export const getProvinces = async () => {
    try {
        const response = await axios.get(
            `${baseURL}api/provinces/?basic=true&limit=100`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getDistricts = async (provinceId) => {
    try {
        console.log(provinceId);
        const response = await axios.get(
            `${baseURL}api/provinces/${provinceId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};

export const getWards = async (districtId) => {
    try {
        const response = await axios.get(
            `${baseURL}api/districts/${districtId}`
        );
        return response.data;
    } catch (error) {
        console.error(error);
    }
};
