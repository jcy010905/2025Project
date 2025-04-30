import axios from 'axios';

const http = axios.create({
    baseURL: process.env.REACT_APP_API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
    });

    http.interceptors.request.use(
    config => {
        const token = localStorage.getItem('accessToken');
        if (token && token !== 'null' && token.trim() !== '') {
        config.headers['Authorization'] = `Bearer ${token}`; 
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

export default http;
