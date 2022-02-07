import axios from 'axios'

const user = typeof window !== 'undefined' ? localStorage.getItem('current_user') : "";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 5000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});

export default axiosInstance