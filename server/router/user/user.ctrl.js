const { createAxios } = require('../../lib/axios');

module.exports.getMyInfo = async ctx => {
  const accessToken = ctx.cookies.get('accessToken');
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
