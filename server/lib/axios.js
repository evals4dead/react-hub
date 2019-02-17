const axios = require('axios');

module.exports.createAxios = ({accessToken}) => {
    const axiosForGithub = axios.create({
        baseURL: 'https://api.github.com',
        withCredentials: true,
        headers: {
            'Authorization': `bearer ${accessToken}`,
            'Content-Type': 'application/json'
        }
    });

    return axiosForGithub;
};

