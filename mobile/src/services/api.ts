import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.201.123:3330',
})

export default api;