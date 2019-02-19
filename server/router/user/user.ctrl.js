const { createAxios } = require('../../lib/axios');

module.exports.getMyInfo = async ctx => {
  const { access_token: accessToken } = ctx.request;
  if(!accessToken) {
    ctx.status = 401;
    return;
  }
  const axios = createAxios({ accessToken });
  try {
    const response = await axios.get('/user');
    const { data: user } = response;
    ctx.body = {
      user,
    };
    ctx.status = 200;
  } catch (e) {
    // console.log(e);
    ctx.throw(e, 500);
  }
};
