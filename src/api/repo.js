import axios from 'axios';

export const repoList = ({ accessToken, page, perPage, username }) =>
  axios.get(`/api/repo/${username}?page=${page}&per_page=${perPage}`, {
    headers: {
      accessToken,
    },
  });

export const repo = ({ accessToken, username, reponame }) =>
  axios.get(`/api/repo/${username}/${reponame}`, {
    headers: {
      accessToken,
    },
  });
