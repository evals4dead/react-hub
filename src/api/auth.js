import axios from 'axios';

export const getAccessToken = ({code}) => axios.post('/api/auth/login', {
    code,
	client_secret: process.env.REACT_APP_GITHUB_SECRET_ID,
	client_id: process.env.REACT_APP_GITHUB_CLIENT_ID
});

export const logout = () => axios.post('/api/auth/logout', {});