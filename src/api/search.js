import axios from 'axios';

export const searchUser = ({ username, page, perPage }) =>
  axios.get(`https://api.github.com/search/users?q=${username}&page=${page}&per_page=${perPage}`, {
    headers: {
      Authorization: `bearer ${localStorage.getItem('access_token')}`,
      'Content-Type': 'application/json',
    },
  });
