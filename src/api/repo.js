import axios from 'axios';

export const repoList = ({ accessToken }) =>
  axios.get('/api/repo', {
    headers: {
      accessToken,
    },
  });
