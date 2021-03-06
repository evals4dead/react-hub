import axios from 'axios';

export const getMyInfo = () =>
  axios.get('https://api.github.com/user', {
    headers: {
      Authorization: `bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });
