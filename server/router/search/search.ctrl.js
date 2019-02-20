const { createAxios } = require('../../lib/axios');
const { createOctokit } = require('../../lib/octokit');

module.exports.searchUser = async ctx => {
  const { access_token: accessToken } = ctx.request;
  let { q, page, per_page } = ctx.query;

  if (page <= 0 || !page) {
    page = 1;
  }

  if (!per_page) {
    per_page = 30;
  }

  try {
    // const axios = createAxios({ accessToken });
    const octokit = createOctokit({ accessToken });

    const response = await octokit.search.users({
      q,
      per_page,
      page,
    });
    const paging = await octokit.paginate('GET /search/users', {
      q,
    });

    // const response = await axios.get(`/search/users?q=${q}&page=${page}&per_page=${per_page}`);
    // console.log(response);
    console.log(paging);
    ctx.body = {
      data: response.data,
    };
    ctx.status = 200;
  } catch (e) {
    ctx.throw(e, 500);
  }
};
