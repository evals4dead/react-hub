import axios from 'axios';

export const repoList = ({ accessToken, page, perPage }) =>
  axios.get(`/api/repo?page=${page}&per_page=${perPage}`, {
    headers: {
      accessToken,
    },
  });
