import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'http://192.168.1.29:8000/api/',
});
export default axiosClient