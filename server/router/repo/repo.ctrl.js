const { createAxios } = require('../../lib/axios');

module.exports.repoList = async ctx => {
  // console.log('repo/repolist');
  const { access_token: accessToken } = ctx.request;
  console.log('server access token', accessToken);
  // console.log('repolist: ', ctx.headers.access_token);
  // console.log('repo/repolist', ctx.request.accessToken);
  let { page, per_page } = ctx.query;
  const axios = createAxios({ accessToken });

  if (!page || page <= 0) {
    page = 0;
  }

  if (!per_page || per_page < 10) {
    per_page = 10;
  }

  const { username } = ctx.params;

  try {
    const response = await axios.get(`/users/${username}/repos?page=${page}&per_page=${per_page}`);

    ctx.body = response.data;
    ctx.status = 200;
  } catch (e) {
    console.log(e);
    const { status } = e.response;
    // console.log('status', status);
    if (status === 404) {
      ctx.body = {
        status: 404,
      };
      ctx.status = 404;
    }
    // ctx.throw(e, 500);
  }
};

module.exports.repo = async ctx => {
  // const accessToken = ctx.cookies.get('accessToken');
  const { access_token: accessToken } = ctx.request;

  const axios = createAxios({ accessToken });

  const { username, reponame } = ctx.params;

  try {
    const response = await axios.get(`/repos/${username}/${reponame}`);
    ctx.body = response.data;
    ctx.status = 200;
  } catch (e) {
    console.log(e);
    const { status } = e.response;
    if (status === 404) {
      ctx.body = {
        status: 404,
      };
      ctx.status = 404;
    }
    // ctx.throw(e, 500);
  }
};
