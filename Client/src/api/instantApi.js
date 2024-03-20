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
        console.error('🚀 ~ error:', error?.response);
        if (error.response?.status === 401) {
            alert('Phiên đăng nhập hết hạn, vui lòng đăng nhập lại!!!');
            localStorage.removeItem('token');
            window.location.href = `/login?redirect=${window.location.pathname}`;
        }
        return Promise.reject(error);
    }
);

export default instantApi;
