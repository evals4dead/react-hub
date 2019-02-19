import axios from 'axios';
// import axios from 'lib/client';

export const repoList = ({ page, perPage, username }) =>
  axios.get(`/api/repo/${username}?page=${page}&per_page=${perPage}`);

export const repo = ({ username, reponame }) => axios.get(`/api/repo/${username}/${reponame}`);
