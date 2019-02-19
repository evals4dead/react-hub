const { createAxios } = require('../../lib/axios');

module.exports.getMyInfo = async ctx => {
  const { access_token: accessToken } = ctx.request;
  console.log(accessToken);
  const axios = createAxios({ accessToken });
  try {
    const response = await axios.get('/user');
    const { data: user } = response;
    ctx.body = {
      user,
    };
    ctx.status = 200;
  } catch (e) {
    ctx.throw(e, 500);
  }
};
