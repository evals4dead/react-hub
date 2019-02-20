const Octokit = require('@octokit/rest');

module.exports.createOctokit = ({ accessToken }) => {
  const octokit = new Octokit({
    auth: `bearer ${accessToken}`,
    baseUrl: 'https://api.github.com',
  });

  return octokit;
};
