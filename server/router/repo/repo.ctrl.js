const {createAxios} = require('../../lib/axios');

module.exports.repoList = async (ctx) => {

    const { accesstoken: accessToken } = ctx.headers;;
    let { page, per_page } = ctx.query;
    const axios = createAxios({accessToken});

    if(!page || page <= 0) {
        page = 0;
    };

    if(!per_page || per_page < 10) {
        per_page = 10;
    }

    try {
        const response = await axios.get(`/user/repos?page=${page}&per_page=${per_page}`);
        
        ctx.body = response.data;
        ctx.status = 200;
    } catch(e) {
        ctx.throw(e, 500);
    }
}