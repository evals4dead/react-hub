const axios = require('axios');

module.exports.login = async (ctx) => {
    const { code, client_id, client_secret } = ctx.request.body;
    try {
        const response = await axios.post('https://github.com/login/oauth/access_token', {
            code,
            client_id, 
            client_secret
        }, {
            headers: {
                accept: 'application/json'
            }
        });
        const { access_token: accessToken } = response.data;
        
        ctx.body = {
            accessToken
        };
        ctx.status = 200;
    } catch(e) {
        ctx.throw(e, 500);
    }
};

