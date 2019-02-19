import axios from 'axios';

export const getMyInfo = () => axios.get('/api/user/me');
