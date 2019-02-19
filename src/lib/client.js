import axios from 'axios';

const client = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? '/' : 'http://localhost:4000/',
  withCredentials: true, // 다른 도메인에 httpOnly 쿠키 사용 할 때 필수
});

export default client;
