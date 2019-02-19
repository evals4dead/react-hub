import axios from 'axios';

console.log(process.env.NODE_ENV, localStorage.getItem('access_token'));

const client = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/' : 'http://localhost:4000/',
  withCredentials: true,
  headers: {
    access_token: process.env.NODE_ENV === 'development' ? localStorage.getItem('access_token') : null,
  },
});

export default client;
