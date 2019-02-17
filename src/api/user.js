import axios from 'axios';

export const getMyInfo = ({accessToken}) => axios.get('/api/user/me', {
    headers: {
        accessToken
    }
});