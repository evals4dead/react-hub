const axios = require('axios');
const { createAxios } = require('../../lib/axios');

module.exports.login = async ctx => {
  const { code, client_id, client_secret } = ctx.request.body;
  try {
    const response = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        code,
        client_id,
        client_secret,
      },
      {
        headers: {
          accept: 'application/json',
        },
      }
    );

    const { access_token: accessToken } = response.data;
    ctx.cookies.set('access_token', accessToken, {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true,
    });

    const githubAxios = createAxios({ accessToken });
    const user = await githubAxios.get('/user');
    const { login } = user.data;

    ctx.body = {
      logged: true,
      username: login,
      accessToken,
    };
    ctx.status = 200;
  } catch (e) {
    ctx.throw(e, 500);
  }
};
