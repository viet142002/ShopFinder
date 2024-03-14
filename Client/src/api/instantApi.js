import axios from 'axios';

const instantApi = axios.create({
    baseURL: import.meta.env.VITE_APP_BASE_URL
    // timeout: 1000
});

instantApi.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.authorization = token;
    }
    return config;
});

instantApi.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.log(error);
        if (error.response.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default instantApi;