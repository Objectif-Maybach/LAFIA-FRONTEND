import axios from 'axios'

const axiosClient = axios.create({
    baseURL: 'https://cors-proxy.fringe.zone/https://temp2.karlocar.com/public/api/',
});
export default axiosClient