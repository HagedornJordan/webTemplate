import axios from 'axios'

const user = typeof window !== 'undefined' ? localStorage.getItem('current_user') : "";

const axiosInstance = axios.create({
    //baseURL: 'http://127.0.0.1:8000/',
    timeout: 5000,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }
});

export default axiosInstance